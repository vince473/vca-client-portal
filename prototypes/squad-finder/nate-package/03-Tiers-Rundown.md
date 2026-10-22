# Squad Finder — Membership Tiers (Monster Hunter Wilds)

**Status:** Framework ready — waiting on Vince's full functionality list to slot every feature into its tier.

## The tiers

| Tier | Name | Price |
|---|---|---|
| Free | Free | $0 |
| Silver | **Silver Seikret** | TBD |
| Gold | **Golden Rathalos** | TBD |

*(Names as Nathan set them Oct 22, 2026 — fix here if either changes.)*

**Tier rule (Nathan, Oct 22, 2026): Golden Rathalos includes everything available in Silver Seikret, plus Gold-only features.**

## What the app has to nail first (bare-bones pillars)

Everything else is extra until these three work:

1. **Fast matchmaking.** Wilds matchmaking is slow and random — the app's whole pitch is getting a full group *fast*. Target: open app → in a squad in under a minute.
2. **Smart matching.** Players matched by:
   - **Elo / ranking** (Hunter Rank and skill level — play with people at your level)
   - **Play style** (chill, farming, hardcore/speedrun, learning-friendly)
   - Platform / crossplay, region, language, mic
3. **Player ratings.** After every hunt, rate your squad — the reputation system is what keeps match quality high and trolls out.

## Tiering principles (how we decide what goes where)

- **Core matchmaking stays free.** Speed comes from a big player pool — if matching itself sits behind a paywall, the pool shrinks and matching gets slow for *everyone*, including paying members. Monetize around the core, not the core itself.
- **Free = the full basic loop.** Find a match, get rated, play. Free players are the pool that makes paid tiers valuable.
- **Silver = convenience + control.** More filters, more say in who you match with, quality-of-life upgrades.
- **Gold = the full hunter fantasy.** Everything in Silver + priority, prestige, and the deepest tools — the tier for the hardcore crowd.
- **Never sell power over other players.** Paid tiers can speed up *your* experience and polish your profile; they shouldn't let anyone buy wins or dodge the rating system.

## Feature placement

