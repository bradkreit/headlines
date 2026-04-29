# Headlines from the Future

Integrated foresight tool combining live signals tracking with Readwise reading highlights.

## Deploy to Cloudflare Pages

### Step 1 — Push to GitHub
Create a GitHub repo and push these files:
```
functions/
  api/
    readwise.js    ← Cloudflare Pages function (Readwise proxy)
index.html         ← Combined app
README.md
```

### Step 2 — Deploy on Cloudflare Pages
1. Go to dash.cloudflare.com → Workers & Pages → Create → Pages
2. Connect to Git → select your repo
3. Build settings: Framework = None, Build command = blank, Output = blank
4. Deploy

### Step 3 — Connect your domain
In Cloudflare Pages: Custom domains → Add → headlinesfromthefuture.com

### Step 4 — Use it
- **Signals** tab: loads live from Google Sheets automatically
- **Reading** tab: click "Connect Readwise" → paste token from readwise.io/access_token
- **Both** view: shows signals + reading sections together
- **Clusters**: use the pool filter (Signals / Reading / Both) to drag either type
- **Scenarios**: same — drag highlights alongside signals onto the 2x2 canvas
- Signal detail drawer includes "Related reading" panel when Readwise is connected

## Data sources
- Signals: Google Sheet ID `1hMRxFT9kAaGQ7rGU9G8R5cpfrMM8I8nyrxLiJ1KFoBg`
- Reading: Readwise API via `/api/readwise` Cloudflare Function
