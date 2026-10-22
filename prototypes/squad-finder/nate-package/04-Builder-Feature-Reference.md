# MH Wilds Builder — Feature Reference (for the Squad Finder app)

**What this is:** A full inventory of what the MH Wilds Hub builder (mhwildshub.com/builder) actually does, mapped hands-on by Brodie on Oct 22, 2026. Nathan's direction: the Squad Finder app gets a build planner like this — **but better** — slotted as a **Golden Rathalos** tier feature.

**One-line summary:** A free, interactive Monster Hunter Wilds build planner — assemble a weapon, five armor pieces, decorations, and a charm, and it live-calculates attack/defense stats, skill totals, and per-move damage against monster hitzones.

**Design direction (Nathan, Oct 22, 2026):** Our version is modeled on **the in-game forge system** — not a bare stat calculator. That means: browse by category like the Smithy menus, the **full catalog of every available item** (every weapon, armor piece, decoration, talisman/charm, skill, and material — no stripped-down "basic" list), an **image for every item**, plus forge materials, zenny costs, and upgrade paths (weapon trees, talisman upgrade chains). The full dataset is being built from the Monster Hunter Wiki's structured game data into `builder-data/` (same folder as the app docs).

---

## What their builder does (verified hands-on)

### Equipment selection
- **Weapon search:** all 14 weapon types; text search (filters on Enter); sort by None / Rarity / Attack. Weapon cards show icon, name, raw attack, affinity, element/status, sharpness bar, and innate skills with levels.
- **Armor search:** head / chest / arms / waist / legs; pieces listed with icon, name, all skills + levels, and decoration slot icons. Alpha / beta / gamma variants differ in skills, slots, and set-bonus skills.
- **Decorations:** clicking a slot opens a decoration search filtered to slot-compatible jewels only (a Lv3 slot also offers [2] and [1] jewels). Includes single-skill jewels and dual-skill composite jewels (e.g., Blaze/Handicraft Jwl [3]). Each slotted deco has its own remove button.
- **Charms:** full list of craftable charms in I / II / III tiers. Plus a **Custom Charm builder**: Skill 1 + Skill 2 fields and 3 slot inputs; Equip stays disabled until the combination is valid.
- Every equipment slot has an **Unequip (X)** button.

### Live calculations (all update instantly on any change)
- **Attack panel:** Raw, Effective Raw, Element, Effective Element, Affinity, Crit Damage multiplier.
- **Sharpness panel:** sharpness bar + Raw Modifier and Element Modifier.
- **Defense panel:** Defense, Fire / Water / Thunder / Ice / Dragon resistances, Health, Effective Health.
- Default build on load: Hope Blade I (Great Sword) + full Hope armor set, no charm.

### Skills system
- Active skills shown as **chips** (icon, name, level, pips) in a side column.
- Clicking a chip shows a tooltip with the skill's actual effect (e.g., Critical Eye Lv3 = Affinity +12%).
- **Quick-toggle abbreviation bar** for common skills (Ofg, Peak, Wex, MM, Agi, Burst, Coal, etc.).
- **Active Effects dialog** with tabs — Skills / Food / Items / Weapon / Special — ~29 skill toggles, food toggles, item toggles (Powercharm on by default; Demon Powder, Mega Demondrug, Might Pill, Might Seed), Hunting Horn melody toggles, and a Frenzy toggle. All toggles feed into the stat calculations.

### Tools
- **Hitzone Calculator:** replaces the main view with a per-move average-damage table against a monster hitzone (default: Rathian — Head). The move list adapts to the equipped weapon type (Great Sword shows Overhead Slash, True Charged Slash III, Focus Strike, Seikret riding and mounting attacks, etc.).
- **Set Searcher** (separate page, /builder/search): pick skills via autocomplete + a level spinner per skill, set Max Results (default 20), and it returns full sets — head/chest/arms/waist/legs/charm with each piece's skills and a total skill summary. (Searches armor + charm only; weapon and decorations are not criteria.)
- **Copy build link** button for sharing a build.
- **Screenshot tool** (exists as a button; effect could not be confirmed in testing).
- **Undo / Redo** via Ctrl+Z / Ctrl+Y (advertised on the loading screen).

### Accounts & site-level
- **Save build** and **My builds** exist but **require a login** — logged out, saving errors and My builds shows "Not logged in."
- Dark / light theme toggle (verified both ways).
- Languages: English, Japanese, Deutsch, Español.
- Everything tested was **free** — no paywalls anywhere.
- Wider site: Wiki (Weapons, Armor, Skills, Food Skills, Hitzones, Locales, Guides, Builds), speedrun Leaderboards, Hunting Help section, Discord link, donation button.

### Known gaps / bugs in theirs (verified)
1. **Hitzone Calculator's "Select Hitzone" button crashes the app** (client-side exception, reproduced twice — page must be reloaded).
2. **Unsaved builds are lost on reload** — refreshing resets to the default Hope set.
3. Search boxes filter **only after pressing Enter**, not live while typing.
4. **No build comparison view, no preset builds, no build-code import** found in the UI.
5. Set Searcher ignores weapon and decoration choices.
6. Artian / bowgun-specific customization UI not observed.

---

## How ours goes better (Brodie's suggestions — Nathan's call)

- **Builds live on your profile.** Their builder is a standalone calculator; in the Squad Finder app, a saved build attaches to your hunter profile and your session posts — squadmates see your actual build, weapon, and skills before they join. That alone beats a link-copy button.
- **Share to the squad room.** One tap drops the build into your squad room chat instead of a clipboard link nobody opens.
- **Fix their bugs by design:** autosave (never lose a build on refresh), live search-as-you-type, and a hitzone picker that doesn't crash.
- **Build comparison:** side-by-side diff of two builds (stat deltas highlighted) — they don't have it at all.
- **Set Searcher+ :** include weapon and decorations as search criteria, and let it search "best set for THIS monster" using hitzone data.
- **Squad synergy view (the real differentiator):** overlay the whole squad's builds — who's bringing what buffs, Hunting Horn melodies, support skills, element coverage vs. the target monster. Nobody's builder does team-level build planning, and it fits a squad app perfectly.
- **Import from game / screenshot:** photo-scan or code import so hunters don't rebuild by hand. (Feasibility TBD — park it as a stretch goal.)
