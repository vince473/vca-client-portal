#!/usr/bin/env python3
"""Normalize MH Wilds wiki data modules into builder-ready JSON files."""
import json, re, urllib.request, urllib.parse, os
from collections import Counter

RAW = "/tmp/mhw"
OUT = os.path.expanduser("~/workspace/your_files/builder-data")
os.makedirs(OUT, exist_ok=True)
API = "https://monsterhunterwiki.org/api.php"
UA = {"User-Agent": "Mozilla/5.0 (squad-finder builder dataset build)"}

def load(name):
    with open(f"{RAW}/raw_{name}.txt") as f:
        return json.load(f)

def to_int(v):
    try:
        return int(str(v).strip())
    except (TypeError, ValueError):
        return None

def clean(s):
    if s is None:
        return None
    s = str(s).replace("\r\n", " ").replace("\r", " ").replace("\n", " ").strip()
    return s or None

def parse_materials(s):
    """ForgeMaterials-style JSON string -> [{name, quantity, icon, color}]"""
    if not s or s == "[]":
        return []
    try:
        arr = json.loads(s)
    except (TypeError, json.JSONDecodeError):
        return []
    out = []
    for m in arr:
        out.append({"name": m.get("name"), "quantity": m.get("quantity"),
                    "icon": m.get("icon"), "color": m.get("color")})
    return out

# ---------- image resolution ----------
def resolve_images(filenames):
    """Batch-resolve wiki filenames -> direct URLs via imageinfo."""
    filenames = sorted(set(f for f in filenames if f))
    resolved = {}
    for i in range(0, len(filenames), 50):
        batch = filenames[i:i + 50]
        titles = ["File:" + f for f in batch]
        q = urllib.parse.urlencode({"action": "query", "titles": "|".join(titles),
                                    "prop": "imageinfo", "iiprop": "url|mime", "format": "json"})
        req = urllib.request.Request(API + "?" + q, headers=UA)
        with urllib.request.urlopen(req) as r:
            d = json.load(r)
        norm = {n["from"]: n["to"] for n in d["query"].get("normalized", [])}
        by_title = {}
        for p in d["query"]["pages"].values():
            ii = p.get("imageinfo", [{}])[0]
            by_title[p["title"]] = ii.get("url")
        for f in batch:
            t = "File:" + f
            t = norm.get(t, t)
            resolved[f] = by_title.get(t)
    return resolved

SKILL_LINK_RE = re.compile(r"\{\{MHWildsSkillLink\|([^|]+)\|[^}]*\}\}\s*lv\.\s*(\d+)")
def parse_weapon_skills(s):
    if not s:
        return []
    return [{"name": m.group(1).strip(), "level": int(m.group(2))} for m in SKILL_LINK_RE.finditer(s)]

def skill_brief(sk):
    return {"name": sk.get("SkillName"), "category": (sk.get("SkillCategory") or "").strip("[]").split("]")[-1],
            "explain": clean(sk.get("SkillExplain")), "icon_type": sk.get("SkillIconType")}

# ============================================================ WEAPONS
WEAPON_TYPES = {"GS": "Great Sword", "LS": "Long Sword", "SnS": "Sword & Shield", "DB": "Dual Blades",
                "Hm": "Hammer", "HH": "Hunting Horn", "Ln": "Lance", "GL": "Gunlance",
                "SA": "Switch Axe", "CB": "Charge Blade", "IG": "Insect Glaive", "Bo": "Bow",
                "HBG": "Heavy Bowgun", "LBG": "Light Bowgun"}
SHARPNESS_COLORS = ["red", "orange", "yellow", "green", "blue", "white", "purple"]

W = load("Weapons")
RD = load("RendersDict")
AMMO = load("Ammo")

AMMO_ROW_RE = re.compile(r"\{\{IconPickerUniversalAlt\|MHWilds\|[^|]*\|([^|]+)\|[^}]*\}\}</td>\s*<td class=\"ammo-level[^\"]*\">\s*(\d+)</td>\s*<td class=\"ammo-capacity[^\"]*\"\s*>\s*(\d+)</td>", re.S)
def parse_ammo(html):
    if not html:
        return []
    return [{"type": m.group(1).strip(), "level": int(m.group(2)), "capacity": int(m.group(3))}
            for m in AMMO_ROW_RE.finditer(html)]

