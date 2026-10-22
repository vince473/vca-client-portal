# Squad Finder — App Concept

**Working concept:** An app where gamers on Xbox, PlayStation, and PC find each other and team up to play together — for any game, across platforms.

*(Name is a placeholder — pick your own. The design idea below works no matter what you call it.)*

---

## 1. The idea in one line

Pick your game → post what you're trying to do → get matched with real players on any platform → grab the lobby code → go play.

## 2. The problem it solves

Finding people to play with right now is a mess:

- **In-game matchmaking is random.** You get whoever the game throws at you — no control over skill level, attitude, mic use, or what they're trying to do.
- **Discord and Reddit work, but they're scattered.** Every game has its own servers and subreddits, posts are unstructured text, and they go stale in minutes.
- **Cross-platform play exists, but cross-platform *finding* doesn't.** Monster Hunter Wilds lets Xbox, PlayStation, and PC hunters play together — but there's no single place where all three groups look for each other.

This app is that single place: one profile, every platform, every game, structured so you find the *right* people in under a minute.

## 3. Who it's for

- Solo players tired of randoms
- Small friend groups missing 1–2 players to fill a squad
- New players who want patient teammates instead of getting kicked
- Experienced players farming endgame content who need people at their level
- Anyone playing cross-platform games whose friends are split across Xbox / PS / PC

## 4. How it works — the core loop

1. **Sign up and build one profile.** Add your platforms (Xbox gamertag, PSN ID, Steam name), the games you play, your region, languages, and whether you use a mic.
2. **Add your games.** For each game, fill in the basics that matter for that game (see the game template idea in section 6).
3. **Post or join a session.** A *session* is a "looking for group" post: the game, the activity, how many spots are open, the vibe, and when it starts (right now, or scheduled).
4. **Get matched.** Players who fit can request to join, or the host can invite. Sessions fill up in the app, not in the game.
5. **Share the lobby code.** Once the squad is full, the host shares the game's lobby / party code inside the session (for Wilds, that's the Link Party / lobby ID). Everyone copies it into their game and they're in together.
6. **Play, then rate.** After the session, players rate each other: friendly, skilled, on time, good comms. Good reputations rise; trolls sink and can be blocked/reported.

The app never runs the game — it's the meeting place and the organizing layer. That keeps it simple and legal: no game company permission needed to build the finder itself.

## 5. Main features (version 1 — the MVP)

### Profile
- One profile across all platforms: Xbox gamertag, PSN ID, Steam ID
- Avatar, region, languages, mic yes/no
- Games library — every game they're set up to squad for
- Reputation score and badges from past sessions

### Session board (the heart of the app)
- A live feed of open sessions, filterable by:
  - Game
  - Platform (or "crossplay ok")
  - Activity (changes per game — see section 6)
  - Skill / rank range
  - Spots open
  - Mic required or not
  - Vibe: chill, learning, farming, hardcore/speedrun
  - Starting now vs. scheduled
- **"Quick Squad" button:** set your preferences once, tap once, get placed into the best open session that fits

### Create a session
- Pick game → the form asks only what matters for that game (activity, target, spots, requirements)
- Set start time: now, or schedule it for later with a reminder

### Squad room
- The filled (or filling) session's own page: member list with their platform IDs ready to copy, ready-up buttons, the lobby code pinned at the top, and a simple session chat

### Friends & invites
- Add players you liked; invite them directly to future sessions
- Notifications: "your session is full," "session starts in 10 minutes," "a friend invited you"

### Trust & safety
- After-session ratings, block and report, hosts can remove players from their sessions
- This matters more than it sounds — it's the reason people would use this over a random Discord post

## 6. The key design idea: game templates

Every game needs different info to make a good match. Instead of one generic form, each game gets a **template** — its own set of session fields. That's what makes the app work for *any* game.