*(To fill in from Vince's functionality list — every function gets a tier and a one-line reason.)*

### Free tier
- _pending Vince's list_

### Silver Seikret
- **Player ratings + standing rewards** (Nathan's addition, Oct 22, 2026) — Silver members rate squadmates after hunts and earn rewards two ways: for actually rating (keeps the reputation system fed) and for keeping good standing / high ratings themselves. Rewards build toward a set threshold; hit it and cash in for **free tokens or a free month**. (Threshold value TBD — Nathan's call during the rundown.)

### Golden Rathalos
- **Everything in Silver Seikret** — Gold includes all Silver features (including player ratings + standing rewards), per Nathan's tier rule.
- **In-app build planner** (Nathan's addition, Oct 22, 2026) — an MH Wilds Hub-style builder, but better, modeled on **the in-game forge system**: full catalog of every weapon/armor piece/decoration/talisman with an image for each item, forge materials + zenny costs, and upgrade paths, on top of live stat + skill calculations, hitzone damage tool, and set searcher, tied into hunter profiles and squad rooms. Full feature inventory + "how ours goes better" notes: `MH-Builder-Feature-Reference.md`; item dataset: `builder-data/` (same folder).

### Undecided / needs Nathan's call
- _pending Vince's list_

## Open questions for the rundown

- Monthly vs. one-time vs. season-pass pricing for Silver/Gold?
- Do paid tiers unlock per game, or one membership across all games later?
- Trial period for Gold so free players can taste it?

---

## Tier playbook — what real LFG apps put behind paywalls (researched Oct 22, 2026)

Nathan's call on all of this; it's ammunition for the rundown, not decisions. The pattern across working LFG apps is consistent: **core matchmaking stays free** (the player pool IS the product), and paid tiers sell convenience, control, and prestige around it.

**Free (the pool):** RankUpTogether and WildStack both keep core matchmaking + chat free — free players are the ones who make the paid tiers worth paying for. So: match by HR/playstyle, post and join sessions, rate players, basic profile. Full basic loop, no paywall on getting into a squad.

**Silver Seikret (convenience + control)** — from Team Up Premium + GameTree Scout premium:
- Deeper filters before you match: specific weapon mains, quest type (farm vs. story vs. tempered), mic-required lobbies, HR range windows
- Saved session templates — one tap to repost your usual farm ("Omega Planetes, HR 100+, chill, mic")
- More active session listings at once; your posts auto-bump and stay live longer (Scout sells exactly this as premium)
- See a player's full rating breakdown + badges *before* you join them

**Golden Rathalos (priority + prestige)** — everything in Silver, plus:
- Priority matching queue: you fill squads first during peak hours
- Hunter-fantasy cosmetics: Golden Rathalos profile theme, animated badges, custom gamer card (Noobly's whole economy is cosmetics — people pay for the look)
- Advanced stats: your rating trend over time, hunt history, who you play best with
- Early access to new game templates when the app expands past Wilds

**Pricing anchors (his call):** niche mobile gaming apps land ~$3–5/mo for mid tier, ~$8–10/mo for top (Discord Nitro is the $10 reference point). Start simple: Silver ≈ $4.99/mo, Gold ≈ $9.99/mo, annual = 10 months' price. Keep the free tier genuinely good or the pool dies.

**One caution from the field:** Crewlier went 100% free with no paid plan at all — fine for users, but then the app has no revenue engine. If Nathan ever wants this to pay for itself, the paywall has to be real but never touch matchmaking itself.

---

## Vince's functionality list (received Oct 22, 2026)

### Live today
- **Title screen** — logo, lightning, flickering neon, sound toggle, Press Start
- **Sign in** — email + password, or Google
- **Link platforms** — Xbox gamertag, PSN ID, Steam name, main platform, handle, Hunter Rank, main weapon
- **Session board** — live Wilds sessions; filters: Farm runs, Chill, Learning, Carry, Speedrun, Fits my HR, Mic required, 2+ spots
- **Session detail** — target monster, goal, HR range, mic, vibe, platforms, host note, everyone's rep shown before joining; join blocked *with a reason* if HR/platform doesn't fit or it's full
- **Post a session** — monster, goal, HR range, weapon, squad size 2–4, mic, vibe tags, crossplay platforms, short note
- **Squad room** — slots fill live; host drops the Link Party code once full, visible only to squad members; "I'm in the lobby" button; host taps "Hunt complete"
- **Rate the squad** — thumbs up/down + tags (Good comms, Knows mechanics, Carried the team, Hunt again / Left early, Toxic, AFK); anonymous; only people actually in the session can rate
- **Profile** — rep score 0–5 with tier (Trusted, Solid, Mixed, Flagged), commendations, linked IDs, recent hunts; other players never see your gamer IDs
- **Game templates** — Wilds live; Shooter, Raid/MMO, Survival "coming soon"
- **Squad Pass page** — Free / $2.99/mo Squad Pass / $9.99 Founder Lifetime (first 500)
- **Admin (Nathan)** — users, sessions, reports, bans

### Behind the scenes
- Free = 2 posts/day; spam limits on joining, rating, reporting
- Players with 10+ ratings and rep under 3.0 are auto-hidden from the board
- One squad at a time per player
- Installs to the phone home screen (PWA)

### Not built yet
- Payments (waiting on Nathan's Stripe setup)
- Only one game; no Discord sign-in or bot; no in-app chat/voice
- Gamer IDs unverified (Xbox/PSN don't allow it; Steam could be verified later)
- No push notifications; not in the App Store / Google Play yet
- Terms + Privacy are drafts
- **Board is empty — needs a first wave of players**

### Vince's tier draft (all open to change — note it runs 4 paid levels vs. Nathan's 3 named tiers)
- **Finder (free):** browse, join open sessions, rate, 2 posts/day
- **Silver $2.99/mo:** unlimited posts, pinned to the top, badge, custom vibe tags
- **Gold $5.99/mo:** Silver + Gold rooms (Gold+ only), save favorite squadmates + invite them, first in line for open spots
- **Platinum $9.99/mo:** Gold + Platinum rooms (top-rep only), host events/tournaments, profile flair, early access to new games
- **Founder Lifetime $9.99 once, first 500:** Silver for life + Founder badge
- **Add-on:** $0.99–$1.99 one-time pass to join a single Gold/Platinum room

### Vince's two flags
1. **Locked rooms need players first** — Gold/Platinum rooms could sit empty at launch; maybe start Free + Silver and switch the rest on once it's busy.
2. **Charging for carries may break the game's rules** — charging for *room access* is safer; legal side being looked at.

---

## The 16 questions — Nathan answers one at a time (started Oct 22, 2026)

**Tiers**
1. What gets someone into Gold and Platinum rooms: paying, rep score, Hunter Rank, or a mix?
2. What prices feel right? Monthly or one-time?
3. One-time pass for a single higher-tier room? What price?
4. Founder Lifetime: Silver for life or Gold for life? Is 500 the right cap?
5. All tiers day one, or start Free + Silver?
6. The one perk people would pay for first?

**Games & features**
7. Which game goes live second, and what does its post form need (mode, map, rank, role)?
8. Is Wilds still the right launch game for your Discords?
9. How important is Discord sign-in / a bot that posts new sessions into your servers?
10. In-app chat, or is Discord enough?
11. Any rating tags missing?
12. Are the Link Party menu steps in the app correct?

**Launch**
13. How many players across your Discords could we reach in week one?
14. Who could test it this week and post the first sessions?
15. Launch night where everyone hunts together to fill the board?
16. Anything confusing or broken when you tapped through?

_Answers get recorded here as Nathan calls them._

**Q1 — ANSWERED (Oct 22, 2026):** Gold/Platinum room access = **a mix of paying + rep score**. Paying opens the door; rep score guards it (exact rep floor TBD).

**Q2 — ANSWERED (Oct 22, 2026):** Pricing = **monthly, at Vince's prices** — Silver $2.99/mo, Gold $5.99/mo, Platinum $9.99/mo.

**Q3 — ANSWERED, then CORRECTED (Oct 22, 2026):** Single-room pass = **yes, $1.99** — BUT it is **not** a skeleton key into any room. Nathan's rule: hunters taking on the challenge (the carriers) **must not be burdened with someone just paying their way in for a one-time pass** — the pass doesn't override the room; the hunters in it still have their say (ties into Q1's rep gate).

**"Will Carry" option — Nathan's addition (Oct 22, 2026):** Add a **"Will Carry"** option hunters can take on — they volunteer to carry. In return, carrying earns **rewards: discounts on monthly charges, or other such perks**. This is the carrier-reward engine: the app pays its carriers in discounts instead of charging anyone to be carried (the safe side of Vince's legal flag).

**Q4 — ANSWERED (Oct 22, 2026):** Founder Lifetime = **Silver for life** (Vince's draft stands; $9.99 once, first 500). And NO — the Founder deal is **not** tied to Will Carry: Nathan clarified Will Carry is **strictly a case-by-case thing** (decided per hunt/room), not a standing class of players that founders are drawn from. Carrier rewards (discounts on monthly charges etc.) still stand as he described them; they just run case by case, separate from the Founder deal.

**Q5 — ANSWERED (Oct 22, 2026):** Launch scope = **Free + Silver first**; Gold/Platinum rooms switch on later, once the board has population (Vince's flag #1, accepted).

**Q6 — ANSWERED, then AMENDED (Oct 22, 2026):** The #1 perk people would pay for first = **priority — first in line for open spots**. **Amendment (Nathan): priority is tiered — higher tiers have higher priority.** Ladder: Free = standard queue → Silver = priority → Gold = higher priority → Platinum = first in line overall. (This resolves the earlier launch flag: priority now *starts* at Silver, the launch paid tier, and scales up — each tier's priority beats the one below it.)

**— Tiers section (Q1–Q6) complete, Oct 22, 2026. —**

**Q7 — ANSWERED (Oct 22, 2026):** The game order after Wilds: **#2 slot stays TBD** (Nathan names it later), and queued **behind the TBD** are **Call of Duty** and then **a sports game** (specific sports title not named yet — Madden / 2K / EA FC class). Post-form sketches for the queued games:
- **Call of Duty:** mode (Multiplayer / Warzone / Zombies / Ranked Play) → playlist/map → rank bracket (Ranked division, or casual) → role/playstyle (slayer, objective, sniper, support) → party size → platform/crossplay → mic. (Fits Vince's Shooter template.)
- **Sports game:** title → mode (head-to-head, Ultimate Team/MUT, Pro Clubs/Rec) → team overall / skill bracket → position needed (Clubs/Rec) → format (casual/ranked, game length).

**Q8 — ANSWERED (Oct 22, 2026):** **Yes — Wilds is the launch game** for Nathan's Discords. Confirmed.

**Q9 — ANSWERED (Oct 22, 2026):** Discord = **the bot matters most, build it early** (posts new sessions into his servers = distribution). Discord sign-in is secondary/convenience.

**Q10 — ANSWERED (Oct 22, 2026):** **Discord is enough** — no in-app chat/voice. Comms stay on Discord; the app handles finding the squad and the lobby code.

**Q11 — ANSWERED (Oct 22, 2026):** Add two rating tags: **Patient teacher** (positive) and **No mic** (negative). **Flag (Nathan, Oct 22):** Patient teacher is flagged as **reward-linked for later** — earning it should feed the rewards system (carrier/teacher discounts). The discount specifics are **deferred — Nathan will discuss discounts with Vince later.**
**Flag 2 (Nathan, Oct 22):** The carry discounts are **NOT displayed** in the app — the discount system stays quiet/behind the scenes, not advertised in the UI.
**Rewards principle (Nathan, Oct 22):** "**Reward good people for being good people.**" The rewards are recognition for being a good community member (patient, helpful, solid rep) — not payment for a carry service.

**Q12 — ANSWERED (Oct 22, 2026):** **Flag the Link Party steps for Vince to double-check against the real Wilds flow.** (Real flow, verified: Link Parties form by invite — Menu → Communication → Link Party → Invite to Link Party; members add via Hunter ID Search and accept. There is no Link Party join-code; codes in Wilds = Hunter ID and private Lobby ID.)

**Hunter ID decision (Nathan, Oct 22, 2026):** **Hunter ID becomes a REQUIRED profile field, shown on the profile** — so squadmates can see it and send the friend request / Link Party invite straight from the app flow, no asking for it mid-lobby. Rationale: it's much faster. (Distinction: the Hunter ID is Capcom's share-by-design invite ID — this doesn't change Vince's rule that Xbox/PSN/Steam gamer tags stay hidden from other players.)

**— Games & features section (Q7–Q12) complete, Oct 22, 2026. —**

**Q13 — ANSWERED (Oct 22, 2026):** Week-one reach across Nathan's Discords = **50–200 players**.

**Q14 — ANSWERED (Oct 22, 2026):** First testers/posters = **open call in the Discord first** (recruit from the community rather than hand-picking names).

**Q15 — ANSWERED (Oct 22, 2026):** **Yes — a full launch night event** where everyone hunts together to fill the board.

**Q16 — ANSWERED (Oct 22, 2026):** Nathan tapped through the prototype — **ran clean, nothing confusing or broken** to report.

**— ALL 16 QUESTIONS COMPLETE (Oct 22, 2026). Decisions packaged for Vince in `Squad-Finder-Decisions-for-Vince.md`. —**