weapons = []
weapon_img_files = []
for name, v in W.items():
    img_file = RD.get(v["Type"], {}).get(name)
    weapon_img_files.append(img_file)
    elements = []
    for i in (1, 2):
        et = v.get(f"Element{i}")
        if et:
            elements.append({"type": et, "damage": to_int(v.get(f"ElementDmg{i}"))})
    sharp = None
    if v.get("Sharpness"):
        try:
            arr = json.loads(v["Sharpness"])
            sharp = {"levels": dict(zip(SHARPNESS_COLORS, arr[0])),
                     "handicraft_levels": dict(zip(SHARPNESS_COLORS, arr[1])) if len(arr) > 1 else {}}
        except (TypeError, json.JSONDecodeError):
            sharp = {"raw": v["Sharpness"]}
    slots = [to_int(v.get(f"Decos{i}")) or 0 for i in range(1, 5)]
    slots = [s for s in slots if s > 0]
    upgrades = []
    for i in range(1, 5):
        nn = v.get(f"Next{i}Name")
        if nn:
            upgrades.append({"name": nn, "rarity": to_int(v.get(f"Next{i}Rarity")),
                             "cost_zenny": to_int(v.get(f"Next{i}Cost")),
                             "materials": parse_materials(v.get(f"Next{i}Materials"))})
    special = {}
    for key, label in [("CbPhialType", "charge_blade_phial"), ("SaPhialType", "switch_axe_phial"),
                       ("SaPhialDamage", "switch_axe_phial_damage"), ("GlShellingType", "gunlance_shelling_type"),
                       ("GlShellingLevel", "gunlance_shelling_level"), ("HhSpecialMelody", "hunting_horn_special_melody"),
                       ("HhEchoBubble", "hunting_horn_echo_bubble"), ("IgKinsectBonus", "kinsect_bonus"),
                       ("BoCoatings", "bow_coatings"), ("HbgDefaultMod1", "hbg_mod_1"), ("HbgDefaultMod2", "hbg_mod_2"),
                       ("HbgSpecialAmmoType1", "hbg_special_ammo_1"), ("HbgSpecialAmmoType2", "hbg_special_ammo_2"),
                       ("HbgIgnitionGauge", "hbg_ignition_gauge"), ("HbgStandardIgnitionType", "hbg_standard_ignition"),
                       ("LbgDefaultMod1", "lbg_mod_1"), ("LbgDefaultMod2", "lbg_mod_2"),
                       ("LbgSpecialAmmoType", "lbg_special_ammo")]:
        val = v.get(key)
        if val not in (None, ""):
            special[label] = clean(val)
    notes = [clean(v.get(f"HhNote{i}")) for i in range(1, 4)]
    notes = [n for n in notes if n]
    if notes:
        special["hunting_horn_notes"] = notes
    if v["Type"] in ("HBG", "LBG") and name in AMMO:
        ammo = parse_ammo(AMMO[name].get("ShellTable"))
        if ammo:
            special["ammo"] = ammo
    weapons.append({
        "name": name, "category": "weapon", "weapon_type": WEAPON_TYPES.get(v["Type"], v["Type"]),
        "weapon_type_code": v["Type"], "rarity": to_int(v["Rarity"]),
        "attack": to_int(v["Attack"]), "affinity_percent": to_int(v["Affinity"]),
        "defense_bonus": to_int(v["Defense"]), "elements": elements, "sharpness": sharp,
        "deco_slots": slots, "skills": parse_weapon_skills(v.get("ArmorSkills")),
        "description": clean(v.get("Description")), "tree": v.get("Tree"), "root_tree": v.get("RootTree"),
        "monster": clean(v.get("MonsterName")),
        "forge": {"cost_zenny": to_int(v.get("ForgeCost")), "materials": parse_materials(v.get("ForgeMaterials"))},
        "upgrade_from": ({"name": v.get("PreviousName"), "cost_zenny": to_int(v.get("UpgradeCost")),
                          "materials": parse_materials(v.get("UpgradeMaterials"))} if v.get("PreviousName") else None),
        "upgrades_to": upgrades, "special": special,
        "image_file": img_file, "image_url": None,
    })

