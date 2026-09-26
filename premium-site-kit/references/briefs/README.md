# Project briefs: what each industry has taught the kit

Each industry guide in `../industries/` covers the general rules. This folder holds the **record of every real build**, one file per client, grouped by industry:

```
briefs/
  _TEMPLATE.md
  restaurants/
    damas-montreal.md
  real-estate/
  healthcare/
  ...
```

A brief records what was asked, what we built, which patterns worked, what the client changed after seeing it, and what went wrong. With every project, the kit gets better at that industry.

## The loop

1. **Before the plan:** read the industry guide, then **every brief in `briefs/<industry>/`**. Offer the proven patterns in the plan: "Damas used a menu switcher with dropdowns, and the client liked it". Also say which patterns you're dropping and why. A new client should never get a copy of an old one. The briefs are a menu, not a template.
2. **During the build:** note the client's corrections as they happen. Corrections like "buttons shouldn't move" or "wine is counted in références, not plats" are the most valuable lessons, because they show taste the rules didn't predict.
3. **At handover:** copy `_TEMPLATE.md` to `briefs/<industry>/<client-slug>.md` and fill it in. Then:
   - add a one-line dated summary to the industry guide's "Lessons from real projects" section, linking to the brief;
   - if a pattern has worked for **two or more clients**, move it into the guide's main sections (Pages, Design and motion, and so on) as a recommended default;
   - if a correction applies to every industry (for example, motion restraint), add it to `../quality-bar.md` instead.
4. **Tell the user** what you recorded and what you promoted.

## Rules

- Record facts, not client secrets: no tokens, passwords, private contact details beyond what's on their public site, or contract prices.
- Keep the brief useful to a stranger: file paths, component names and the reason behind each decision.
- Name the reference sites and say what was taken from each, so the next plan can reuse or avoid them.
- Mark open items (content still owed by the client) so a later session can pick them up.
