# EpicRope Responsive Rebuild Plan

## Overview

This document is the complete plan for rebuilding epicrope.com as a responsive, modern static site. The goal is a 1:1 visual reproduction that behaves identically on desktop and adapts gracefully to tablet and mobile. The site must remain fully functional as a stand-alone project with all images, assets, and data included.

**Key constraints:**
- Visual design stays the same (white background, Tahoma font, red links, box-shadow cards, border-radius containers)
- FoxyCart integration is preserved exactly (same cart URLs, same form patterns, same coupon logic)
- All existing URLs must continue to work
- All product images must be downloaded and included locally
- Code must be human-maintainable with comments and a separate guide

---

## Current Site Analysis

### Tech Stack (What We're Replacing)

| Component | Current | Problem |
|---|---|---|
| HTML | XHTML 1.0 Transitional | Obsolete doctype |
| Grid | 960.gs (fixed 960px) | Not responsive, forces `min-width: 1200px` on body |
| Nav | ddsmoothmenu (jQuery plugin) | No mobile support |
| JS | jQuery 1.9 (2013) | Massively outdated |
| Cart | FoxyCart hosted | **Keep as-is** |
| Analytics | GA + Google Ads | Keep as-is |
| Contact | PHP form | Keep as-is |
| Architecture | Hand-coded static HTML | Massive boilerplate duplication |

### Page Inventory

The site has **7 distinct page templates**:

#### 1. Home Page (`/`)
Two-column layout. Left column: 6 feature buttons with images and semi-transparent silver stripe overlay text. Right column: Announcements and "About" text in rounded box-shadow cards.

#### 2. Rope Category Page (`/rope`)
Three equal columns — one per fiber type (Hemp, Jute, Shibari Jute). Each column has a product image, color name, price, fiber description, and a grid of clickable color swatches. Clicking a swatch switches the main image (jQuery show/hide). Double-clicking navigates to the product detail page. Nylon is commented out but present.

#### 3. Rainbow Rope Category (`/rainbow_rope`)
Same layout as Rope Category but simplified — 2 columns (Hemp and Jute only), no color swatches, single image per fiber.

