# Publish the guide with GitHub Pages

The live guide is at **https://rishikesh21.github.io/agentic-ai-playbook/**.

## Automatic deployment

This repository uses `.github/workflows/pages.yml` to build and publish the guide. Every push to `main` triggers deployment; pull requests validate the build without publishing.

1. In **Settings → Pages → Build and deployment**, select **GitHub Actions** as the source.
2. Push your source changes to `main`, or run **Deploy learning guide to GitHub Pages** manually in the Actions tab.
3. Wait for both the `build` and `deploy` jobs to succeed.
4. Open the deployment URL shown in the workflow or click **Visit site** in Pages settings.

The workflow runs Node.js 24, installs dependencies with `npm ci --ignore-scripts`, runs `npm run build`, and publishes only the generated `github-pages` folder. The dependency lockfile is committed so local and hosted builds use the same dependency versions.

Do not select `/docs` as a branch publishing source: this repository has no `docs` directory. Generated files are intentionally ignored by Git because the workflow builds them for each deployment.

The setup follows [GitHub’s custom Pages workflow documentation](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).

## Preview an update locally

```sh
npm ci
npm run build
```

Open the generated root `index.html` in your browser. The same content is written to `github-pages/index.html`, alongside a `.nojekyll` file. Edit the source files rather than generated HTML, then commit and push the changes to publish them.

## Publish elsewhere

After building, upload the contents of `github-pages` to a static host. The website is a self-contained HTML file with no runtime dependencies, API key, or server requirement.

Hash navigation, such as `#chapter-7`, works under a repository subdirectory or at a domain root. No custom 404 routing is needed.

For another GitHub repository, use the included workflow and select **GitHub Actions** in that repository’s Pages settings. Its final URL is shown by GitHub after deployment.

## Troubleshooting

- **404:** confirm that Pages uses GitHub Actions and that the most recent `deploy` job succeeded. Allow a short time for the published site to become available.
- **Build failure:** inspect the failed step in Actions. Reproduce it locally with Node.js 24, `npm ci`, and `npm run build`.
- **Deployment failure:** check that Actions is enabled and that environment protection rules permit deployment from `main`. The deploy job needs `pages: write` and `id-token: write` permissions, which the workflow declares.
- **Old content:** check that the workflow ran for your latest commit, then refresh the page.
- **Missing progress:** browser storage belongs to the site address and browser profile. Export progress before changing addresses or browsers, then import it at the destination.

## Reader data

Progress and notes remain in each reader’s browser. The guide does not send them to a server. Export and import provide manual backups; clearing browser data may remove progress.

The website has no external scripts, fonts, tracking, or API calls. External reference links need internet access. Without JavaScript, the complete guide and workbook remain readable, while interactive features are unavailable.
