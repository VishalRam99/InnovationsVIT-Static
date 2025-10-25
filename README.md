# Static Website

A lightweight static site organized under a single WebStatic directory, with HTML templates and static assets (styles, scripts, images, and documents).

## Quick Start

You can view the site by opening the main template directly in a browser or by serving it with a simple static server.

- Open directly (no server):
  - Open WebStatic/templates/index.html in your browser.

- Serve with Node.js (recommended):
  - Ensure Node.js (v16+) and npm are installed.
  - From the repository root, run:
    - npx http-server WebStatic -p 8080 -c-1
    - Then visit: http://localhost:8080/templates/index.html

  Alternative (Node):
  - npx serve WebStatic
  - Then visit the URL printed in the terminal, appending /templates/index.html.

- Serve with Python (optional):
  - Python 3: cd WebStatic && python3 -m http.server 8080
  - Then visit: http://localhost:8080/templates/index.html

Note: The site assumes the web root is the WebStatic directory. When using a server, serve that directory as the document root.

## Project Structure

- WebStatic/
  - templates/ — HTML templates (e.g., main entry page and other sections)
  - static/
    - styles/ — CSS styles organized by section
    - scripts/ — JavaScript files (base utilities and page-specific scripts)
    - images/ — Images and icons used by the site
    - docs/ — Downloadable documents (PDFs and similar)

## Development

- Keep new pages under WebStatic/templates and reference assets from WebStatic/static.
- Use relative paths consistent with the existing folder layout to ensure links work both locally and when deployed.
- If adding third-party libraries, place them under an appropriate subfolder in WebStatic/static and reference them from templates.

## Deployment

This is a static site; you can deploy it to any static hosting service (e.g., GitHub Pages, Netlify, Vercel, an S3 bucket, or any static web server).

- Recommended setup: Configure your host to use the WebStatic directory as the site root.
- If your host expects an index at the root URL:
  - Either configure the host’s publish directory to WebStatic, or
  - Serve WebStatic as a subpath and link directly to /templates/index.html.

## Contributing

- Create a feature branch for changes.
- Keep assets organized within the existing directory structure.
- Test locally with a static server before opening a pull request.

## License

If a LICENSE file is present in this repository, its terms apply. Otherwise, usage is considered internal/unlicensed by default—please add a LICENSE file if needed.
