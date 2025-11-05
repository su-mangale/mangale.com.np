# mangale.com.np

Portfolio site for Mangale Lopchan, now powered by [Eleventy](https://www.11ty.dev/) so the landing page, blog, and assets are rebuilt into static HTML for GitHub Pages.

## Features

- ⚙️ Minimalist platform-engineering portfolio with reusable Eleventy layouts
- 📝 Markdown-driven blog (`src/blog/YYYY-MM-DD-slug.md`) rendered automatically at `/blog`
- 🎨 Custom CSS/JS carried over from the original static build
- � Zero runtime dependencies at deploy time—static pages suitable for GitHub Pages, Netlify, etc.

## Local Development

```bash
npm install          # install Eleventy and helpers
npm run dev          # start Eleventy in watch/serve mode (http://localhost:8080)

# one-off build
npm run build        # outputs the site into _site/
```

### Adding a blog post

1. Copy the example post in `src/blog/` and rename it with the date prefix you want, e.g. `2025-12-01-sre-playbook.md`.
2. Update the front matter:
	```markdown
	---
	title: "Observability Playbook"
	description: "Rolling out Grafana dashboards with actionable SLOs."
	date: 2025-12-01
	published: true
	---
	```
3. Write in Markdown below the front matter. Commit and push—the build will pick it up and emit `/blog/observability-playbook/` and update `/blog` listing automatically.

## Deployment

Any static host will work. Typical options:

- **GitHub Pages**: run `npm run build` in CI and publish the `_site/` folder (GitHub Actions recommended)
- **Netlify/Vercel**: deploy with build command `npm run build` and publish directory `_site`

## Customization Checklist

- Update hero/experience content in `src/index.njk`
- Tweak styling in `assets/css/main.css`
- Replace or add assets under `assets/` (Eleventy passthrough copies them)
- Adjust global metadata via `src/_data/site.json`

## License

MIT License – see [LICENSE](LICENSE) for details.