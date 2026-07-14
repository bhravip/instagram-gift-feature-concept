# Instagram Feature Concept - Save a Gift

**Live prototype:** https://instagram-gift-feature-concept.vercel.app

A product concept and interactive prototype exploring what it would look like if Instagram let you save a post specifically *for* someone. This is a case study / portfolio piece, not an affiliation with or endorsement by Instagram or Meta. All UI is an original design inspired by familiar social app patterns.

---

## Product overview

"Save as Gift" extends Instagram's existing save/collections feature to let users tag a saved post with a specific person instead of a generic folder. Long-pressing the save button on any post surfaces a "Save as gift" option; the user picks one or more followers, and the post is filed into a "Saved as gift" collection organized by recipient. It solves the moment where someone sees a product or post and thinks "X would love this" — but has no fast way to act on that thought before it's lost.

## Purpose, use cases, and main value propositions

**Purpose:** reduce the gap between spotting a gift idea and remembering it later, by attaching context (who it's for) at the moment of discovery instead of relying on memory.

**Primary use case:** a user is scrolling their feed, sees a product or post that reminds them of a specific person, and wants to save that thought without breaking flow or reconstructing it later.

**Secondary use case:** ahead of a birthday or occasion, a user opens their gifting collection to review everything they've saved for that person over time.

**Value propositions:**
- Turns a passive, generic save into an actionable, person-specific one
- Reuses existing save/collections infrastructure — low net-new complexity for a plausible feature pitch
- Removes the "who was this for again?" problem entirely, since the tag is attached at save time

## Features and functionality

| Feature | Description |
|---|---|
| Save as gift (long-press) | Long-pressing the save icon on a post reveals "Save" and "Save as gift" as two distinct actions |
| Person picker | Searchable list of followers; supports multi-select in a single save action |
| Multi-recipient save | Saving for multiple people creates one independent entry per recipient, not one shared entry |
| Saved as gift collection | A dedicated tab within Saved, organized as cards per person rather than a flat post grid |
| Per-person view | Tapping a person's card shows everything saved for them, most recent first |

## User personas and user stories

**Persona: the thoughtful scroller.** Regularly encounters gift ideas passively while browsing, buys gifts for ~5–15 people across the year, currently relies on memory or scattered notes to track ideas.

User stories:
- As a user scrolling my feed, I want to save a post to a specific person so I don't lose the thought of who it was for.
- As a user with several friends' birthdays coming up, I want to see everything I've saved for each of them in one place, so I don't have to search my camera roll or memory.
- As a user, I want to save one post for multiple people at once, since some gift ideas suit more than one friend.
- As a user, I want this saving activity to stay completely private, since a visible or notified save would ruin the surprise and feel invasive.

## User flows and user experience notes

**Primary flow:**
1. User sees a post and long-presses the bookmark icon
2. A menu appears with "Save" and "Save as gift"
3. Selecting "Save as gift" opens a searchable person picker
4. User selects one or more people, confirms
5. Post is saved once per selected person into the Saved as gift collection

**Retrieval flow:**
1. User opens Saved tab
2. Selects "Saved as gift" collection
3. Sees cards grouped by person
4. Taps a person to see everything saved for them

**UX notes:**
- The long-press must feel like a natural extension of the existing save gesture, not a separate, harder-to-discover action
- Confirmation on save should be lightweight (toast-style, not a modal) to keep the scrolling flow uninterrupted
- No visual indicator of this activity should ever be visible to the tagged person, in their notifications, or in any shared/mutual space

## Release criteria and timeline

This is a concept prototype, not a scoped production release — no committed timeline. For a hypothetical phased rollout:

- **V1 (concept, built):** long-press save flow, person picker, multi-select, Saved as gift collection view — all in the interactive prototype
- **V2 (not built):** birthday-aware sorting within the collection, when birthday data is available
- **V3 (not built):** lightweight nudge (not push notification) surfacing upcoming birthdays with what's been saved for that person

Release readiness for a real version would require privacy review (see Risks) before any production consideration.

## Potential risks

- **Privacy leak risk.** If a tagged save were ever surfaced to the recipient — even accidentally, via a bug or an edge case like a shared device — it would create real social harm (ruined surprises, awkwardness) and break trust in the feature entirely. This is the single highest-severity risk.
- **Low discoverability.** Long-press interactions are less discoverable than tap actions; users may never find "Save as gift" without onboarding or a hint.
- **Unreliable birthday data.** Most users don't have a public or accurate birthday on file, limiting any reminder or sorting functionality that depends on it.
- **Low engagement if collection goes unused.** If users save items but never revisit the collection before the relevant occasion, the feature provides capture without payoff.

## Non-functional requirements

- **Privacy:** save actions and the resulting collection must be fully private to the saver; no notification, activity log entry, or visibility to the tagged person under any circumstance
- **Performance:** the save flow must not introduce noticeable latency to the long-press gesture, since it's competing with the existing fast, familiar save action
- **Data handling:** person-tagging data (who was tagged, for what) is sensitive relationship data and should follow the same protection standards as DMs or other private user content, not standard public post metadata

## Assumptions, dependencies, and constraints

**Assumptions:**
- Users are comfortable with a private, invisible-to-others save action (i.e., they won't expect or want reciprocity/visibility)
- The existing save/collections infrastructure can be extended to support person-tagging without a full rebuild

**Dependencies:**
- Existing follower graph, to populate the person picker
- Existing save/collections system, as the underlying mechanism being extended

**Constraints:**
- Feature usefulness is capped by whatever birthday data Instagram already has, which is inconsistent and often private or absent
- Not designed to support checkout or shopping flows — saved items may or may not be purchasable depending on the original post's shoppability

## Evaluation plan and related success metrics

Hypothetical metrics for a real-world version:

- **Adoption:** % of users who use "Save as gift" at least once within 30 days of exposure
- **Retention of use:** % of users who use it again within 60 days of their first save
- **Collection revisits:** rate at which users return to the Saved as gift collection (a save with no revisit suggests low realized value)
- **Occasion correlation:** for users with birthday data on file, whether saves for a given person cluster in the weeks before that person's birthday (a signal the feature is being used as intended)
- **Qualitative:** user research on whether the privacy guarantee is trusted and understood, since trust here is a precondition for adoption, not just a nice-to-have

---

## Tech stack

Built with [Next.js](https://nextjs.org) and [v0](https://v0.app). Continue iterating on the design at the [v0 project link](https://v0.app/chat/projects/prj_I7AoHkhhb4G3Y0K23Cr3Qc7J2n5A).

### Running locally

```bash
npm install
npm run dev
```

Open http://localhost:3000 to view it.
