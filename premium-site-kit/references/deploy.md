# Deploy and go-live

## Choosing a host (agree it in the plan)

| Client situation | Host |
|---|---|
| Your own demos and showcases | Vercel Hobby (free, non-commercial only) |
| Small business wanting domain + business email + site in one bill, no backend | **Hostinger** |
| Free, fast worldwide, email handled elsewhere | Cloudflare Pages |
| Needs CMS, CRM or bookings | Wix Headless (hosted on Wix or elsewhere); modules and steps in `wix.md` |
| Commercial site on Vercel | Vercel Pro |

Plan terms and prices change, so check the providers' current pages before quoting a client, and quote renewal prices rather than introductory ones.

## GitHub + Vercel (recommended)
1. `.gitignore` already excludes node_modules, dist, .astro, .vercel, env files, `Images/` (raw originals) and `.claude/`. Put the raw client photos in `Images/` at the project root so they stay out of git and out of the upload.
2. `git init -b main`, commit, and push to a repo the user owns (ask them to create it, or create it with `gh repo create --private` after they confirm). Private is the default for client work.
3. The user imports it at vercel.com/new. Framework: Astro, build `npm run build`, output `dist`, no env vars.
4. If the repo doesn't appear in Vercel's import list, the Vercel GitHub app lacks access. Send them to github.com/settings/installations → Vercel → Configure → Repository access → add the repo, or to Vercel Account Settings → Authentication → connect GitHub.
5. Every push to `main` redeploys. Afterwards, set `site` in `astro.config.mjs` to the live URL.

## CLI alternative
`npx vercel login` (the user does this in their own terminal), then `npx vercel deploy --yes` for a preview. Never ask for tokens in chat; if a token is needed, have the user save it to a file you read without printing. The old anonymous "claimable" deploy endpoint now only returns CLI instructions.

## Going live checklist
- Enquiries: implement `submitEnquiry()` in `InquiryForm.tsx` (Wix Forms → Wix Contacts CRM, or any webhook/CRM).
- Booking: replace `<BookingDemo />` with Cal.com (Google Calendar + Google Meet) or Wix Bookings.
- Listings: swap the bodies of `content.ts` for CMS queries (Wix Headless `@wix/data`, Sanity, etc.), keeping the return shapes.
- Replace sample team, figures and testimonials; remove the footer's "illustrative" disclaimer.
- Custom domain in Vercel → Domains; update `site`.

## Hostinger (static hosting, no backend)

The built site is plain files, so any Hostinger web hosting plan serves it. Set it up with:

```bash
python <skill>/scripts/new_site.py <site> --add-hostinger
```

This adds:
- `public/.htaccess`: forces HTTPS, uses the custom 404 page, turns on compression, caches `/_astro/` assets for a year and HTML never, and sets basic security headers. It also has an optional www → bare-domain redirect, commented out.
- `.github/workflows/deploy-hostinger.yml`: on every push to `main` it runs `npm ci`, `npm run build`, then uploads `dist/` over FTP. Only changed files are sent.

One-time setup. The user does these steps; never ask for FTP passwords in chat:
1. In hPanel, point the domain at the hosting plan and turn on the free SSL certificate.
2. In hPanel → Files → FTP Accounts, note the FTP host, username and password (or create a dedicated FTP account).
3. On GitHub, go to repo → Settings → Secrets and variables → Actions and add the secrets `FTP_SERVER`, `FTP_USERNAME` and `FTP_PASSWORD`. Optionally add the variable `FTP_SERVER_DIR` if the site doesn't live in `public_html/` (for example, an addon domain or a subfolder).
4. Push to `main`, or run the workflow from the Actions tab (Run workflow). Check the run log; the first upload sends everything.
5. Set `site` in `astro.config.mjs` to the domain and push again.

Manual alternative with no GitHub: run `npm run build`, then upload the contents of `dist/` (not the folder itself) into `public_html/` using hPanel's File Manager. `.htaccess` is a hidden file, so make sure it was uploaded.

Notes:
- Delete Hostinger's default `index.php` / `default.php` from `public_html/` if present; it can take priority over `index.html`.
- `/about` redirects once to `/about/` (server default for folders). That's expected; don't add slash-removal rules, which can cause redirect loops.
- If the site doesn't use Vercel, remove `.vercelignore`. If it doesn't use Hostinger, don't add these files, or the Action will fail for lack of secrets on every push.
