# Instagram Feature Concept - Save as Gift

**Live prototype:** https://instagram-gift-feature-concept.vercel.app

A product concept and interactive prototype exploring what it would look like if Instagram let you save a post specifically *for* someone. This is a case study / portfolio piece, not an affiliation with or endorsement by Instagram or Meta. All UI is an original design inspired by familiar social app patterns.

# PRD: Instagram "Save as Gift"

## Product overview

"Save as Gift" is an extension of Instagram's existing Save/bookmark behavior that turns saved posts into a lightweight gift-planning tool. When a user long-presses the Save button on a post, they get a new option—"Save as gift"—that lets them attach one or more people to the saved item. These gift saves live in a dedicated "Saved as gift" collection in the Saved tab, organized by recipient, so users can keep a running list of gift ideas for the people in their life. Every saved item links back to the original post, keeping discovery and purchase intent connected to the source content.

## Purpose, use cases, and main value propositions

**Purpose.** People already use Instagram's Save feature as an informal wishlist and idea board, but there's no way to tie a saved item to *who* it's for. This feature closes that gap by adding recipient context to saves, reducing the friction of remembering "who was this for again?"

**Primary use cases.**

- Spotting a product a friend or family member would love and saving it against their name for a future birthday or holiday.
- Building up gift ideas over time for multiple people, then browsing them per-person when an occasion arrives.
- Saving a single post for several people at once (e.g., a candle both your mom and sister would like).
- Returning to the original post to view details, comments, the seller, or a product tag when ready to act.

**Value propositions.**

- **For users:** an organized, occasion-ready gift board that removes mental overhead and prevents lost ideas.
- **For creators/sellers:** stronger downstream purchase intent, since gift saves route users back to the source post.
- **For Instagram:** deeper engagement with Save and Shopping surfaces, and a differentiated, emotionally resonant use of an existing behavior.

## Features and functionality

1. **Long-press Save menu.** A press-and-hold (or right-click on desktop) on the Save icon reveals a contextual menu with "Save" and "Save as gift." A normal tap still performs a standard save, preserving existing behavior. The menu is dismissible by tapping outside it.
2. **Recipient picker (bottom sheet).** Selecting "Save as gift" opens a sheet showing a preview of the post, a searchable list of people (searchable by name, username, or relationship), and multi-select checkboxes.
3. **Multi-recipient save.** Choosing multiple people creates one gift-save entry per person for the same post. Duplicate saves (same post + same person) are prevented.
4. **Optional note.** Users can attach a short note per save (e.g., "birthday, size M").
5. **"Saved as gift" collection.** A new collection in the Saved tab, with a live count, grouping gift saves by recipient.
6. **Per-person grouping.** The same post appears under each recipient it was saved for. Individual saves can be removed.
7. **Deep link back to source.** Every saved thumbnail opens the original post in a detail view (with author, location, media, and full post actions) and a back control to return to the collection.

## User personas and user stories

**Persona 1 — "The Thoughtful Planner" (Maya, 29).** Plans gifts months ahead, screenshots things constantly, loses track of them.

- *As a planner, I want to tag saved posts with a person so that I can find gift ideas per recipient when an occasion comes up.*
- *As a planner, I want to add a note to a save so that I remember why it fit that person (size, color, occasion).*

**Persona 2 — "The Last-Minute Shopper" (Dev, 34).** Remembers occasions late, needs fast recall.

- *As a last-minute shopper, I want to open a person's gift list quickly so that I can act without scrolling my entire Saved feed.*
- *As a shopper, I want to jump from a saved idea back to the original post so that I can reach the seller or product tag immediately.*

**Persona 3 — "The Generous Multi-Gifter" (Sam, 41).** Buys for many people, spots items that suit several at once.

- *As a multi-gifter, I want to save one post for several people at once so that I don't repeat the same action multiple times.*

## User flows and user experience notes

**Flow A — Save a post as a gift.**

1. User long-presses Save on a post → menu appears.
2. Taps "Save as gift" → recipient sheet opens with post preview.
3. Searches/selects one or more people, optionally adds a note.
4. Taps the dynamic confirm button ("Save gift for N people") → sheet closes, save is confirmed.

**Flow B — Browse gifts by person.**

1. User opens Saved tab → sees "Saved as gift" collection with a count badge.
2. Opens it → sees ideas grouped by recipient.
3. Taps a thumbnail → original post opens in a detail overlay; back returns to the collection.
4. Optionally removes a save via the X control on a thumbnail.