# ============================================================ ARMOR
A = load("Armor")
SLOT_MAP = {"Helmet": "Head", "Chestplate": "Chest", "Armguards": "Arms", "Waist": "Waist", "Leggings": "Legs"}
armor = []
armor_img_files = []
for s in A:
    set_name = s["SetName"]
    variant = None
    base_name = set_name
    for suf, lab in [(" α", "alpha"), (" β", "beta"), (" γ", "gamma")]:
        if set_name.endswith(suf):
            variant, base_name = lab, set_name[: -len(suf)]
            break
    renders = {"male_front": s.get("MaleFrontImg") or None, "male_back": s.get("MaleBackImg") or None,
               "female_front": s.get("FemaleFrontImg") or None, "female_back": s.get("FemaleBackImg") or None}
    armor_img_files += list(renders.values())
    set_skills = [x for x in [s.get("SetSkill1Name"), s.get("SetSkill2Name")] if x]
    group_skills = [x for x in [s.get("GroupSkill1Name"), s.get("GroupSkill2Name")] if x]
    for p in s["Pieces"]:
        slots = [to_int(p.get(f"Decos{i}")) or 0 for i in range(1, 5)]
        tslots = [to_int(p.get(f"TranscendDecos{i}")) or 0 for i in range(1, 5)]
        armor.append({
            "name": p["Name"], "category": "armor", "slot": SLOT_MAP.get(p.get("IconType"), p.get("IconType")),
            "slot_icon_type": p.get("IconType"), "set_name": set_name, "base_set_name": base_name,
            "variant": variant, "rarity": to_int(p.get("Rarity")),
            "defense": {"base": to_int(p.get("Defense")), "max": to_int(p.get("MaxDefense")),
                        "max_transcend": to_int(p.get("MaxDefenseTranscend"))},
            "max_level": to_int(p.get("MaxLevel")), "max_level_transcend": to_int(p.get("MaxLevelTranscend")),
            "resistances": {"fire": to_int(p.get("FireRes")), "water": to_int(p.get("WaterRes")),
                            "thunder": to_int(p.get("ThunderRes")), "ice": to_int(p.get("IceRes")),
                            "dragon": to_int(p.get("DragonRes"))},
            "skills": [{"name": sk["Name"], "level": sk["Level"]} for sk in p.get("Skills", [])],
            "set_skills": set_skills, "group_skills": group_skills,
            "deco_slots": [x for x in slots if x > 0],
            "transcend_deco_slots": [x for x in tslots if x > 0],
            "forge": {"cost_zenny": to_int(p.get("ForgingCost")),
                      "materials": [{"name": m["Name"], "quantity": m["Quantity"]} for m in p.get("Materials", [])]},
            "transcend": ({"cost_zenny": to_int(p.get("TranscendCost")),
                           "materials": [{"name": m["Name"], "quantity": m["Quantity"]} for m in p["TranscendMaterials"]]}
                          if p.get("TranscendMaterials") else None),
            "description": clean(p.get("Description")),
            "set_renders": renders, "image_file": renders["male_front"], "image_url": None,
        })

# ============================================================ DECORATIONS
D = load("Decorations")
decorations = []
deco_img_files = []
for name, d in D.items():
    skills = []
    for sk, lv in zip(d.get("Skills", []), d.get("SkillLevels", [])):
        b = skill_brief(sk)
        b["level"] = lv
        skills.append(b)
    img_file = f"MHWilds-Decoration Icon {d['IconColor']}.png"
    deco_img_files.append(img_file)
    decorations.append({
        "name": name, "category": "decoration",
        "deco_type": "weapon" if d["DecoType"] == "Sword" else "armor",
        "slot_size": int(chr(d["SlotLevel"])) if isinstance(d["SlotLevel"], int) and 48 <= d["SlotLevel"] <= 57 else d["SlotLevel"],
        "rarity": d["Rarity"], "price": d["Price"], "icon_color": d["IconColor"],
        "skills": skills, "description": clean(d.get("Description")),
        "image_file": img_file, "image_url": None,
    })

