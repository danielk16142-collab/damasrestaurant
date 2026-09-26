# Typography and fit: every screen, every language

**The rule, for every project:** every piece of text fits, reads well and never overlaps, at any screen size from a 320px phone to a 1920px monitor, turned sideways, at 200% browser zoom, and in every language the site ships in. A page isn't done until the screen check passes for every language. This applies to any site you build, with or without the kit, whatever the stack.

Load `frontend-design` (its `reference/typography.md`) and `apple-design` §15 for the reasoning behind these rules; this file turns them into numbers and a check.

## 1. Sizes come from one fluid scale

- Generate the scale, don't hand-pick sizes:
  `python <skill>/scripts/type_scale.py --table` prints the tokens and their px at each test width. `--write <site>` puts them in `src/styles/global.css` (kit sites); for other stacks, paste the printed tokens into the site's CSS.
- Defaults: body 16px on a 360px phone → 18px at 1440px, ratio 1.2 → 1.4, steps `--step--2` … `--step-6`. Go calmer (ratio 1.25 on desktop) for clinics, trades and dense content; bolder (1.5, or a `--display-max` for one giant hero word) for editorial and hospitality.
- Sizes are `clamp(rem, rem + vw, rem)`: they grow smoothly between the two widths and still grow when the visitor zooms. Never size text in `vw` alone.
- **Every font size in the CSS is a token.** No one-off `font-size: 0.64rem`. If a new size is needed, it's a new token.
- Fixed, not fluid: labels, captions, buttons, form fields, nav links (`--step--2`, `--step--1`, `--step-0`).
- Keep each step's desktop size within 2.5× its phone size (the generator warns); a giant hero word may go past it only if it's capped by screen height too (§3) and the zoom check passes.

## 2. Minimums (no exceptions)

| Text | Minimum |
|---|---|
| Body and running text on phones | 16px |
| Fine print (notes, disclaimers, legal) | 14px |
| Labels in spaced capitals | 12px (`--step--2`) |
| Anything readable | 12px (logos are artwork, not text) |
| Form fields | 16px (iOS zooms the page into smaller fields) |
| Line length | 45–75 characters (`max-width: 65ch` on prose) |

## 3. Headlines

- **Lines never touch.** Line-height for display type is set per font, starting around 1.05–1.15; fonts with tall ascenders or long descenders (Bodoni, Didone, script faces) need more. The screen check measures real glyphs and fails when a descender from one line meets an ascender, accent or dot on the next. Accented capitals (É, Ñ, Ô) need extra room: test the languages that use them.
- **Letter-spacing by size:** negative on big display text (−0.02 to −0.035em), 0 on body, positive on small capitals (+0.12 to +0.22em). Never one value for every size.
- **Capped by screen height:** hero headlines use `min(var(--step-6), 18svh)` (or similar), so they shrink on short and sideways screens. The hero must show its headline and main action without scrolling on a 375×667 phone.
- `text-wrap: balance` on headings; set a `max-width` in `ch` so lines break where you intend.
- Allow long words to wrap: `overflow-wrap: break-word` and `hyphens: auto` (with the right `lang` on `<html>`) on headings and titles, and `min-width: 0` on grid/flex children that hold text (otherwise one long word widens the whole column).

## 4. Every language

- Design and test with the **longest** language, not the one you write in. French and Spanish run 15–30% longer than English; German more.
- Buttons, pills, tabs and nav links grow with their text: no fixed widths, and on phones buttons may wrap to two lines rather than overflow.
- Check that transcreated headlines still break well (a balanced two-liner in English can become an awkward three-liner in Spanish), and adjust the copy or the `max-width`, not the font size of one language.
- Run the screen check on every language's pages (§5), not only the default one.

## 5. The screen check (required before calling pages done)

Run it against the dev or preview server, from the site folder:

```bash
npm i -D playwright
node <skill>/scripts/check_type.mjs http://localhost:4321
```

- It follows the links on the home page (every language's home too if they're linked) and checks each page at 320, 375, 390, a sideways phone (667×375), 768, 1024, 1280, 1440, 1920 and 200% zoom. Pass paths to check specific pages, `--sizes 320,375` to limit sizes, `--full` for full-page screenshots.
- **Errors** (must be fixed): the page scrolls sideways; text runs off the screen, is cut off, or a word sticks out of its box; text under the minimums; headline lines touching.
- **Warnings** (look, then decide): 14–16px running text, lines longer than ~85 characters, a hero headline taking more than 60% of the screen or cut by the fold.
- Screenshots of every page at every size land in `./type-check/` with `report.json`. Look through the phone and zoom ones yourself: the check catches overflow, not ugliness. Add `type-check/` to `.gitignore`.
- If the browser is missing: `npx playwright install chromium`.
- Fix causes, not symptoms: change the token, the line-height, the `min-width: 0`, the wrap rule, or the copy. Don't add `overflow: hidden` to make an error disappear.

## 6. Quick fixes for common findings

| Finding | Usual fix |
|---|---|
| Page scrolls sideways | a grid/flex child without `min-width: 0`; a `nowrap` button or label; a table without a scroll wrapper; a fixed width |
| Word sticks out of its box | `overflow-wrap: break-word; hyphens: auto`, `minmax(0, 1fr)` columns, or a smaller step for that element |
| Headline lines touch | raise that element's line-height (often by 0.05–0.1); check italics and accented capitals |
| Text under 12/16px | replace the hard-coded size with a token |
| Form field under 16px | `input, select, textarea { font-size: max(1rem, 1em); }` |
| Hero too tall on short screens | cap with `min(var(--step-x), NNsvh)` |
