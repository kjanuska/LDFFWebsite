---
name: deploy
description: Deploy the LDFF website to Cloudflare Pages. Use when the user wants to deploy, publish, or go live with the site.
allowed-tools: Bash
---

Deploy the LDFF website to Cloudflare Pages.

## Steps

1. **Check build exists** — verify `build/index.html` exists. If not, run `npm run build` first.

2. **Check wrangler is available** — run `npx wrangler --version`. If not installed, it will be pulled via npx automatically.

3. **List what will be deployed** — show the user how many HTML pages are in `build/`:
   ```bash
   find build -name "*.html" | sort
   ```

4. **Deploy** using Wrangler:
   ```bash
   npx wrangler pages deploy build --project-name=ldff
   ```

5. **Report the result** — show the deployment URL from Wrangler output.

## Notes

- Requires `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` environment variables, or the user must be logged in via `npx wrangler login`
- The Cloudflare Pages project must already exist and be named `ldff` (or whatever the user has configured)
- If the user hasn't set up Cloudflare Pages yet, explain they need to: create a project at dash.cloudflare.com → Workers & Pages → Create application → Pages → Direct Upload, name it `ldff`