**Monster Hunter Wilds template (the example):**
- Target monster / quest type (story, farming a specific monster, event quest, endgame like Omega Planetes)
- Hunter Rank range (so a HR 10 player doesn't land in an endgame farm)
- Main weapon (Wilds has 14 — players like balancing a squad)
- Goal: first clear, farming parts, or just chill hunts

**Another game, same system:** a shooter template might ask map/mode/rank; a raid game asks raid name, light/power level, and experience ("KWTD" or teaching). You design the app once, then add a template per game as you grow.

## 7. Monster Hunter Wilds — full example walkthrough

> Nathan plays on console, Hunter Rank 120, main weapon Bow. The FFXIV collab boss Omega Planetes is live and he wants to farm it tonight. His friends aren't on.

1. He opens the app, picks **Monster Hunter Wilds** from his games.
2. Taps **Create Session**: Activity → *Event Quest*, Target → *Omega Planetes*, HR range → *100+*, Spots → *3 open*, Mic → *preferred*, Vibe → *farming*.
3. The session goes live on the board. A PC player (HR 210, Hammer) and two PlayStation players (HR 145 Insect Glaive, HR 98 Heavy Bowgun) request in — Nathan sees their profiles and reputations before accepting.
4. Squad full → Nathan creates a Link Party in Wilds and pastes the **lobby code** into the squad room. Everyone copies it into their game.
5. They're hunting together inside two minutes of the post — across console, PC, and PlayStation.
6. After the hunts, everyone rates each other. The Hammer player was a beast — Nathan adds him as a friend in the app for next time.

## 8. Screens to design

Design these pages and you've designed the app:

1. **Home / Session Board** — live sessions + filters + Quick Squad button
2. **Create Session** — the per-game form
3. **Session Detail / Squad Room** — members, lobby code, chat, ready-up
4. **Profile** — yours and other players' (platforms, games, rep)
5. **My Games** — your library and per-game details
6. **Friends** — saved players + invites
7. **Notifications**
8. **Settings** — platforms, privacy, blocked list

## 9. Design principles to follow

- **Fast beats fancy.** Goal: from opening the app to being in a squad in under 60 seconds.
- **Cross-platform first.** Never make one platform feel like the "main" one.
- **Structured, not free-text.** Dropdowns and tags beat paragraphs — that's the whole edge over Discord posts.
- **Trust is visible.** Reputation on every profile, everywhere.
- **Mobile-first.** Players check their phone while the game is on the TV.

## 10. Later ideas (version 2+)

- Scheduled sessions with a calendar and reminders
- Clans / guilds with their own pages and recurring squads
- Voice rooms inside the app
- Game event tie-ins (e.g., a Wilds festival event gets a featured session category)
- Smart matching that learns your play style and who you mesh with
- Premium tier: priority placement, advanced filters, profile flair

## 11. Things to decide / watch out for

- **Verification:** the app can't fully prove a gamertag belongs to someone without the platforms' official sign-in systems. Simple workaround people use: a code the player puts in their platform bio to prove it's theirs.
- **Moderation is real work.** Any app with chat and strangers needs report/block tools and someone watching them — budget the effort, it's not optional.
- **Cold start.** A finder app is only good with players in it. Launch around one or two games with hungry communities (Wilds is a great pick) instead of every game at once.
- **Legal basics.** You'll need a privacy policy and terms of service; the concept itself (a finder/organizer) doesn't need game publishers' permission, but don't use their logos/art in your branding without care.

## 11b. The Forge System — look and layout (Nathan's reference, Oct 22, 2026)

Nathan set the visual target: the app's forge system should look like the Monster Hunter Wilds smithy screens (his own screenshots). Two screens define it:

**Armor forge screen**
- Left: the armor sets as a grid of piece icons (helmet / chest / arms / waist / legs), grouped by set (e.g., Gore β, Arkveld α, Arkveld β, Guardian Arkveld α), with Low Rank / High Rank tabs
- Center: the selected piece's render, the materials it needs with owned counts (e.g., Arkveld Scale+ ×5 — 61 owned), and the required zenny cost
- Right: equipment info — rarity, defense, decoration slots, elemental resistances, equipment skills, set bonus skills — plus a Status panel showing exactly what changes if you forge it (health/stamina, attack status, defense status, before → after)

**Weapon forge screen**
- Left: the weapon tree — branching upgrade paths per monster/material line (Expedition, G. Rathalos, Ore, Rey Dau, Quematrice, Xu Wu, Hirabami, Bone, Uth Duna, Congalala…), locked nodes marked
- Tabs across the top: Weapon Tree / Forge List / Upgrade List
- Center: the selected weapon's render (e.g., Hope Bow I) and its required cost
- Right: equipment info (attack, affinity, element, slots, defense bonus) and the same before → after Status panel

**Design takeaways for the app version:** three-column layout (browse → inspect → compare), the render is the hero of the center column, materials always show "needed vs. owned," and every forge decision shows its stat impact before the player commits. First two asset cutouts (transparent PNGs) are already made from Nathan's screenshots: Arkvulcan Helm α and Hope Bow I, in `~/workspace/your_files/app-assets/`.

## 12. MVP summary — the smallest version worth building

One app (mobile first) with: profiles with platform IDs → game templates starting with Monster Hunter Wilds → session board with filters → create/join sessions → squad room with lobby code + chat → ratings after sessions. Everything else is phase two.

If people can open it, find a Wilds squad in a minute, and walk away with a new regular teammate, the concept works — then you grow it game by game.
