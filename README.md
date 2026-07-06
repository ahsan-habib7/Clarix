# Clarix  — SaaS Analytics Landing Page Template

A clean, modern, fully responsive HTML/CSS/JS landing page template for SaaS and analytics products. Zero frameworks, zero build tools — open the folder and it just works.

**[→ Live Demo](https://your-demo-url.com)** &nbsp;·&nbsp; **[Buy on Gumroad](#)**

---

## What's included

| File | Description |
|---|---|
| `index.html` | Main landing page with all sections |
| `about.html` | Full About page with team & values |
| `contact.html` | Contact form with validation |
| `privacy.html` | Privacy Policy stub (replace with your own) |
| `terms.html` | Terms of Service stub (replace with your own) |
| `404.html` | Custom 404 error page |
| `assets/css/variables.css` | All design tokens (colors, spacing, etc.) |
| `assets/css/themes.css` | 5 color theme presets |
| `assets/css/style.css` | All component styles |
| `assets/css/responsive.css` | Mobile & tablet breakpoints |
| `assets/js/main.js` | UI interactions & features |
| `assets/js/animation.js` | Scroll-triggered reveal animations |
| `assets/js/form.js` | Contact & newsletter form validation |

---

## Features at a glance

- **Dark / light mode** with localStorage persistence
- **5 color themes** — Indigo, Ocean, Emerald, Sunset, Rose — via a floating switcher
- **Fully responsive** — mobile, tablet, desktop
- **Smooth scroll animations** using IntersectionObserver
- **Testimonial carousel** with auto-play, pause on hover, and dot navigation
- **FAQ accordion** with smooth open/close
- **Tabbed product tour** section
- **Live search** filtering site content
- **Contact form** with real-time validation (connect to Formspree / Netlify Forms)
- **Newsletter form** with email validation
- **Toast notifications** system
- **Back-to-top** button
- **SVG icons** throughout (no icon font dependencies)
- **Open Graph** meta tags on every page
- **Semantic HTML** with ARIA labels
- **SEO ready** — canonical tags, sitemap, robots.txt

---

## Quick start

```bash
# 1. Unzip the template
unzip Clarix -landing.zip && cd Clarix -landing

# 2. Open in browser (no build step needed)
open index.html
# or serve locally:
npx serve .
```

---

## Customisation

### 1. Replace branding
Search-and-replace `Clarix ` with your product name across all HTML files.

### 2. Change colors
In `assets/css/variables.css`, edit the `--primary`, `--accent`, and `--gradient` values.  
Or pick a preset in `assets/css/themes.css` and set `data-theme-color` on `<html>`.

### 3. Connect the contact form
The form in `contact.html` is ready for [Formspree](https://formspree.io):

```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

Or use [Netlify Forms](https://docs.netlify.com/forms/setup/) by adding `netlify` to the `<form>` tag.

See `docs/CUSTOMIZATION.md` for the full guide.

---

