---
name: build
description: Run the LDFF data pipeline and production build. Use when the user wants to build the site, regenerate data from CSVs, or check for build errors.
argument-hint: "[--data-only]"
allowed-tools: Bash
---

Run the LDFF website build pipeline.

If the argument is `--data-only`, run only the data pipeline:
```
npm run build:data
```

Otherwise run the full build:
```
npm run build
```

After running, report:
1. Whether `build:data` succeeded and what JSON files were written
2. Whether `vite build` succeeded
3. How many HTML pages were generated (list them from `build/`)
4. Any errors or warnings to address
5. If successful: confirm the `build/` folder is ready to deploy to Cloudflare Pages

If there are errors, diagnose and fix them before reporting.
