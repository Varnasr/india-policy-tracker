# PolicyDhara

Auto-updating tracker of Indian development policies across 22 sectors. Fetches from 20+ official and institutional sources every 6 hours via GitHub Actions, classifies by sector, and publishes a static site with search, analytics, and email digests.

**Live site:** [varnasr.github.io/PolicyDhara](https://varnasr.github.io/PolicyDhara)

## What it tracks

- Central and state government policies, schemes, and legislation
- Union Budget allocations and fiscal policy
- Parliament bills, sessions, and productivity
- Notifications, gazettes, circulars, and orders
- Research and analysis from think tanks and international bodies

**22 sectors** including Education, Health, Agriculture, Climate, Defence, Digital, Finance, Infrastructure, and more.

**Sources include** PIB, PRS Legislative Research, India Code, eGazette, NITI Aayog, RBI, Supreme Court, ORF, CPR, ICRIER, World Bank, UNDP, and others.

## How it works

```
feeds.json          20+ source configs (RSS + scrape)
    │
    ▼
scripts/fetch_all.py    Fetch → Classify → Deduplicate → Write JSON
    │
    ▼
data/policies.json      2,000 policies (capped, newest first)
    │
    ▼
Astro build             Static site with search, sectors, states, digest
    │
    ▼
GitHub Pages            Deployed automatically
    │
    ▼
Buttondown API          Email digest when new policies are found
```

The pipeline runs every 6 hours via GitHub Actions. No server, no database — just JSON files and a static site.

## Local development

```bash
# Install dependencies
npm install
pip install -r scripts/requirements.txt

# Fetch latest policy data
npm run fetch

# Start dev server
npm run dev

# Build for production
npm run build
```

## Project structure

```
├── .github/workflows/
│   ├── update-policies.yml   # Cron: fetch → build → deploy → email
│   └── deploy.yml            # Deploy on push to master
├── scripts/
│   ├── fetch_all.py          # Main data pipeline
│   ├── fetch_rss.py          # RSS source fetcher
│   ├── fetch_scrape.py       # HTML scraper (BeautifulSoup)
│   ├── classifier.py         # Keyword-based sector classification
│   ├── send_newsletter.py    # Buttondown API email digest
│   └── requirements.txt
├── src/
│   ├── components/           # Astro components
│   ├── pages/                # Routes (sectors, states, digest, search, etc.)
│   ├── layouts/              # Base layout
│   └── lib/data.ts           # Data loading and analytics
├── data/                     # Generated JSON (auto-committed by CI)
├── feeds.json                # Source configuration
└── astro.config.mjs
```

## Features

- **Search** — full-text search across all policies
- **Sectors** — 22 sector pages with trend analysis and insights
- **States** — per-state policy profiles and GSDP data
- **Parliament** — bill tracking, session productivity, legislative trends
- **Budget** — ministry allocations and fiscal summaries
- **Digest** — daily policy summary
- **Continuity** — policy evolution across government eras (UPA I → NDA III)
- **RSS** — feed of the 100 latest policies
- **Email digest** — automated via Buttondown when new policies are tracked
- **API** — JSON data endpoints for programmatic access

## Configuration

### Adding a data source

Add an entry to `feeds.json`:

```json
{
  "source_id": {
    "name": "Source Name",
    "short_name": "Short",
    "type": "rss",
    "url": "https://example.com/feed.xml",
    "level": "central",
    "covers_sectors": "all"
  }
}
```

Supported types: `rss`, `scrape`, `api`.

### Email digest (Buttondown)

The GitHub Action creates a draft email via Buttondown's free API whenever new policies are detected.

**Setup:**
1. Get your API key from [buttondown.com/settings/programming](https://buttondown.com/settings/programming)
2. Add it as a GitHub secret: **Settings → Secrets → Actions → `BUTTONDOWN_API_KEY`**

To auto-send instead of drafting, remove `--draft` from the workflow step.

## Tech stack

- **Site:** [Astro](https://astro.build) 4.x (static)
- **Data pipeline:** Python 3.12 (requests, BeautifulSoup, lxml)
- **CI/CD:** GitHub Actions
- **Hosting:** GitHub Pages
- **Email:** [Buttondown](https://buttondown.com) (free tier)

## Contributing

Contributions welcome — especially:

- New data sources (state governments, historical archives, sector-specific feeds)
- Classification improvements (the keyword matcher in `scripts/classifier.py`)
- Historical policy data (pre-2014 is underrepresented due to limited digital archives)
- Bug reports and UI improvements

Open an issue or submit a pull request.

## License

MIT License. See [LICENSE](LICENSE).

Built by [ImpactMojo](https://www.impactmojo.in).