# ============================================================ SKILLS (needed for icons)
S = load("Skills")
CAT_MAP = {"[0]EQUIP": "armor", "[3]WEAPON": "weapon", "[1]SERIES": "set", "[2]GROUP": "group", "Meal": "food"}
skills = []
skill_icon_files = {}  # skill name -> icon file
for name, sk in S.items():
    it = sk.get("SkillIconType")
    icon_file = f"MHWilds-{it} Skill Icon.png" if it and it != "[0]INVALID" else None
    skill_icon_files[name] = icon_file
    levels = {}
    for lv, eff in (sk.get("SkillLevels") or {}).items():
        levels[str(lv)] = clean(eff)
    skills.append({
        "name": name, "category": "skill", "skill_category": CAT_MAP.get(sk.get("SkillCategory"), sk.get("SkillCategory")),
        "max_level": len(levels) if levels else None, "level_effects": levels,
        "explain": clean(sk.get("SkillExplain")), "icon_type": it,
        "set_skill_level_names": sk.get("SetSkillLevelNames") or {},
        "granted_by_meals": sk.get("GrantedByMeals"), "granted_by_ingredients": sk.get("GrantedByIngredients"),
        "image_file": icon_file, "image_url": None,
    })

# attach skill icon urls to decorations/talismans later via skill_icon_files

# ============================================================ TALISMANS
T = load("Talismans")
RNG = load("RngTalismans")
GROUPS = {g["GroupNum"]: g["Skills"] for g in load("TalismanSkillGroups")}
ROMAN = re.compile(r"\s+(I|II|III|IV|V)$")
families = {}
for n, t in T.items():
    base = ROMAN.sub("", n)
    families.setdefault(base, []).append(t["Level"])
talismans = []
for name, t in T.items():
    mats = []
    for item, qty in zip(t.get("CraftingItems", []), t.get("CraftingItemQtys", [])):
        mats.append({"name": item["Name"], "quantity": qty})
    sk = t["Skills"][0] if t.get("Skills") else None
    base = ROMAN.sub("", name)
    talismans.append({
        "name": name, "category": "talisman", "kind": "crafted", "level": t["Level"],
        "family": base, "family_max_level": max(families[base]),
        "rarity": t["Rarity"], "forge_cost_zenny": t["Price"],
        "skill": ({"name": sk["SkillName"], "level": t["SkillLevels"][0] if t.get("SkillLevels") else t["Level"]} if sk else None),
        "skill_icon_type": sk.get("SkillIconType") if sk else None,
        "forge_materials": mats, "description": clean(t.get("Description")),
        "image_file": "MHWilds-Charm Icon Base.webp", "image_url": None,
    })
for r in RNG:
    groups = []
    for g in r.get("SkillGroups", []):
        groups.append({"order": g["SkillOrder"], "group": g["GroupNum"],
                       "possible_skills": [{"name": s["SkillName"], "max_level": s["MaxLvl"]}
                                           for s in GROUPS.get(g["GroupNum"], [])]})
    slot_combos = [[{"order": s["SlotOrder"], "level": s["SlotLevel"], "deco_type": s["DecoType"].lower()}
                    for s in combo] for combo in r.get("PossibleSlotCombos", [])]
    sk = r["Skills"][0] if r.get("Skills") else None
    talismans.append({
        "name": r["Name"], "category": "talisman", "kind": "appraisal", "level": r["Level"],
        "family": r["Name"], "family_max_level": r["Level"],
        "rarity": r["Rarity"], "forge_cost_zenny": r["Price"],
        "skill": ({"name": sk["SkillName"], "level": (r.get("SkillLevels") or [r["Level"]])[0]} if sk else None),
        "skill_icon_type": sk.get("SkillIconType") if sk else None,
        "forge_materials": [], "skill_groups": groups, "possible_slot_combos": slot_combos,
        "description": clean(r.get("Description")),
        "image_file": "MHWilds-Charm Icon Base.webp", "image_url": None,
    })

