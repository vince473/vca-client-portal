# MH Wilds Forge Dataset — for the Squad Finder Builder (Golden Rathalos)

Built Oct 22, 2026 for Vince/design. This is the full Monster Hunter Wilds equipment catalog, structured like the in-game Smithy: **browse the catalog → open an item → see its picture, stats, forge materials + zenny cost → follow its upgrade path.** Every record carries an `image_url` (direct link to the item's render/icon on the Monster Hunter Wiki CDN — nothing downloaded, links only).

## Files & counts

| File | Records | What's in it |
|---|---|---|
| `weapons.json` | **1,160** | Every weapon, all 14 types (GS 88, LS 87, SnS 93, DB 88, Hm 82, HH 82, Ln 83, GL 79, SA 76, CB 81, IG 86, Bow 85, LBG 78, HBG 72) |
| `armor.json` | **703 pieces / 180 sets** | One record per piece (Head 161, Chest 138, Arms 133, Waist 135, Legs 136). Variants: α 370, β 176, γ 25, unvarianted (LR/base) 132 |
| `decorations.json` | **361** | Weapon decos 295, armor decos 66; slot sizes [1] 82, [2] 58, [3] 221 (incl. dual-skill composite jewels) |
| `talismans.json` | **216** | 187 crafted charms (64 families, each level its own record, 180 with full forge materials) + 29 appraisal (RNG) charm templates with skill groups + possible slot combos |
| `skills.json` | **216** | Weapon 66, armor 71, set 25, group 17, food 37 — each with per-level effect text |
| `items.json` | **768** | All items/materials (Supply 505, Hunting 150, Equipment Material 41, Slinger Ammo 29, Essential 20, Bowgun Ammo 15, Crafting 8) — the things forge recipes consume |

`raw/` holds the untouched source modules + `build_dataset.py`, the script that produced these files (re-run it to refresh after a title update).

## Image coverage (verified live — sampled URLs return HTTP 200 + image content)

| Category | Coverage | Notes |
|---|---|---|
| Weapons | **1,138 / 1,160 (98.1%)** | Full 3D renders. 22 newest TU/collab weapons have no render on the wiki yet (list under Gaps) |
| Armor | **703 / 703 (100%)** | The set's official render (male front by default; male/female × front/back all included per record in `set_render_urls`) |
| Decorations | **361 / 361 (100%)** | The in-game colored jewel icon (by `icon_color`); each record also carries its skill's icon URL |
| Talismans | **216 / 216 (100%)** | Generic charm icon (see note under Gaps) + per-record skill icon |
| Skills | **216 / 216 (100%)** | Skill-type icons (Attack, Stamina, Element, …) |
| Items | **758 / 768 (98.7%)** | In-game item icons in the item's icon color; 10 collab items have no icon file on the wiki (list under Gaps) |

## Field definitions (per record)

**Common:** `name`, `category`, `rarity` (int), `description`, `image_file` (wiki filename, for re-resolution), `image_url`.

**weapons.json:** `weapon_type` + `weapon_type_code`; `attack`, `affinity_percent`, `defense_bonus`; `elements: [{type, damage}]`; `sharpness: {levels, handicraft_levels}` — hits per color (red→purple), melee only; `deco_slots: [sizes]`; `skills: [{name, level}]` (innate); `tree`, `root_tree`, `monster`; `forge: {cost_zenny, materials: [{name, quantity, icon, color}]}` (197 weapons are directly forgeable; 54 list explicit forge materials, the rest are zenny-only base weapons); `upgrade_from: {name, cost_zenny, materials}` (961 records); `upgrades_to: [...]` (749 records branch onward — this is the upgrade tree, follow it both ways); `special: {...}` — type-specific extras: HH notes/melodies, SA/CB phial, GL shelling, IG kinsect bonus, Bow coatings, bowgun mods/special ammo, and for all 150 bowguns a parsed `ammo: [{type, level, capacity}]` table.

**armor.json:** `slot`, `set_name`, `base_set_name`, `variant` (alpha/beta/gamma/null); `defense: {base, max, max_transcend}` + `max_level`; `resistances: {fire, water, thunder, ice, dragon}`; `skills: [{name, level}]`; `set_skills`, `group_skills` (names — look up effects in skills.json); `deco_slots`, `transcend_deco_slots`; `forge: {cost_zenny, materials}` (684 pieces list materials; the other 19 are event/layered-style pieces with no forge recipe); `transcend: {cost_zenny, materials}` on 571 pieces (TU "transcend" upgrade); `set_renders` (filenames) + `set_render_urls`.

**decorations.json:** `deco_type` (weapon/armor), `slot_size` (1–3), `icon_color`, `price`; `skills: [{name, level, explain, icon_url}]` — dual-skill jewels have two entries, e.g. [3]+[1].

**talismans.json:** `kind` (crafted/appraisal), `level`, `family`, `family_max_level`; `skill: {name, level}`; `forge_cost_zenny` (the source's Price), `forge_materials: [{name, quantity}]`. Appraisal records instead carry `skill_groups: [{order, group, possible_skills: [{name, max_level}]}]` and `possible_slot_combos`.

**skills.json:** `skill_category` (weapon/armor/set/group/food), `max_level`, `level_effects: {"1": "…", …}`, `explain`, `set_skill_level_names`, food skills add `granted_by_meals` / `granted_by_ingredients`.

**items.json:** `item_category`, `jp_name`, `carry_limit`, `otomo_carry_limit`, `buy_price`, `sell_price`, `icon`, `icon_color`, `item_id`, plus source-provided `combinations`, `sources`, `equipment` (mostly empty arrays in the source).

## Sources (exact URLs)

Primary — Monster Hunter Wiki structured data modules (fetched as raw JSON, Oct 22, 2026):
- `https://monsterhunterwiki.org/index.php?title=Module:MHWilds/data/Weapons.json&action=raw` (+ `Weapons/RendersDict.json`, `Weapons/Ammo.json`)
- `…/Module:MHWilds/data/Armor.json`, `…/Decorations.json`, `…/Talismans.json`, `…/RngTalismans.json`, `…/TalismanSkillGroups.json`, `…/Skills.json`, `…/Items.json` (same URL pattern)
- Images resolve through the MediaWiki API (`action=query&prop=imageinfo`) to direct `monsterhunterwiki.org/images/…` URLs.

Cross-check — Kiranico (`https://mhwilds.kiranico.com/data/decorations`, `/data/weapons`, fetched Oct 22, 2026):
- Decorations: **361/361** wiki names present on Kiranico — exact agreement.
- Weapons: **1,146/1,160** wiki names present in Kiranico's weapons page data; the 14 absent are the Azure Star / USJ collab weapons (Azure Era, Wyvern Blade "Ash/Verde/…" series, Shatterseal), which Kiranico's page payload doesn't embed. No count conflict — the wiki module is the more complete list here.

## Known gaps (honest list)

1. **22 weapons have no render image** — the wiki has no render file for them yet (newest title-update / collab weapons): Azure Era "Soaring Dragon", Azure Star "Dragon Dance", Calamitous Angel, Promised Abyss, Morning Dawn I, Well-done Blades, Eternal Cusp, Lagia Burst I, Auguring Omen, Shatterseal Drakesnest, Ostrak Oblivion, Power Stinger I, Trembling Hels, Allysyl Muse, Onyx Choros, Bound Admonition, Limbo Llor, Bethorned Agony, Aether Pike, Headsman's Hamus, Wicked Regnum, Kyrie Verd. Their records are complete except `image_url: null`. (9 further weapons had stale filenames in the wiki's render dict — wrong case / missing quote marks in the "Wyvern Blade" renames — found and fixed during the build, so those DO have images.)
2. **10 items have no icon** — Street Fighter / FFXIV collab items whose icons the wiki doesn't host as files: Worn Pickaxe, Assisted Combo: Akuma, Gou Hadoken, Drive Impact, Shield Generator, The Blackest Night, Pom Motif, Wing Motif, Mog of the Ages, Soul of the Pictomancer. (4 "Relic" collab items use a generic base icon instead — included.)
3. **Talisman images are a shared charm icon**, not per-charm art — crafted charms all use the same in-game icon (color varies in game, but the wiki's structured data has no per-charm color field, so no honest per-charm image exists in the source). Each record's `skill_icon_url` gives the visual distinction. If Nathan grabs charm screenshots in game, they can replace `image_url` per family.
4. **Armor images are per-set, not per-piece** — the wiki (and the game data) only publishes full-set renders; individual pieces don't have official renders. Each piece record points at its set's render (all 4 gender/angle variants included).
5. **7 crafted charms list no forge materials in the source** (Hope Charm, Maintenance Charm IV, Rice Ball Charm, Unknown Charm, Historical Charm, Secret Charm, Golden Age Charm) — event/appraisal-only charms with no Smithy recipe. Also, 14 elemental/status Charm I records have a trailing phantom "0" in the source's quantity list — trimmed during the build (the 3 real materials per charm are intact).
6. **38 datamined "#Rejected#" skill entries were excluded** from skills.json — unused/cut skills flagged `[0]INVALID` in the game data, not available to players. They remain in `raw/` if ever needed. Real skill count is 216.
7. **Bowgun `ShellTable` HTML** in the source was parsed into structured `ammo` arrays for all 150 bowguns; a handful of exotic ammo rows with nonstandard markup may be missing from a gun's list — spot-check a gun before shipping ammo UI.
8. Data is current as of the wiki modules on **Oct 22, 2026**; future title updates will add gear. Re-run `raw/build_dataset.py` against fresh module downloads to refresh.

## How this powers a forge-style builder

- **Catalog browse:** filter `weapons.json` by `weapon_type`, `armor.json` by `slot`/`set_name`/`variant`, etc. Cards show `image_url`, name, rarity — exactly the Smithy grid.
- **Item detail (the forge screen):** image big, stats block, `forge.materials` + `forge.cost_zenny` as the recipe card ("what do I need to hunt?"), skills resolved against `skills.json` for effect text and icons.
- **Upgrade path:** weapons link both directions (`upgrade_from` / `upgrades_to` with per-step costs+materials) — render as the in-game tree; a hunter can tap from Hope Blade I down the whole line and see every material on the route. Armor's `transcend` block is the endgame upgrade step; talisman `family` + `family_max_level` chains charm levels the same way.
- **Build integration:** because decorations/talisman records carry skills with levels and slots with sizes, the same files feed the set builder and set searcher (slot a deco only where `slot_size` fits; sum skill levels across the five armor records + weapon + charm).
- **Farming list (natural "better than their builder" feature):** pick target gear → union of all `forge.materials` / upgrade-step materials → one shopping list of monster parts, cross-referenced to `items.json`.
