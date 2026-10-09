---
name: "AMT Auction Atlas"
description: "A night-survey learning atlas that turns 38 AMT lessons into one navigable decision route."
colors:
  survey-ink: "#0b0e0d"
  raised-ink: "#111614"
  inset-ink: "#18201d"
  annotation-bone: "#eee7d9"
  muted-bone: "#aba79d"
  faint-bone: "#858b84"
  execution-amber: "#f4b24b"
  active-amber: "#ffc865"
  context-teal: "#56c9bb"
  risk-blue: "#82c8e6"
  derived-orange: "#ff7a3c"
  survey-line: "rgba(238, 231, 217, .14)"
  survey-line-strong: "rgba(238, 231, 217, .26)"
  focus-bone: "#fff0a6"
typography:
  display:
    fontFamily: "Smiley Sans, sans-serif"
    fontSize: "clamp(2.1rem, 3.35vw, 3.7rem)"
    fontWeight: 500
    lineHeight: 0.98
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Smiley Sans, sans-serif"
    fontSize: "34px"
    fontWeight: 400
    lineHeight: 1.08
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Microsoft YaHei UI, PingFang SC, Noto Sans CJK SC, sans-serif"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.75
  editorial:
    fontFamily: "Georgia, STSong, serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.85
  label:
    fontFamily: "ui-monospace, monospace"
    fontSize: "11px"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "0.08em"
rounded:
  survey: "0"
  small: "8px"
  pill: "999px"
  coordinate: "50%"
spacing:
  hairline: "4px"
  compact: "8px"
  control: "12px"
  rhythm: "16px"
  section: "24px"
  field: "28px"
  editorial: "38px"
components:
  search-field:
    backgroundColor: "{colors.raised-ink}"
    textColor: "{colors.annotation-bone}"
    rounded: "{rounded.survey}"
    padding: "10px 12px"
    height: "40px"
  navigation-item:
    backgroundColor: "transparent"
    textColor: "{colors.muted-bone}"
    rounded: "{rounded.survey}"
    padding: "12px 10px"
  navigation-item-active:
    backgroundColor: "transparent"
    textColor: "{colors.active-amber}"
    rounded: "{rounded.survey}"
    padding: "12px 10px"
  coordinate-node:
    backgroundColor: "{colors.context-teal}"
    textColor: "{colors.annotation-bone}"
    rounded: "{rounded.coordinate}"
    size: "9px"
  tag:
    backgroundColor: "transparent"
    textColor: "{colors.muted-bone}"
    rounded: "{rounded.pill}"
    padding: "5px 9px"
  completion-action:
    backgroundColor: "{colors.execution-amber}"
    textColor: "{colors.survey-ink}"
    rounded: "{rounded.survey}"
    padding: "13px 16px"
---

# Design System: AMT Auction Atlas

## Overview

**Creative North Star: "Auction Cartography"**

AMT Auction Atlas is a late-night market cartographer's field book: a near-black plotted terrain with warm bone annotations and sparse mineral inks. It makes the course's causal chain spatial—context, location, trigger, risk, and review are territories on one route—while keeping detailed reading on a visually nearer, motionless plane.

The system is precise rather than ornamental. Fine contours, survey bearings, coordinate labels, stage pictograms, and engraved terrain establish a working atlas; each mark must either orient the learner or encode lesson state. The atlas preserves the product truth: 37 subtitle-reviewed lessons and the title-derived chapter 15 are visually distinguishable, and no visual device implies trading performance or certainty.

**The Cartography Before Cards Rule.** Express hierarchy with route layers, coordinates, bearings, plaques, and editorial rules; do not default to a dashboard of interchangeable cards.

**Key Characteristics:**

- One continuous plotted route across five learning territories.
- Near-black survey ground, warm bone type, and restrained mineral phase inks.
- Engraved terrain behind the atlas; a quiet, fixed reading sheet in front.
- Stage pictograms, numbered plaques, coordinate nodes, and dashed conceptual bearings.
- Honest source-state marks, keyboard focus, reduced motion, and narrow-screen horizontal map travel.

## Colors

The palette is a mineral notation system, not decoration. Survey Ink, Raised Ink, and Inset Ink build the near-black depth stack; Annotation Bone, Muted Bone, and Faint Bone establish text hierarchy. Context Teal, Execution Amber, Derived Orange, Risk Blue, and Review Bone identify the five phases and functional states. Active Amber may intensify selection, while Focus Bone is reserved for keyboard visibility.

**The Sparse Mineral Rule.** Use a phase ink on coordinates, route segments, stage plaques, status marks, and small headings; large surfaces remain ink or bone.

**The Source Honesty Rule.** A title-derived lesson uses Derived Orange with a dashed mark. Never render it with the solid subtitle-reviewed grammar.

Hairline dividers use Survey Line or Survey Line Strong. They structure the field without turning the shell into bordered boxes.

## Typography

Self-hosted Smiley Sans (`assets/SmileySans-Oblique.woff2`, distributed with `assets/SmileySans-LICENSE`) is the display and cartographic voice. Use it for the thesis headline, reader title, stage plaques, and short display labels. The Chinese UI body uses the neutral system stack Microsoft YaHei UI, PingFang SC, and Noto Sans CJK SC. Georgia with STSong supports longer editorial summaries and section heads; monospace is limited to coordinates, lesson codes, durations, and metadata.