**UX notes.**

- The long-press must not be dismissed by the trailing click/synthesized touch event that follows a press-and-hold; the menu stays open until an explicit outside tap or selection.
- A normal tap preserves the standard, instant save with no menu.
- Thumbnails are full tap targets for opening the post, with remove and note controls layered above so both interactions coexist.
- Confirm button copy adapts to selection count to reinforce the multi-save mental model.

## Release criteria and timeline

**Release criteria.**

- Long-press reliably surfaces the menu on touch and pointer devices and remains open for selection.
- Standard tap-to-save is unchanged.
- Multi-select creates exactly one entry per selected person; duplicates are prevented.
- "Saved as gift" collection renders grouped-by-person with accurate counts.
- Every saved item deep-links to its source post and back.
- Accessibility: all controls keyboard- and screen-reader-operable with correct labels/roles.

**Indicative timeline (phased).**

- Phase 1 — Concept mockup and interaction validation (complete).
- Phase 2 — Design review, accessibility audit, and usability testing.
- Phase 3 — Backend model for gift saves + recipient resolution, behind a feature flag.
- Phase 4 — Limited rollout and instrumentation review.
- Phase 5 — General availability.

*Note: the current build is an interactive front-end mockup with in-memory state; dates should be set with the responsible eng/design teams.*

## Potential risks

- **Privacy/social sensitivity:** users may worry that recipients can see they were tagged for a gift. Gift saves must be strictly private to the saver.
- **Interaction discoverability:** long-press is a hidden gesture; users may never find "Save as gift."
- **Gesture conflicts:** long-press can collide with existing OS/app gestures or the timing of trailing tap events (a bug already addressed in the mockup).
- **Scope creep toward commerce:** pressure to add price tracking, wishlists, or purchasing could balloon scope.
- **Recipient data:** mapping "people" to followers/contacts raises data-model and consent questions.
- **Scale:** duplicate-prevention and per-person grouping must stay performant for heavy savers.

## Non-functional requirements

- **Performance:** menu appears within perceptual instant (<100ms after gesture recognition); collection views render smoothly for large save counts.
- **Accessibility:** WCAG 2.1 AA — semantic roles (menu/menuitem), descriptive ARIA labels, full keyboard operability, adequate contrast.
- **Privacy & security:** gift saves and notes are private to the user; recipient associations are never exposed to the recipient or third parties.
- **Reliability:** saves persist durably; no data loss on navigation or app restart (requires backend beyond the current in-memory mockup).
- **Responsiveness:** works across mobile and desktop, in light and dark modes.
- **Internationalization:** dynamic copy (e.g., "Save gift for N people") must support pluralization and localization.

## Assumptions, dependencies, and constraints

**Assumptions.**

- Users already treat Save as an informal wishlist.
- A meaningful share of saves have gift intent that today goes uncaptured.
- Users are comfortable associating saved content with people privately.

**Dependencies.**

- A "people" source (followers/close friends/contacts) to populate the recipient picker.
- Backend storage for gift saves, recipients, and notes (recommended: a database integration; the current mockup uses in-memory React state).
- Existing Save/Collections infrastructure and post-detail rendering.

**Constraints.**

- Must not alter or regress the existing one-tap Save behavior.
- Long-press remains a secondary, additive gesture.
- Current implementation is a front-end concept with no persistence or real recipient graph.

## Evaluation plan and related success metrics

**Evaluation plan.**

- Usability testing on gesture discoverability and the multi-recipient mental model.
- A/B test of "Save as gift" (flagged) vs. control, measuring adoption and impact on overall Save usage.
- Funnel instrumentation across long-press → sheet open → save confirmed → collection revisit → source-post open.
- Qualitative surveys on perceived usefulness and privacy comfort.

**Success metrics.**

- **Adoption:** % of saving users who use "Save as gift"; gift saves per active saver.
- **Engagement:** repeat visits to the "Saved as gift" collection; multi-recipient save rate.
- **Downstream intent:** click-through from a saved gift back to the source post (and, where applicable, to product/seller surfaces).
- **Retention/quality:** removal rate (proxy for mis-saves), and whether total Save activity rises without cannibalizing standard saves.
- **Guardrail metrics:** no regression in standard Save completion time or success rate; zero privacy incidents related to recipient exposure.
