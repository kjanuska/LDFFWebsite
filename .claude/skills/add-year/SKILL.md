---
name: add-year
description: Add a new festival year to the LDFF website. Use when the user wants to add a new edition, set up a new year's data, or scaffold the CSV rows for a new festival.
argument-hint: "<year>"
allowed-tools: Read, Bash
---

Help the user add a new festival year to the LDFF website. The year is: $ARGUMENTS

## Steps

1. **Show current state** — Read `data/csv/festival-info.csv` to show existing years and the column format as a reference.

2. **Explain what's needed** — Tell the user they need to:

   **In `data/csv/festival-info.csv`** — add one row:
   ```
   year,festival_start_date,festival_end_date,tagline_en,tagline_lt,hero_description_en,hero_description_lt
   <year>,<YYYY-MM-DD>,<YYYY-MM-DD>,<English tagline>,<Lithuanian tagline>,<English description>,<Lithuanian description>
   ```

   **In `data/csv/films.csv`** — add one row per film (columns: `year,slug,title_en,title_lt,description_en,description_lt,director,duration,country,language,screening_datetime,location_name,location_google_maps_url,ticket_url,trailer_url,poster_filename`)

   **In `data/csv/sponsors.csv`** — add one row per sponsor (columns: `year,sponsor_name,logo_filename,url,tier,display_order`)

3. **Create image directories** for the new year:
   ```bash
   mkdir -p static/images/<year>/posters
   mkdir -p static/images/<year>/gallery
   mkdir -p static/images/sponsors/<year>
   ```

4. **Confirm** the directories were created and tell the user:
   - Add poster images to `static/images/<year>/posters/` (filenames must match `poster_filename` in films.csv)
   - Add sponsor logos to `static/images/sponsors/<year>/` (filenames must match `logo_filename` in sponsors.csv)
   - Gallery photos in `static/images/<year>/gallery/` are auto-detected — any `.jpg/.png/.webp` file works
   - Run `npm run build` when ready

If no year argument was provided, ask the user which year they want to add.