**The Two-Plane Type Rule.** Smiley Sans names the terrain; the neutral Chinese sans explains and operates it. Do not use the display face for dense paragraphs.

**The Instrument Label Rule.** Uppercase English abbreviations and numeric metadata may use the compact monospace label role with tabular figures; preserve Chinese readability everywhere else.

## Layout

The desktop shell has three persistent planes: a left instrument rail, a central atlas, and a fixed-width reader. The top bar belongs to the atlas-and-reader workspace while the rail spans the full height. The central field absorbs available width; the reader stays visually stable so changing coordinates never disorients reading.

At 1180px the rail compresses to icon width and the reader narrows. At 900px the shell becomes a single column: the rail becomes an off-canvas drawer, the atlas precedes the reader, and page scrolling replaces the locked viewport. At 560px the route field preserves its plotted width and becomes a horizontal atlas rail with an explicit drag cue rather than collapsing coordinates into a generic list.

**The Persistent Place Rule.** Keep atlas context visible whenever the viewport permits; lesson changes update the reader without a page reload or loss of route position.

**The Horizontal Atlas Rule.** On narrow screens, preserve route geometry through horizontal travel. Do not squeeze labels until they collide or replace the map with cards.

The route is continuous and bends through every phase. Selecting a node brightens the traveled segment and draws dashed Context Teal bearings to related lessons; completed nodes receive a small teal survey check.

## Elevation & Depth

Depth comes from plotted layers, not a shadow-heavy card stack: fixed contour field, engraved terrain plate, route and relationship lines, coordinate nodes, stage plaques, then the reader sheet. Translucent near-black surfaces and subtle backdrop blur separate the rail, top bar, and sticky reader controls. Shadows are reserved for the mobile drawer and toast, where physical separation is functional.

The deployed terrain source is `assets/plates/full-atlas.png`, generated as a text-free engraved night-atlas plate from `.impeccable/terrain-prompt.txt`. Keep the plate free of baked-in UI, words, numbers, logos, charts, candlesticks, and performance claims; HTML owns all labels and semantics. `assets/amt-terrain.png` is not present in the current deployed workspace and should not be treated as the source of truth unless the implementation is updated to use it.

**The Quiet Reader Rule.** Background terrain may drift remotely, but the reading plane must remain still. Under reduced-motion preference, all animation and transition duration collapses to effectively zero.

## Shapes

The form language is surveyed and mostly square. Search, navigation, buttons, plaques, and reading controls use hard corners and one-pixel rules. Circles are semantic: stage seals and coordinate nodes. Pills are reserved for tags. The faceted brand mark is a singular triangular survey emblem, not a general container shape.

**The Semantic Circle Rule.** Circular geometry always means a plotted point, stage, or location state; never use it as arbitrary decoration.

**The Plaque Rule.** A stage identity combines a circular line pictogram with a rectangular phase-color name plaque and a compact numeric tab. Keep these elements as one grammar.

## Components

- **Instrument rail:** near-black full-height navigation with a faceted A mark, sparse line pictograms, an amber active bearing, source counts, and the chapter-15 provenance note.
- **Search field:** square survey input with a hairline border, magnifier, muted placeholder, and `/` keycap. It filters chapters and concepts without changing original numbering.
- **Route node:** a small phase-color coordinate with lesson number and a short tag. Hover expands the point; active state inverts the core and adds an offset phase ring; completed state adds a teal check; filtered nodes recede rather than rearrange the map.
- **Stage plaque:** line-art pictogram in a circular seal, two-digit stage tab, and phase-color rectangular title plaque. Pictograms are terrain, target, order-flow bars, shield, and growth sprout.
- **Related bearing:** a dashed Context Teal curve between the active coordinate and conceptual neighbors. It is subordinate to the main traveled route.
- **Reader sheet:** sticky breadcrumb and previous/next controls above a quiet editorial column. Metadata is monospace; summaries use the editorial serif; knowledge points and checklists are separated by hairlines rather than cards.
- **Completion action:** full-width phase-color action with a subtle lift on hover; its completed state returns to dark ink with a teal boundary.

**The One Active Bearing Rule.** Only the selected lesson receives the strongest ring, bright route segment, and related bearings. Competing active treatments weaken orientation.

All interactive elements expose a Focus Bone two-pixel outline with clear offset. The skip link appears on focus. Hover motion is short and purposeful; focus and content remain understandable when motion is removed.

## Do's and Don'ts

**Do:**

- Preserve the visual chain from market context to review as one route.
- Use real phase color and coordinate states to encode meaning.
- Keep the reader text measure quiet and stable while the atlas changes.
- Preserve Chinese copy legibility and English AMT abbreviations.
- Mark chapter 15 as title-derived with the dashed orange grammar.
- Keep focus visible and honor reduced-motion preference.
- Extend the pictogram/plaque/coordinate grammar to future glossary, notes, progress, and quiz surfaces.

**Don't:**

- Replace the atlas with a generic card grid or KPI dashboard.
- Add candlestick decoration, neon cyberpunk glow, gradients, colored blobs, or ornamental charts.
- Flood large surfaces with phase colors; mineral inks are notation.
- Bake labels or claims into the terrain image.
- Imply trading outcomes, certainty, or source coverage the product does not have.
- Collapse narrow-screen nodes into unreadable overlaps; keep the horizontal rail.
- Animate the reader, ignore keyboard focus, or rely on motion alone to communicate state.
