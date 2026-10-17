# Agentic AI Playbook

A practical, self-paced guide to understanding AI agents and learning to build reliable systems. Start with everyday examples, then work through tool design, retrieval, evaluation, efficiency, recovery, security, and multiple-agent architectures.

**[Read the interactive guide](https://rishikesh21.github.io/agentic-ai-playbook/)** · [Study guide](STUDY-GUIDE.md) · [Practice workbook](PRACTICE-WORKBOOK.md)

## What’s included

- 16 chapters with summaries, examples, learning outcomes, and optional technical examples.
- 15 exercises with worked answers, plus practical project specifications.
- A 12-week study plan, 12 review cards, and a glossary.
- Interactive cost and reliability calculators.
- Search, printable content, and Markdown downloads.
- Browser-local progress and notes, with JSON export and import.

New to the topic? Read Chapters 1 to 3, then Chapter 6. Ready to implement a project? Follow the 12-week plan and budget roughly 8 to 10 hours per week. See [START-HERE.md](START-HERE.md) for more guidance.

The examples are educational. This repository contains the learning website and its source material, rather than a production agent application.

## Run locally

Install Node.js 24 LTS, then run:

```sh
git clone https://github.com/rishikesh21/agentic-ai-playbook.git
cd agentic-ai-playbook
npm ci
npm run build
```

Open the generated `index.html` in your browser. It works directly from disk; no server or API key is required. The build also creates `github-pages/index.html` and `github-pages/.nojekyll` for publishing.

The generated site contains its content, styles, and JavaScript in one HTML file. Reading and interactive features work without external scripts, fonts, or API requests. External reference links require internet access.

## Edit the guide

| File | Purpose |
| --- | --- |
| `STUDY-GUIDE.md` | Main chapter content |
| `PRACTICE-WORKBOOK.md` | Exercises, answers, projects, and templates |
| `learning-notes.json` | Chapter summaries, examples, outcomes, and glossary |
| `study-template.html` | Page structure and styling |
| `app.js` | Navigation, search, progress, calculators, and other interactions |
| `build-html.mjs` | Combines the source into the standalone website |

After editing, run `npm run build` and preview `index.html`. The builder checks for the expected 16 chapters and 15 exercises. Commit source changes and the lockfile when dependencies change. Generated HTML and `node_modules` are ignored because deployment builds a fresh copy.

## Deployment

[GitHub Actions](https://github.com/rishikesh21/agentic-ai-playbook/actions/workflows/pages.yml) builds and deploys the website whenever changes reach `main`. Pull requests run the build without publishing. You can also run the workflow manually from the Actions tab.

In **Settings → Pages**, the publishing source must be **GitHub Actions**. The workflow installs locked dependencies, builds the guide, uploads only the `github-pages` output folder, and deploys it through the `github-pages` environment.

See [GITHUB-PAGES.md](GITHUB-PAGES.md) for deployment details and troubleshooting.

## Progress and privacy

Progress and notes stay in your browser; the guide does not send them to a server. Use **Export progress** to back them up and **Import progress** to restore them. Changing browsers or site addresses creates a separate storage location, and clearing browser data may remove progress.

## Contributions

Open an issue for unclear explanations, broken links, or incorrect examples. For a contribution, edit the relevant source files, verify the local build and affected browser features, and submit a pull request with a brief explanation of the change.
