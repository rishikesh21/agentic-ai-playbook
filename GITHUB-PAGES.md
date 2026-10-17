# Publish the guide with GitHub Pages

The finished website is a self-contained `index.html`. It includes its content, styles, and JavaScript. No server, API key, package installation, or build command is needed to host it.

## Publish a new project site

1. Create a GitHub repository, for example `agentic-ai-guide`. A public repository works with GitHub Free.
2. Open the supplied `github-pages` folder. Upload its **contents** to the root of your repository: `index.html`, `.nojekyll`, and `README.md`. Do not upload the containing folder as your repository root.
3. In the repository, open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select your branch, usually `main`, and **/(root)**. Click **Save**.
6. When deployment finishes, use **Visit site** in the Pages settings. For a project repository, the address normally has the form `https://YOUR-USERNAME.github.io/agentic-ai-guide/`.

These steps follow [GitHub's publishing-source instructions](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site) and [site-creation instructions](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site). The repository settings are the authority for the final published address.

If you use a repository named `YOUR-USERNAME.github.io`, its site is served at the account's Pages address instead. Choose an appropriate available repository name; no particular repository has been created or modified for you.

## Add it to an existing repository

If the repository already contains another project, place the supplied website files in a top-level `docs` folder and select **main /docs** as the Pages source. Preserve any existing site or deployment configuration. The site's `index.html` must be directly inside whichever folder you select as the publishing source.

The guide uses hash-based navigation such as `#chapter-7`. It does not depend on an account name, domain, or repository name, so it works from both a project subdirectory and an account Pages site. No custom 404 routing is needed.

## What readers can do

- Read 16 chapters with plain-language summaries, examples, and optional technical examples.
- Search chapters, exercises, and glossary definitions.
- Use the 12-week plan, review cards, and reliability/cost calculators.
- Save progress and notes in their own browser.
- Export and import progress backups as JSON.
- Download the Markdown guide and workbook directly from the page.
- Print the complete guide, exercise answers, and glossary.

Progress is not sent to a server or shared between readers. Browser storage belongs to the site's address and browser profile. A local-file preview and a published Pages site have different storage. Export progress from the preview, then import it on the published site if you want to transfer it. Clearing browser data may remove local progress.

External reference links require an internet connection. The guide itself has no external scripts, fonts, tracking, or API calls. If JavaScript is disabled, the complete guide and workbook remain readable, while interactive features are unavailable.

## Update the content later

Hosting and editing are separate:

1. Edit `STUDY-GUIDE.md` or `PRACTICE-WORKBOOK.md`.
2. Update chapter summaries and glossary terms in `learning-notes.json` when needed.
3. In the source folder, run `npm install`, then `npm run build`. This requires a compatible Node.js installation and installs the pinned Markdown converter used by the builder.
4. Upload the newly generated `github-pages/index.html` to your Pages source folder.

`study-template.html` contains the layout and styles. `app.js` contains the browser interactions. The builder combines them into the self-contained HTML, so do not edit only the generated file if you want future builds to retain a change.

The Markdown and source files are optional for publication. Publish only the clean website package if you want the simplest repository. No paid services are required by this website.