#### 4. Rope Product Detail (`/rope/{fiber}/{color}`)
The most complex page on the site. Structure:
- Breadcrumb: "Home | Rope"
- Title: "{Color} {Fiber} Bondage Rope - $X per foot"
- Left side: Image gallery with clickable thumbnails (switches main image)
- Right side:
  - **Kit section**: 6 buttons (Taste Test, Starter Floor, Rigger's Basics, Suspension, Shibari Floor, Shibari Unlimited). Each is an `<a>` link to FoxyCart with URL-encoded multi-item parameters. Hovering a button reveals its description and price.
  - **Custom rope form**: `<form action="https://epicrope.foxycart.com/cart">` with selects for Length (5-120 in increments of 5 for feet, 1-24 for meters), UOM (feet/meters), Diameter (6mm only for most), Quantity (1-39). Hidden fields for price, weight, name, type, image. The JS dynamically recalculates price and weight when length/UOM changes.
- Bottom: "About the rope" and "About the color" description box.

#### 5. Equipment/Books Listing (`/equipment`, `/books`)
List of product rows. Each row: image (180x180) | title + truncated description | price. Clicking navigates to detail.

#### 6. Equipment/Books Detail (`/equipment/{slug}`, `/books/{slug}`)
- Breadcrumb: "Home | Equipment" or "Home | Books"
- Left: Image gallery (equipment has 1 image, books have multiple)
- Right: Description text, price, simple `<form>` with hidden fields and "Add to Cart" submit button
- FoxyCart form fields: price, weight, name, image

#### 7. Tutorials (`/tutorials/{category}`, `/tutorials/{category}/{subcategory}/{file}.php`)
- Category page: Left side has tutorial groups (title + thumbnail grid), right side has category sidebar with active state
- Detail page: Centered YouTube embed + author bio paragraph

#### 8. Content Pages
- `/faqs` — Anchor-linked question list + Q&A content
- `/beginner_rope_buying_guide` — Long-form article about choosing rope
- `/bulk_discounts` — Discount tiers + contact link
- `/contact` — HTML form POSTing to `index.php`

### Product Data

#### Rope Products (3 active fibers)

**Hemp** — $1.00/ft, weight 0.0080 lb/ft
12 colors: Amethyst, Black, Blue, Gold, Green, Natural, Orange, Pink, Purple, Scarlet, Turquoise, Yellow
Diameter: 6mm

**Jute (Tossa)** — $1.00/ft, weight 0.0080 lb/ft
9 colors: Amethyst, Black, Blue, Burgundy, Emerald, Lavender, Natural, Purple, Scarlet
Diameter: 6mm

**Shibari Jute (Japanese)** — $1.20/ft, weight 0.0080 lb/ft
10 colors: Amethyst, Black, Blue, Burgundy, Emerald, Gold, Natural, Pink, Purple, Scarlet
Diameter: 6mm

**Nylon** — Commented out / removed from site

Each rope product has these images:
```
rope/{fiber}/{color}/
├── img/
│   ├── main.png              # Category page swatch image (~270x300)
│   ├── thumbnail.png         # Small swatch thumbnail (~40x40)
│   ├── images/               # Product detail gallery images (500x333)
│   │   ├── 1-single-{color}-{fiber}.png
│   │   ├── 2-double-{color}-{fiber}.png
│   │   ├── 3-starter-{color}-{fiber}.png
│   │   ├── 4-riggers-{color}-{fiber}.png    # (not all colors have all images)
│   │   └── 5-suspension-{color}-{fiber}.png
│   └── thumbnails/           # Product detail gallery thumbnails
│       ├── 1-single-{color}-{fiber}.png
│       ├── ...
```

#### Kit Definitions (same for all rope products)

| Kit | Contents | Total |
|---|---|---|
| Taste Test Kit | 2 x 30ft 6mm | $60 |
| Starter Floor Kit | 3 x 30ft + 2 x 15ft 6mm | $120 |
| Rigger's Basics Kit | 5 x 30ft + 2 x 15ft 6mm | $180 |
| Suspension Kit | 8 x 30ft + 4 x 15ft 6mm | $300 |
| Shibari Floor Kit | 7 x 8m 6mm | $184 (hemp $184, jute $184, shibari_jute $220.16) |
| Shibari Unlimited | 12 x 8m 6mm | $315 (hemp $315, jute $315, shibari_jute $377.28) |

#### Equipment (3 items)

| Product | Price | Weight |
|---|---|---|
| Safety Shears | $5 | 0.05 lb |
| Blue Lock Carabiner | $25 | — |
| Twister Swivel | $50 | — |

Each has images at:
```
equipment/{slug}/
├── img/
│   ├── {slug}.png            # Listing page image
│   ├── images/01.png         # Detail gallery
│   └── thumbnails/01.png     # Detail thumbnail
```

#### Books (4 items)

| Product | Price | Weight |
|---|---|---|
| Rogue Hojojutsu | $60 | — |
| Complete Shibari: Sky | $50 | 0.3 lb |
| Complete Shibari: Land | $50 | 0.3 lb |
| The Little Guide to Getting Tied Up | $20 | — |

Each has images at:
```
books/{slug}/
├── img/
│   ├── {slug}.png/I/Jpg      # Listing page image
│   ├── images/01.png, 02.jpg, etc.
│   └── thumbnails/01.png, 02.jpg, etc.
```

#### Tutorials (7 categories)

Basics, Beginner Ties, Upper Body Ties, Hip Harnesses, Body Harnesses, Lower Body Ties, Full Body Ties

Each tutorial has a thumbnail image and YouTube embed URL.

### FoxyCart Integration Detail

FoxyCart is a **hosted cart and checkout** service. The site never handles payment — it sends products to FoxyCart's servers.

**Three integration patterns:**

1. **Kit links** — `<a>` tags with href pointing to `https://epicrope.foxycart.com/cart?{params}`. Multi-item syntax uses numbered prefixes:
   ```
   ?1:name=30%20ft&1:category=Kit&1:price=30&1:quantity=2&1:diameter=6mm&2:name=15%20ft&2:price=15&2:quantity=2
   ```

2. **Custom rope forms** — Standard HTML `<form>`:
   ```html
   <form action="https://epicrope.foxycart.com/cart" method="post">
     <input type="hidden" name="price" value="30" />
     <input type="hidden" name="weight" value="0.24" />
     <input type="hidden" name="name" value="30 ft" />
     <input type="hidden" name="type" value="natural hemp" />
     <input type="hidden" name="image" value="https://epicrope.com/rope/hemp/natural/img/main.png" />
     <input type="submit" value="Add" />
   </form>
   ```
   The JS dynamically updates the `price`, `weight`, and `name` hidden fields when the user changes length, UOM, or quantity.

3. **Simple product forms** — Same as above but with fixed values, no dynamic calculation.

**Cart page**: "Cart" link goes to `https://epicrope.foxycart.com/cart?cart=view`

**Coupon logic** (currently inline on every page):
- Sale coupon `JOY2025` — auto-applied if today is before 2025-12-17
- Bulk coupon `Bulk` — auto-applied when cart total > $250, auto-removed when < $250
- Uses FoxyCart JS API: `FC.onLoad`, `FC.client.on`, `FC.client.request`

### Visual Design Tokens (from templatemo_style.css)

| Element | Value |
|---|---|
| Body font | Tahoma, Geneva, sans-serif |
| Base font size | 13px |
| Line height | 1.7em |
| Text color | `rgb(75, 75, 75)` |
| Link color | `red` |
| Link hover | `#990000` |
| Headings color | `#000`, font-weight normal |
| Wrapper width | 960px, centered |
| Header height | ~103px + 15px padding |
| Nav link font size | 14px |
| Nav active/hover | red, bold |
| Logo | 275x100px background image, centered |
| Footer border | 5px solid #CCC top and bottom |
| Card shadows | `box-shadow: 3px 3px 3px #556` |
| Card radius | `border-radius: 10px` to `20px` |
| Feature stripe | Silver background, `opacity: 0.5`, 40pt font |

---

## New Tech Stack

| Component | Technology | Why |
|---|---|---|
| Framework | **Astro** | Compiles to static HTML, supports component partials, zero JS by default. Perfect for a mostly-static site. Generates individual HTML files that match the original URL structure. |
| Styling | **Tailwind CSS** | Replaces 960.gs with modern responsive utilities. Preserves exact visual design through custom config tokens. |
| Interactivity | **Vanilla JS** (Astro `<script>` tags) | Replaces jQuery for the few interactive elements (swatch switching, image gallery, rope builder pricing). No framework overhead. |
| Cart | **FoxyCart** (unchanged) | Same HTML form patterns, same URL endpoints. |
| Contact form | **PHP** (unchanged) | Keep the existing `index.php` handler. |
| Hosting | **Current PHP hosting** | Static HTML output from Astro can be deployed alongside the PHP contact handler. |

### Learning Resources

- **Astro**: https://docs.astro.build/en/getting-started/
- **Tailwind CSS**: https://tailwindcss.com/docs
- **FoxyCart documentation**: https://wiki.foxycart.com/
- **FoxyCart cart parameters**: https://wiki.foxycart.com/v/2.0/cart

---

## File Structure

```
epicrope/
├── epicrope-build1.md               # This plan file
├── GUIDE.md                         # Human-readable maintenance guide (how to add products, etc.)
├── astro.config.mjs                 # Astro configuration
├── tailwind.config.mjs              # Tailwind configuration with design tokens
├── package.json                     # Dependencies and build scripts
├── tsconfig.json                    # TypeScript configuration
│
├── public/                          # Static assets served as-is (no build processing)
│   ├── images/                      #   Site-wide images
│   │   ├── epic_logo_text.png       #     Logo (used in header as background-image)
│   │   ├── logo_try_II.png          #     Home page slider image
│   │   ├── templatemo_menu.jpg      #     Nav bottom border image
│   │   ├── templatemo_more.jpg      #     "Read more" arrow icon
│   │   └── templatemo_list.jpg      #     List bullet icon
│   │
│   ├── img/                         #   Home page feature button images
│   │   ├── scarlet_home_icon.png
│   │   ├── osada_jute.png
│   │   ├── rainbow.png
│   │   ├── rope_black.png
│   │   ├── equipment_black.png
│   │   └── books_black.png
│   │
│   ├── rope/                        #   Rope product images (downloaded from live site)
│   │   ├── hemp/
│   │   │   ├── amethyst/            #     main.png, thumbnail.png, img/images/*, img/thumbnails/*
│   │   │   ├── black/
│   │   │   ├── blue/
│   │   │   ├── gold/
│   │   │   ├── green/
│   │   │   ├── natural/
│   │   │   ├── orange/
│   │   │   ├── pink/
│   │   │   ├── purple/
│   │   │   ├── scarlet/
│   │   │   ├── turquoise/
│   │   │   └── yellow/
│   │   ├── jute/
│   │   │   ├── amethyst/
│   │   │   ├── black/
│   │   │   ├── blue/
│   │   │   ├── burgundy/
│   │   │   ├── emerald/
│   │   │   ├── lavender/
│   │   │   ├── natural/
│   │   │   ├── purple/
│   │   │   └── scarlet/
│   │   └── shibari_jute/
│   │       ├── amethyst/
│   │       ├── black/
│   │       ├── blue/
│   │       ├── burgundy/
│   │       ├── emerald/
│   │       ├── gold/
│   │       ├── natural/
│   │       ├── pink/
│   │       ├── purple/
│   │       └── scarlet/
│   │
│   ├── equipment/                   #   Equipment images (downloaded from live site)
│   │   ├── img/                     #     Listing page images
│   │   │   ├── shears.png
│   │   │   ├── blue_lock_carabiner.png
│   │   │   └── swivel.png
│   │   ├── shears/                  #     Detail images
│   │   │   └── img/images/01.png, img/thumbnails/01.png
│   │   ├── blue_lock_carabiner/
│   │   │   └── img/...
│   │   └── swivel/
│   │       └── img/...
│   │
│   ├── books/                       #   Book images (downloaded from live site)
│   │   ├── img/                     #     Listing page images
│   │   │   ├── rogue_hojo_i.png
│   │   │   ├── cs_sky.png
│   │   │   ├── cs_land.png
│   │   │   └── getting_tied_up.jpg
│   │   ├── rogue_hojo/
│   │   │   └── img/images/*, img/thumbnails/*
│   │   ├── cs_sky/
│   │   │   └── img/...
│   │   ├── cs_land/
│   │   │   └── img/...
│   │   └── getting_tied_up/
│   │       └── img/...
│   │
│   ├── tutorials/                   #   Tutorial images (downloaded from live site)
│   │   └── basics/
│   │       ├── bondage_safety/img/
│   │       ├── how_to_get_tied_up/img/
│   │       └── misc/img/
│   │
│   └── favicon.ico                  #   Site favicon (if it exists)
│
├── src/
│   ├── data/                        # All product and content data
│   │   ├── site.ts                  #   GA tracking IDs, FoxyCart store domain, sale config
│   │   ├── ropes.ts                 #   Fiber types, colors, prices, weights, descriptions, kits
│   │   ├── equipment.ts             #   Equipment items with prices and descriptions
│   │   ├── books.ts                 #   Book/DVD items
│   │   └── tutorials.ts             #   Tutorial categories and entries with YouTube IDs
│   │
│   ├── layouts/
│   │   └── BaseLayout.astro         # Shared HTML shell for every page
│   │
│   ├── components/
│   │   ├── Nav.astro                # Responsive navigation with mobile hamburger
│   │   ├── Footer.astro             # Site footer
│   │   ├── Breadcrumbs.astro        # "Home | Section | Page" breadcrumb trail
│   │   ├── RopeSwatches.astro       # Color swatch grid with click-to-switch behavior
│   │   ├── ProductGallery.astro     # Thumbnail-based image gallery switcher
│   │   ├── KitButtons.astro         # FoxyCart kit adder buttons with hover descriptions
│   │   ├── RopeCustomForm.astro     # Dynamic length/UOM/quantity form for custom rope
│   │   ├── SimpleAddToCart.astro    # Fixed-price add-to-cart form (equipment/books)
│   │   ├── ProductListItem.astro    # Product row for listing pages (image + desc + price)
│   │   └── TutorialCard.astro       # Tutorial thumbnail + title link
│   │
│   ├── scripts/
│   │   └── rope-builder.js          # Client-side JS for dynamic price/weight calculation
│   │
│   ├── pages/
│   │   ├── index.astro              # Home page
│   │   ├── faqs.astro               # FAQ page with anchor links
│   │   ├── beginner_rope_buying_guide.astro  # Long-form buying guide
│   │   ├── bulk_discounts.astro     # Bulk discount info page
│   │   ├── contact/
│   │   │   ├── index.astro          # Contact form (HTML)
│   │   │   └── index.php            # PHP form handler (copied as-is)
│   │   ├── rope/
│   │   │   ├── index.astro          # Rope category page
│   │   │   └── [...slug].astro      # Dynamic rope detail: /rope/{fiber}/{color}
│   │   ├── rainbow_rope/
│   │   │   └── index.astro          # Rainbow rope category
│   │   ├── equipment/
│   │   │   ├── index.astro          # Equipment listing
│   │   │   └── [slug].astro         # Equipment detail
│   │   ├── books/
│   │   │   ├── index.astro          # Books listing
│   │   │   └── [slug].astro         # Book detail
│   │   └── tutorials/
│   │       ├── index.astro          # Redirect to /tutorials/basics
│   │       ├── [category]/
│   │       │   └── index.astro      # Tutorial category listing
│   │       └── [...slug].astro      # Tutorial detail (YouTube embed)
│   │
│   └── styles/
│       └── global.css               # Tailwind directives + legacy CSS preserved as @layer
│
└── dist/                            # Build output (generated by `npm run build`)
```

---

## Image Download Instructions

All images must be downloaded from the live site into the `public/` directory. The site uses relative image paths in most places, so the directory structure must match exactly.

### Site-Wide Images

Download these into `public/images/`:

```
https://epicrope.com/images/epic_logo_text.png          # Header logo
https://epicrope.com/images/logo_try_II.png              # Home page slider
https://epicrope.com/images/templatemo_menu.jpg          # Nav bottom border
https://epicrope.com/images/templatemo_more.jpg          # "Read more" icon
https://epicrope.com/images/templatemo_list.jpg          # List bullet icon
```

### Home Page Feature Images

Download these into `public/img/`:

```
https://epicrope.com/img/scarlet_home_icon.png
https://epicrope.com/img/osada_jute.png
https://epicrope.com/img/rainbow.png
https://epicrope.com/img/rope_black.png
https://epicrope.com/img/equipment_black.png
https://epicrope.com/img/books_black.png
```

### Rope Product Images

For each fiber and color combination, download:

**Category page images** (into `public/rope/{fiber}/{color}/img/`):
```
https://epicrope.com/rope/{fiber}/{color}/img/main.png
https://epicrope.com/rope/{fiber}/{color}/img/thumbnail.png
```

**Product detail gallery images** (into `public/rope/{fiber}/{color}/img/images/` and `img/thumbnails/`):
```
https://epicrope.com/rope/{fiber}/{color}/img/images/1-single-{color}-{fiber}.png
https://epicrope.com/rope/{fiber}/{color}/img/thumbnails/1-single-{color}-{fiber}.png
https://epicrope.com/rope/{fiber}/{color}/img/images/2-double-{color}-{fiber}.png
https://epicrope.com/rope/{fiber}/{color}/img/thumbnails/2-double-{color}-{fiber}.png
https://epicrope.com/rope/{fiber}/{color}/img/images/3-starter-{color}-{fiber}.png
https://epicrope.com/rope/{fiber}/{color}/img/thumbnails/3-starter-{color}-{fiber}.png
https://epicrope.com/rope/{fiber}/{color}/img/images/4-riggers-{color}-{fiber}.png
https://epicrope.com/rope/{fiber}/{color}/img/thumbnails/4-riggers-{color}-{fiber}.png
https://epicrope.com/rope/{fiber}/{color}/img/images/5-suspension-{color}-{fiber}.png
https://epicrope.com/rope/{fiber}/{color}/img/thumbnails/5-suspension-{color}-{fiber}.png
```

Note: Not all colors have all 5 gallery images. The data file (`ropes.ts`) must list only the images that actually exist for each product. During the download, 404s should be expected and skipped.

**Complete fiber/color list:**

Hemp (12 colors): amethyst, black, blue, gold, green, natural, orange, pink, purple, scarlet, turquoise, yellow

Jute (9 colors): amethyst, black, blue, burgundy, emerald, lavender, natural, purple, scarlet

Shibari Jute (10 colors): amethyst, black, blue, burgundy, emerald, gold, natural, pink, purple, scarlet

### Rainbow Rope Images

```
https://epicrope.com/rainbow_rope/hemp/img/main.png
https://epicrope.com/rainbow_rope/jute/img/main.png
```

### Equipment Images

**Listing images** (into `public/equipment/img/`):
```
https://epicrope.com/equipment/img/shears.png
https://epicrope.com/equipment/img/blue_lock_carabiner.png
https://epicrope.com/equipment/img/swivel.png
```

**Detail images** (into `public/equipment/{slug}/img/images/` and `img/thumbnails/`):
```
https://epicrope.com/equipment/shears/img/images/01.png
https://epicrope.com/equipment/shears/img/thumbnails/01.png
https://epicrope.com/equipment/blue_lock_carabiner/img/images/01.png
https://epicrope.com/equipment/blue_lock_carabiner/img/thumbnails/01.png
https://epicrope.com/equipment/swivel/img/images/01.png
https://epicrope.com/equipment/swivel/img/thumbnails/01.png
```

### Book Images

**Listing images** (into `public/books/img/`):
```
https://epicrope.com/books/img/rogue_hojo_i.png
https://epicrope.com/books/img/cs_sky.png
https://epicrope.com/books/img/cs_land.png
https://epicrope.com/books/img/getting_tied_up.jpg
```

**Detail images** (into `public/books/{slug}/img/images/` and `img/thumbnails/`):

For `rogue_hojo`:
```
https://epicrope.com/books/rogue_hojo/img/images/01.png
https://epicrope.com/books/rogue_hojo/img/thumbnails/01.png
```

For `cs_sky`:
```
https://epicrope.com/books/cs_sky/img/images/01.png
https://epicrope.com/books/cs_sky/img/thumbnails/01.png
```

For `cs_land`:
```
https://epicrope.com/books/cs_land/img/images/01.png
https://epicrope.com/books/cs_land/img/thumbnails/01.png
https://epicrope.com/books/cs_land/img/images/02.jpg
https://epicrope.com/books/cs_land/img/thumbnails/02.jpg
https://epicrope.com/books/cs_land/img/images/03.jpeg
https://epicrope.com/books/cs_land/img/thumbnails/03.jpeg
https://epicrope.com/books/cs_land/img/images/04.jpeg
https://epicrope.com/books/cs_land/img/thumbnails/04.jpeg
https://epicrope.com/books/cs_land/img/images/05.jpeg
https://epicrope.com/books/cs_land/img/thumbnails/05.jpeg
https://epicrope.com/books/cs_land/img/images/06.jpeg
https://epicrope.com/books/cs_land/img/thumbnails/06.jpeg
https://epicrope.com/books/cs_land/img/images/06.jpg
https://epicrope.com/books/cs_land/img/thumbnails/06.jpg
```

For `getting_tied_up`:
```
https://epicrope.com/books/getting_tied_up/img/images/01.jpg
https://epicrope.com/books/getting_tied_up/img/thumbnails/01.jpg
```

### Tutorial Images

```
https://epicrope.com/tutorials/basics/bondage_safety/img/bondagesafetyI.png
https://epicrope.com/tutorials/basics/bondage_safety/img/bondagesafetyII.png
https://epicrope.com/tutorials/basics/how_to_get_tied_up/img/how_to_get_tied_up_i.png
https://epicrope.com/tutorials/basics/how_to_get_tied_up/img/how_to_get_tied_up_iii.png
https://epicrope.com/tutorials/basics/how_to_get_tied_up/img/how_to_get_tied_up_iv.png
https://epicrope.com/tutorials/basics/misc/img/coiling-rope.png
```

### Bulk Discounts Email Image

```
https://epicrope.com/bulk_discounts/img/email.png
```

### Other Required Files

**Contact form PHP handler** — Copy the existing `/contact/index.php` from the live server. This is a server-side file that cannot be downloaded via HTTP. Obtain it from the existing hosting.

**Favicon** — Check for `https://epicrope.com/favicon.ico` and download if present.

---

## Commenting & Documentation Standards

Every file will include explanatory comments following these rules:

### 1. File-Level Headers

Every `.astro`, `.ts`, `.js`, and `.css` file starts with a comment block explaining:
- What the file does
- Why it exists
- Any relevant learning links

Example:
```astro
---
/**
 * Rope Product Detail Page — Dynamic Route
 *
 * Generates a separate static HTML page for every fiber/color combination
 * defined in src/data/ropes.ts. At build time, Astro calls getStaticPaths()
 * to discover all routes, then renders each one.
 *
 * URL pattern: /rope/{fiber}/{color}
 * Example:     /rope/hemp/natural
 *
 * Three interactive sections on this page:
 * 1. Image gallery — click thumbnails to switch the main product photo
 * 2. Kit buttons — pre-configured bundles added to FoxyCart via URL parameters
 * 3. Custom rope form — dynamic price/weight recalculation, then POST to FoxyCart
 *
 * Learn more about Astro dynamic routes:
 * https://docs.astro.build/en/core-concepts/routing/#dynamic-routes
 */
---
```

### 2. Inline Comments on Non-Obvious Patterns

Especially FoxyCart integration, which uses unusual URL parameter encoding:

```astro
<!--
  FOXYCART KIT LINK
  This <a> tag links directly to the FoxyCart hosted cart endpoint.
  FoxyCart reads URL parameters to add items to the cart in one click.

  Multi-item syntax: numbered prefixes (1:name, 2:name, etc.) add
  multiple line items. Parameters per item:
    {n}:name     — Display name (e.g. "30 ft")
    {n}:price    — Unit price in USD
    {n}:quantity — Number of this item
    {n}:weight   — Weight in lbs (for shipping)
    {n}:category — FoxyCart category (affects tax/shipping rules)
    {n}:image    — Product image URL shown in cart
    {n}:kit      — Kit name (custom attribute for display)
    {n}:type     — Rope type (custom attribute)
    {n}:length   — Rope length (custom attribute)
    {n}:diameter — Rope diameter (custom attribute)

  FoxyCart parameter reference: https://wiki.foxycart.com/v/2.0/cart
-->
```

### 3. Data File Documentation

Every data file in `src/data/` includes:
- A file-level comment explaining the data structure
- Instructions for common maintenance tasks (add a color, change a price)
- TypeScript interfaces that serve as living documentation

### 4. GUIDE.md

A separate human-readable guide in the project root with sections:
- Quick start (install, develop, build, deploy)
- How to add a new rope color
- How to add a new product (equipment, books)
- How the FoxyCart integration works
- How to update sale/coupon codes
- How to change the navigation
- Directory structure overview
- Links to learn Astro, Tailwind, FoxyCart

---

## Implementation Steps

### Phase 1: Project Scaffold

**Step 1.1** — Initialize Astro project
```
npm create astro@latest epicrope -- --template minimal
cd epicrope
npx astro add tailwind
```

**Step 1.2** — Configure `tailwind.config.mjs`

Set design tokens matching the original site:
- Font family: `Tahoma, Geneva, sans-serif`
- Text colors: body `rgb(75,75,75)`, headings `#000`
- Link colors: `red` default, `#990000` hover
- Shadows: `3px 3px 3px #556` for cards
- Border radii: `10px` to `20px` for cards
- Max content width: `960px` (matching original wrapper)

**Step 1.3** — Create `src/data/site.ts`

```typescript
/**
 * Site-wide configuration
 *
 * Centralizes values that were previously hardcoded in every HTML file.
 * Change GA tracking IDs, FoxyCart store domain, or sale dates here.
 */
export const site = {
  name: "Epic Rope",
  url: "https://epicrope.com",
  foxyCartDomain: "epicrope.foxycart.com",
  gaTrackingId: "G-3GVCSPDFEQ",
  googleAdsId: "AW-867060290",
  sale: {
    code: "JOY2025",
    endDate: "2025-12-17",
  },
  bulkDiscount: {
    code: "Bulk",
    threshold: 250,
  },
};
```

**Step 1.4** — Create `src/styles/global.css`

Tailwind directives + preserved legacy styles:

```css
/*
 * Global Styles
 *
 * This file is the single source of CSS for the entire site.
 * Tailwind utilities handle responsive layout and most styling.
 * The @layer components section below preserves the visual design
 * from the original site's templatemo_style.css and page-specific CSS files.
 *
 * Tailwind layers explained: https://tailwindcss.com/docs/adding-custom-styles#using-css-and-layer
 */

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer components {
  /* Card shadow matching original box-shadow: 3px 3px 3px #556 */
  .card-shadow {
    @apply shadow-[3px_3px_3px_#556];
  }

  /* Rounded card matching original border-radius: 10px-20px */
  .card {
    @apply rounded-xl border border-gray-300 p-5 card-shadow;
  }

  /* Feature button stripe overlay from home.css */
  .feature-stripe {
    @apply bg-silver/50 text-black text-[40pt] rounded-2xl relative bottom-[290px] left-[5px] z-10;
  }

  /* Swatch active state from rope.css */
  .swatch-active {
    @apply border-2 border-gray-800 cursor-pointer;
  }

  /* Image visibility toggling from rope.css */
  .image-hidden { display: none; }
  .image-visible { display: block; }
}
```

**Step 1.5** — Create `GUIDE.md` with maintenance instructions.

---

### Phase 2: Layout Shell

**Step 2.1** — Build `BaseLayout.astro`

Contains:
- `<!DOCTYPE html>` (HTML5, replacing XHTML)
- `<meta name="viewport">` (was missing — critical for responsive)
- Google Analytics scripts
- Google Ads script
- FoxyCart loader script: `<script data-cfasync="false" src="https://cdn.foxycart.com/epicrope/loader.js" async defer></script>`
- FoxyCart coupon/sale logic (extracted from inline script)
- `<slot />` for page content
- Header with logo (`images/epic_logo_text.png` as background)
- Nav component
- Footer

**Step 2.2** — Build `Nav.astro`

Desktop: Horizontal nav with dropdowns for Shop (Rope, Rainbow Rope, Equipment, Books & DVDs) and FAQs (FAQs, Beginner's Guide, Bulk Discounts). Active state tracked via current URL.

Mobile: Hamburger button that toggles a vertical menu. Dropdowns expand on tap.

CSS-only approach (no JS library needed): Use checkbox hack or `<details>`/`<summary>` for mobile dropdowns. This replaces ddsmoothmenu.js entirely.

**Step 2.3** — Build `Footer.astro`

Simple: 5px top+bottom gray border, centered "Thanks for visiting!" text.

---

### Phase 3: Content Pages

These are the simplest pages — good for validating the layout before tackling complex product pages.

**Step 3.1** — `/faqs` (`src/pages/faqs.astro`)

Anchor-linked Q&A. Content is currently hardcoded in the HTML. Migrate to a simple array in the page frontmatter or in `src/data/faqs.ts`.

**Step 3.2** — `/beginner_rope_buying_guide`

Long-form text with h2/h3 headings. Copy the content verbatim.

**Step 3.3** — `/bulk_discounts`

Discount tiers + contact link + email image.

**Step 3.4** — `/contact/index.astro` and `/contact/index.php`

The `.astro` file renders the HTML form. The `.php` file is the server-side handler — copy it directly from the existing hosting. Astro will pass `.php` files through from the `public/` directory (or the PHP file can be placed directly in the deploy target alongside the generated HTML).

Note: For the contact form to work with PHP, the `index.php` must live in the `public/contact/` directory so Astro copies it to the build output as-is. Alternatively, configure the server to handle `.php` files in the output directory.

---

### Phase 4: Data Layer

**Step 4.1** — `src/data/ropes.ts`

Define TypeScript interfaces and export the complete product catalog:

```typescript
/**
 * Rope Product Data
 *
 * This file defines every rope product sold on the site. Astro uses this data
 * to generate individual product pages at build time.
 *
 * TO ADD A NEW COLOR:
 * 1. Add a new entry to the `colors` array in the relevant fiber
 * 2. Download the product images to /public/rope/{fiber}/{color}/img/
 * 3. Rebuild the site (`npm run build`)
 *
 * TO ADD A NEW FIBER TYPE:
 * 1. Add a new entry to the `fibers` array
 * 2. Download all color images
 * 3. The RopeSwatches component and rope category page will auto-render it
 *
 * Required images per color:
 *   img/main.png          — Category page product image (~270x300)
 *   img/thumbnail.png     — Swatch thumbnail on category page (~40x40)
 *   img/images/*.png      — Product detail gallery images (500x333)
 *   img/thumbnails/*.png  — Product detail gallery thumbnails
 */

export interface RopeColor {
  name: string;           // Display name: "Natural", "Scarlet", etc.
  slug: string;           // URL slug: "natural", "scarlet", etc.
  images: string[];       // Gallery image filenames (e.g., ["1-single-natural-hemp.png", ...])
  colorDescription: string;  // "About the color" text
}

export interface RopeFiber {
  name: string;           // "Hemp", "Jute", "Shibari Jute"
  slug: string;           // "hemp", "jute", "shibari_jute"
  pricePerFoot: number;   // Price per foot in USD
  weightPerFoot: number;  // Weight per foot in lbs
  diameter: string;       // "6mm"
  fiberDescription: string;  // "About the rope" text
  colors: RopeColor[];
}

export interface KitItem {
  length: number;    // Length value
  uom: string;       // "ft" or "m"
  quantity: number;  // Number of this length
  diameter: string;  // "6mm"
}

export interface Kit {
  name: string;           // "Taste Test Kit", "Suspension Kit", etc.
  slug: string;           // "taste_test", "suspension", etc.
  items: KitItem[];       // The ropes in this kit
  description: string;    // Kit description shown on hover
  totalPrice: number;     // Display price
}

export const kits: Kit[] = [ /* ... all 6 kits ... */ ];

export const fibers: RopeFiber[] = [
  {
    name: "Hemp",
    slug: "hemp",
    pricePerFoot: 1.00,
    weightPerFoot: 0.0080,
    diameter: "6mm",
    fiberDescription: "Hemp bondage rope is soft, strong, and supple...",
    colors: [
      { name: "Amethyst", slug: "amethyst", images: [...], colorDescription: "..." },
      { name: "Black", slug: "black", images: [...], colorDescription: "..." },
      // ... all 12 colors
    ],
  },
  // ... Jute, Shibari Jute
];
```

**Step 4.2** — `src/data/equipment.ts`

```typescript
export interface EquipmentItem {
  name: string;
  slug: string;
  price: number;
  weight: number;          // in lbs
  description: string;     // Full HTML description
  listImage: string;       // Path to listing image
  detailImages: string[];  // Paths to gallery images
}

export const equipment: EquipmentItem[] = [
  { name: "Safety Shears", slug: "shears", price: 5, weight: 0.05, ... },
  { name: "Blue Lock Carabiner", slug: "blue_lock_carabiner", price: 25, ... },
  { name: "Twister Swivel", slug: "swivel", price: 50, ... },
];
```

**Step 4.3** — `src/data/books.ts`

Same structure as equipment.

**Step 4.4** — `src/data/tutorials.ts`

```typescript
export interface Tutorial {
  title: string;
  slug: string;
  image: string;
  author?: string;
  authorBio?: string;
  authorUrl?: string;
  youtubeEmbedUrl: string;  // "//www.youtube.com/embed/{id}"
}

export interface TutorialCategory {
  name: string;
  slug: string;
  subcategories: {
    name: string;
    slug: string;
    tutorials: Tutorial[];
  }[];
}

export const tutorialCategories: TutorialCategory[] = [
  {
    name: "Basics",
    slug: "basics",
    subcategories: [
      {
        name: "Bondage Safety",
        slug: "bondage_safety",
        tutorials: [
          {
            title: "Bondage Safety 1 of 2",
            slug: "bondagesafetyI",
            image: "/tutorials/basics/bondage_safety/img/bondagesafetyI.png",
            author: "Esinem",
            authorBio: "Esinem should need no introduction...",
            authorUrl: "http://esinem.com",
            youtubeEmbedUrl: "//www.youtube.com/embed/lr4EtgSS3qM",
          },
          // ...
        ],
      },
      // ...
    ],
  },
  // ... 6 more categories (scrape these from live site during build)
];
```

---

### Phase 5: Components

**Step 5.1** — `SimpleAddToCart.astro`

Reproduces the FoxyCart `<form>` pattern from equipment/book detail pages:
```html
<form action="https://epicrope.foxycart.com/cart" method="post" accept-charset="utf-8">
  <input type="hidden" name="price" value={price} />
  <input type="hidden" name="weight" value={weight} />
  <input type="hidden" name="name" value={name} />
  <input type="hidden" name="image" value={imageUrl} />
  <input class="button" type="submit" name="Add to Cart" value="Add to Cart" />
</form>
```

**Step 5.2** — `ProductListItem.astro`

Reproduces the equipment/books listing row: image (180x180) | title + truncated description | price.

**Step 5.3** — `RopeSwatches.astro`

Reproduces the color swatch grid from the rope category page. Each swatch is a clickable thumbnail. Clicking switches the main product image (vanilla JS replaces jQuery). Double-clicking navigates to the product detail page.

The JS logic (from `epicrope.js`):
- Click swatch → hide current visible image, show new image, update active swatch
- Click already-active swatch → navigate to product detail page

**Step 5.4** — `ProductGallery.astro`

Reproduces the thumbnail image gallery on product detail pages. Click thumbnail → switch main image. Replaces jQuery show/hide with vanilla JS.

**Step 5.5** — `KitButtons.astro`

Generates the 6 kit buttons. Each button is an `<a>` tag with a FoxyCart URL containing encoded multi-item parameters. On hover, the corresponding kit description appears.

The FoxyCart URL encoding logic needs to be reproduced exactly. For multi-item kits (e.g., Suspension Kit = 8x30ft + 4x15ft), the URL has two numbered groups:
```
?1:name=30%20ft&1:category=Kit&1:price=30&1:quantity=8&1:diameter=6mm&2:name=15%20ft&2:category=Kit&2:price=15&2:quantity=4&2:diameter=6mm&
```

**Step 5.6** — `RopeCustomForm.astro` + `src/scripts/rope-builder.js`

Reproduces the custom rope builder form. This is the most complex interactive element.

The form has:
- Length select (5-120 in increments of 5 for feet, 1-24 for meters)
- UOM select (feet/meters)
- Diameter select (6mm for most products)
- Quantity select (1-39)
- Hidden fields: price, weight, name, type, image

When length or UOM changes, the JS recalculates:
- `price = length * pricePerFoot` (if meters: `pricePerFoot * 3.28`)
- `weight = length * weightPerFoot` (if meters: `weightPerFoot * 3.28`)
- `name = length + " " + uom`

When UOM changes between feet and meters:
- The length select options change: feet shows 5,10,15...120; meters shows 1,2,3...24
- The current numeric position is preserved (e.g., if on option 6 of 24 in feet mode → value 30, switching to meters → option 6 of 24 → value 6)

This logic is ported from `epicrope.js` functions: `CustomSetChange`, `CustomUOMChange`, `ChangeCustomLengthOptions`, `ChangeCustomInput`.

**Step 5.7** — `Breadcrumbs.astro`

Simple breadcrumb trail: "Home | Section | Page" with links.

**Step 5.8** — `TutorialCard.astro`

Thumbnail image + title, linking to the tutorial detail page.

---

### Phase 6: Product Pages

**Step 6.1** — `/rope/index.astro`

Three equal columns (Hemp, Jute, Shibari Jute). Each column contains:
- Product image (currently visible color)
- Color name and price
- Fiber description
- Color swatch grid

Uses `RopeSwatches.astro` component.

**Step 6.2** — `/rope/[...slug].astro`

Dynamic route that generates a page for each fiber/color combination. Uses `getStaticPaths()` to enumerate all combinations from `ropes.ts`.

Each page contains:
- Breadcrumbs
- Title
- `ProductGallery.astro`
- `KitButtons.astro`
- `RopeCustomForm.astro` (with rope-builder.js)
- Description box ("About the rope" + "About the color")

**Step 6.3** — `/rainbow_rope/index.astro`

Two columns (Rainbow Hemp, Rainbow Jute). No swatches, single image each.

**Step 6.4** — `/equipment/index.astro`

List of equipment items using `ProductListItem.astro`.

**Step 6.5** — `/equipment/[slug].astro`

Dynamic route. Each page: breadcrumbs, `ProductGallery.astro`, description, price, `SimpleAddToCart.astro`.

**Step 6.6** — `/books/index.astro`

Same pattern as equipment listing.

**Step 6.7** — `/books/[slug].astro`

Same pattern as equipment detail.

---

### Phase 7: Tutorials

**Step 7.1** — `/tutorials/index.astro`

Redirect to `/tutorials/basics`.

**Step 7.2** — `/tutorials/[category]/index.astro`

Left side: tutorial groups with `TutorialCard.astro` grids.
Right side: category sidebar with active state.

**Step 7.3** — `/tutorials/[...slug].astro`

Centered YouTube `<iframe>` embed + author bio paragraph.

Note: The original URLs use `.php` extensions (e.g., `/tutorials/basics/bondage_safety/bondagesafetyI.php`). The rebuild should either:
- Generate pages at the `.php` URLs (by setting `slug: "bondagesafetyI.php"` in the data), OR
- Generate clean URLs and add redirect rules in `.htaccess`

Matching the original `.php` URLs is simpler for maintaining backward compatibility.

---

### Phase 8: Home Page

**Step 8.1** — `/index.astro`

Left column: 6 feature buttons. Each is a `<a>` wrapping an image and a semi-transparent silver stripe with text. The stripe uses `opacity: 0.5`, `background-color: silver`, `font-size: 40pt`, positioned relative to overlap the bottom of the image.

Right column: Announcements and "About" text in rounded box-shadow cards.

The home page also includes the logo slider image between the nav and content.

---

### Phase 9: FoxyCart Coupon Logic

**Step 9.1** — Extract the inline coupon script from every page into a single shared `<script>` in `BaseLayout.astro`.

The script must:
1. Load FoxyCart API
2. Check if today is before the sale end date
3. If yes: auto-apply sale coupon on cart ready
4. If no: register event listeners for cart-submit, coupon-add, quantity-update, item-remove
5. On those events: if cart total > $250 and "Bulk" coupon not already applied → apply it; if cart total < $250 and "Bulk" coupon is applied → remove it

This is a direct port of the existing inline script, just centralized.

---

### Phase 10: Responsive Breakpoints

The original site is fixed at 960px. The responsive version needs:

| Breakpoint | Layout |
|---|---|
| < 640px (mobile) | Single column. Nav collapses to hamburger. Product grids stack vertically. Rope category shows 1 fiber at a time (tabs or accordion). Image gallery thumbnails scroll horizontally. |
| 640px-1024px (tablet) | Two columns where applicable. Nav may still be hamburger. Product grids show 2 items per row instead of 3. |
| > 1024px (desktop) | Matches original 960px fixed-width layout, centered. Full desktop nav with dropdowns. 3-column product grids. |

Specific responsive adaptations:
- **Nav**: Horizontal dropdown on desktop, hamburger menu on mobile/tablet
- **Home page**: Feature buttons stack vertically, right sidebar moves below
- **Rope category**: 3 columns → 1 column on mobile
- **Product detail**: Image gallery stacks above form on mobile
- **Kit buttons**: Grid wraps on smaller screens
- **Equipment/books listing**: Rows may stack image above text on mobile
- **Tutorial video**: Full-width with padding, maintaining aspect ratio
- **Contact form**: Full-width on mobile

---

### Phase 11: Polish & QA

**Step 11.1** — Verify all original URLs work

Compare the `dist/` output against the original site's sitemap. Every URL must produce a 200 response.

**Step 11.2** — Test FoxyCart integration

For each product type, verify the add-to-cart flow:
- Click a kit button → FoxyCart cart opens with correct items, prices, quantities
- Submit custom rope form → FoxyCart cart opens with correct price, weight, name
- Submit equipment/book form → FoxyCart cart opens with correct product
- Verify bulk discount coupon auto-applies at $250+

**Step 11.3** — Test responsive layout

Check every page template at 320px, 768px, 1024px, and 1440px widths.

**Step 11.4** — Visual comparison

Compare the desktop (1440px) rendering against the original site. Typography, spacing, colors, shadows, and border radii must match.

**Step 11.5** — Lighthouse audit

Run Lighthouse on the built output. Target: Performance > 90, Accessibility > 90.

---

## Deployment

### Build Command
```bash
npm run build
```

This generates static HTML in the `dist/` directory.

### Deploy to Current PHP Hosting

1. Run `npm run build` locally
2. Upload the contents of `dist/` to the web root
3. Ensure `contact/index.php` is present and functional
4. Verify `.htaccess` serves the static files correctly

The contact form PHP handler must be in the `public/` directory during development so Astro copies it to `dist/` as-is.

### Future Updates

To update product data, edit files in `src/data/`, rebuild, and redeploy `dist/`.

To update sale coupons, edit `src/data/site.ts`, rebuild, and redeploy.

---

## Original Site Assets Reference

All original CSS files for reference during the rebuild:

| File | URL | Purpose |
|---|---|---|
| 960.css | `https://epicrope.com/css/960.css` | Grid system — being replaced by Tailwind |
| templatemo_style.css | `https://epicrope.com/templatemo_style.css` | Main visual design — being ported to Tailwind config |
| ddsmoothmenu.css | `https://epicrope.com/css/ddsmoothmenu.css` | Nav styling — being replaced |
| epicrope.css | `https://epicrope.com/css/epicrope.css` | Minimal overrides (breadcrumb, sale panel) |
| home.css | `https://epicrope.com/home.css` | Home page styles (feature buttons, stripe, captions) |
| rope.css | `https://epicrope.com/rope/rope.css` | Rope category page (swatches, product cards, visibility) |
| order_rope.css | `https://epicrope.com/modules/order_rope.css` | Rope order form styling |
| order.css | `https://epicrope.com/modules/order.css` | Equipment/book order form styling |
| category.css | `https://epicrope.com/modules/category/category.css` | Tutorial category page |
| tutorial.css | `https://epicrope.com/modules/tutorial/tutorial.css` | Tutorial detail page |
| equipment.css | `https://epicrope.com/equipment.css` | Equipment listing page |
| books.css | `https://epicrope.com/books.css` | Books listing page |
| bulk_discounts.css | `https://epicrope.com/bulk_discounts.css` | Bulk discounts page |

All original JS files:

| File | URL | Purpose |
|---|---|---|
| epicrope.js | `https://epicrope.com/js/epicrope.js` | Swatch switching, image gallery, rope builder pricing |
| ddsmoothmenu.js | `https://epicrope.com/js/ddsmoothmenu.js` | Nav dropdown — being replaced |
| FoxyCart loader | `https://cdn.foxycart.com/epicrope/loader.js` | FoxyCart API — kept as-is |

---

## Summary

This rebuild replaces the aging fixed-width HTML architecture with a modern static site generator while preserving the exact visual design and all e-commerce functionality. The data-driven approach eliminates the manual maintenance burden of ~30+ individually-coded product pages. Comprehensive comments and a dedicated GUIDE.md ensure that future maintainers can confidently update products, prices, and sale configurations.