# ============================================================ ITEMS
I = load("Items")
items = []
item_img_files = []
for it in I:
    icon, color = it.get("Icon"), it.get("Icon Color")
    primary = f"MHWilds-{icon} Icon {color}.png" if icon and color else None
    fallback = f"MHWilds-{icon} Icon Base.webp" if icon else None
    item_img_files += [primary, fallback]
    items.append({
        "name": it["Name"], "jp_name": it.get("JPName"), "category": "item",
        "item_category": it.get("Category"), "rarity": to_int(it.get("Rarity")),
        "description": clean(it.get("Description")),
        "carry_limit": to_int(it.get("Carry")), "otomo_carry_limit": to_int(it.get("Ot. Carry")),
        "buy_price": to_int(it.get("Buy Price")), "sell_price": to_int(it.get("Sell Price")),
        "icon": icon, "icon_color": color, "item_id": it.get("Item ID"),
        "combinations": it.get("Combinations"), "sources": it.get("Sources"), "equipment": it.get("Equipment"),
        "image_file": primary, "image_fallback_file": fallback, "image_url": None,
    })

# ============================================================ resolve all images
all_files = weapon_img_files + armor_img_files + deco_img_files + \
            [s["image_file"] for s in skills] + item_img_files + \
            ["MHWilds-Charm Icon Base.webp"] + \
            [f"MHWilds-{t} Skill Icon.png" for t in {s['icon_type'] for s in skills if s['icon_type'] and s['icon_type'] != '[0]INVALID'}] + \
            [f"MHWilds-{t['skill_icon_type']} Skill Icon.png" for t in talismans if t.get("skill_icon_type")]
print(f"resolving {len(set(f for f in all_files if f))} distinct image files...")
IMG = resolve_images(all_files)

for w in weapons:
    w["image_url"] = IMG.get(w["image_file"]) if w["image_file"] else None
for a in armor:
    a["image_url"] = IMG.get(a["image_file"]) if a["image_file"] else None
    a["set_render_urls"] = {k: IMG.get(v) if v else None for k, v in a["set_renders"].items()}
for d in decorations:
    d["image_url"] = IMG.get(d["image_file"])
    for sk in d["skills"]:
        f = skill_icon_files.get(sk["name"])
        sk["icon_url"] = IMG.get(f) if f else None
    d["primary_skill_icon_url"] = d["skills"][0]["icon_url"] if d["skills"] else None
for s in skills:
    s["image_url"] = IMG.get(s["image_file"]) if s["image_file"] else None
for t in talismans:
    t["image_url"] = IMG.get("MHWilds-Charm Icon Base.webp")
    if t.get("skill_icon_type"):
        t["skill_icon_url"] = IMG.get(f"MHWilds-{t['skill_icon_type']} Skill Icon.png")
    else:
        t["skill_icon_url"] = None
for it in items:
    url = IMG.get(it["image_file"]) if it["image_file"] else None
    if not url and it["image_fallback_file"]:
        url = IMG.get(it["image_fallback_file"])
        if url:
            it["image_file"] = it["image_fallback_file"]
    it["image_url"] = url
    del it["image_fallback_file"]

def dump(data, fname):
    with open(os.path.join(OUT, fname), "w") as f:
        json.dump(data, f, indent=1, ensure_ascii=False)
    return len(data)

counts = {"weapons": dump(weapons, "weapons.json"), "armor_pieces": dump(armor, "armor.json"),
          "decorations": dump(decorations, "decorations.json"), "talismans": dump(talismans, "talismans.json"),
          "skills": dump(skills, "skills.json"), "items": dump(items, "items.json")}
print("counts:", counts)
for label, data in [("weapons", weapons), ("armor", armor), ("decorations", decorations),
                    ("talismans", talismans), ("skills", skills), ("items", items)]:
    have = sum(1 for r in data if r.get("image_url"))
    print(f"image coverage {label}: {have}/{len(data)} = {have/len(data)*100:.1f}%")
json.dump({"counts": counts,
           "coverage": {label: [sum(1 for r in data if r.get('image_url')), len(data)]
                        for label, data in [("weapons", weapons), ("armor", armor), ("decorations", decorations),
                                            ("talismans", talismans), ("skills", skills), ("items", items)]}},
          open("/tmp/mhw/build_stats.json", "w"), indent=1)
