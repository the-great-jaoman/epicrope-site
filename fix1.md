# EpicRope Site Clone: Comparison & Fix Report

**Original:** https://epicrope.com
**Clone:** https://the-great-jaoman.github.io/epicrope-site/

---

## 1. Image Paths Are Broken (Critical)

| Original | Clone |
|---|---|
| `<img src="images/logo_try_II.png">` (relative) | `<img src="/images/logo_try_II.png">` (absolute from root) |
| `<img src="img/scarlet_home_icon.png">` | `<img src="/img/scarlet_home_icon.png">` |
| `<img src="hemp/amethyst/img/main.png">` (relative to page) | `<img src="/rope/hemp/amethyst/img/main.png">` (absolute from root) |

**Root Cause:** The clone is hosted at `https://the-great-jaoman.github.io/epicrope-site/` (sub-path), but all image `src` attributes use absolute-root paths (`/images/...`, `/img/...`, `/rope/.../img/...`). These resolve to `https://the-great-jaoman.github.io/images/...` instead of `https://the-great-jaoman.github.io/epicrope-site/images/...`.

On the original site, images are served from the same relative directory (no sub-path), so relative paths work fine.

**Fix:** All image paths must be prefixed with `/epicrope-site/`. In Astro, this means setting `base: 'epicrope-site'` in `astro.config.mjs` so that the build process prefixes all asset paths. Alternatively, use relative paths (e.g., `./images/` or `../images/`) throughout.

---

## 2. Missing JavaScript Dependencies (Critical)

The original site loads:
- jQuery 1.9.0 from CDN
- `ddsmoothmenu.js` — powers the dropdown navigation menus
- `epicrope.js` — custom site JS (likely color swatch switching, etc.)

The clone loads **none** of these. Instead, the clone has a small inline script for swatch clicks.

**Root Cause:** The clone was migrated to Astro (static site generator) and the JS was not ported over. The `ddsmoothmenu` initialization call (`ddsmoothmenu.init({...})`) is entirely missing.

**Impact:**
- Dropdown menus in the navigation (`Shop > Rope, Rainbow Rope, Equipment` and `FAQs > Beginner's Guide, Bulk Discounts`) will **not appear on hover** — all submenu items are invisible to users without CSS workarounds.
- Any jQuery-dependent functionality is broken.

**Fix:** 
- Port `ddsmoothmenu.js` to vanilla JS or a modern dropdown implementation
- Or add CSS-only dropdowns using `:hover` on `<li>` parents
- Port any needed logic from `epicrope.js`
- Remove jQuery dependency entirely (Astro doesn't need it)

---

## 3. FoxyCart Points to the Real Store (Critical)

Both sites load:
```html
<script data-cfasync="false" src="https://cdn.foxycart.com/epicrope/loader.js" async defer></script>
```

And the cart link:
```html
<a href="https://epicrope.foxycart.com/cart?cart=view">Cart</a>
```

**Root Cause:** The clone literally copied the real FoxyCart store credentials. Any user who clicks "Add to Cart" on the clone will be adding items to the **real epicrope.com FoxyCart store**, not a test/demo store.

**Impact:**
- Real orders may be placed through the clone.
- The real site's analytics and inventory could be affected.
- Confusion for customers who land on the clone.

**Fix:** Either:
- Remove the FoxyCart loader entirely (if this is just a static copy/demo)
- Or create a separate FoxyCart subdomain for the clone (e.g., `epicrope-test.foxycart.com`)
- Or replace the "Add to Cart" flow with static "Buy at EpicRope.com" external links

---

## 4. Google Analytics Sends Data to the Real Site (High)

Both sites use:
```js
gtag('config', 'G-3GVCSPDFEQ');  // Real EpicRope GA4 property
gtag('config', 'AW-867060290');  // Real EpicRope Google Ads
```

**Root Cause:** Cloned the tracking IDs verbatim.

**Impact:** All analytics data from the clone (pageviews, events, etc.) is polluting the real site's Google Analytics and Google Ads data, making real metrics unreliable.

**Fix:** Remove all Google Analytics and Google Ads scripts from the clone, or replace with a test tracking ID.

---

## 5. Canonical URL Points to Wrong Domain (Medium)

All pages on the clone include:
```html
<link rel="canonical" href="https://epicrope.com">
```

**Root Cause:** Hardcoded canonical URL in the Astro template.

**Impact:** Search engines will treat the clone as a duplicate of the real site and may penalize or ignore it.

**Fix:** Set the canonical URL to the clone's domain, or remove it entirely. In Astro, this should be a configurable variable per environment.

---

## 6. Broken Tutorials Page (Medium)

The clone's `/tutorials` page is a bare redirect:
```html
<meta http-equiv="refresh" content="0;url=/tutorials/basics">
<p>Redirecting to <a href="/tutorials/basics">tutorials</a>...</p>
```

The original `/tutorials` page shows a full tutorial listing with categories, thumbnail images, and links to individual tutorials (which are `.php` files).

**Root Cause:** The tutorials are PHP-based (`bondagesafetyI.php`, `bondagesafetyII.php`, etc.) and were not converted to static HTML.

**Fix:** Convert the PHP tutorial pages to static HTML, or at minimum build the tutorial listing page with the same content as the original.

---

## 7. Missing `<meta name="keywords">` Tags (Medium)

The original site includes `<meta name="keywords">` tags on every page (e.g., "learn shibari, buy books on kinbaku, buy bondage rope..."). The clone omits these entirely.

**Root Cause:** The Astro template does not include `<meta name="keywords">` in its `<head>` output.

**Fix:** Add keywords meta tags to the Astro layout template, mirroring the original content.

---

## 8. Menu Link Path Differences (Medium)

| Item | Original | Clone |
|---|---|---|
| Home link | `https://epicrope.com` (absolute) | `/` (relative) |
| Japanese/Shibari Jute link | `/rope/japanese_jute/natural` | `/rope/shibari_jute/natural` |
| All nav links | `https://epicrope.com/...` (absolute) | `/...` (relative) |

**Root Cause:** The clone uses relative paths and renamed the "Japanese Jute" category to "Shibari Jute" in the URL structure.

**Fix:** Ensure URL paths match the original or properly redirect. The `shibari_jute` path on the clone must exist and serve the same content as `japanese_jute` on the original.

---

## 9. CSS Class Name Differences (Low)

| Element | Original | Clone |
|---|---|---|
| Feature button overlay | `class="stripe"` | `class="feature-stripe"` |
| Menu div class | `class="ddsmoothmenu"` | (missing) |
| Visible class on swatches | `invisible visible` | `image-hidden` with inline `style="display:block"` |
| Home header | `<div class="home_header">` | `<div class="home_header" style="font-size:20px;">` (inline styles added) |

**Root Cause:** The clone was rebuilt in Astro with CSS modules or a different CSS system. The original CSS classes were not all preserved.

**Fix:** Since the clone bundles all CSS into one Astro build file (`BaseLayout.CZvIjsqH.css`), ensure all class names match what's defined in that CSS. The `stripe` class likely no longer exists — rename to match or use inline styles.

---

## 10. Content Truncation on "Our Shop" Section (Medium)

The homepage right column "Our Shop" text on the clone is truncated. Compare:

**Original (full text):**
> "hand treated and dyed to provide the optimum look and feel as it glides across the body. Its texture will stimulating the passion of Kinbaku. Its shine will inspiring creativity in your bondage photography and make your performance bondage stand out. And don't forget lighthearted fun – it's all about the fun, after all."

**Clone (truncated):**
> "hand treated and dyed to provide the optimum look and feel."

**Root Cause:** The content was manually shortened during migration.

**Fix:** Restore the full original text.

---

## 11. FAQ Content Differences (Low)

| Detail | Original | Clone |
|---|---|---|
| "contact us" link | `http://epicrope.com/contact` or `../contact` | `/contact` |
| Q4 extra sentence | "If you can provide a link to an example, that would be great." (present) | (absent) |
| Q9 "it's" vs "its" | "on it's way" (grammar error) | "on its way" (corrected) |

**Root Cause:** Manual editing during porting — some text was corrected, some was omitted.

**Fix:** Decide whether to match the original exactly (including typos) or keep the corrections, but ensure consistency.

---

## 12. Slider Position in DOM (Low)

**Original:** The slider image is inside `<div id="templatemo_menu">`, before the cleaner.

**Clone:** The slider is inside `<div id="templatemo_main">`, after the menu cleaner.

**Root Cause:** DOM restructuring during migration to Astro.

**Fix:** If the CSS depends on the slider being inside the menu div, it needs to be moved back. Otherwise, this may not matter visually.

---

## 13. Missing "current" Class on Active Nav Items (Low)

The original adds `class='current'` to the active page's nav link. The clone never adds this class.

**Root Cause:** Astro template doesn't implement active-link detection.

**Fix:** Add Astro logic to set the `class="current"` (or equivalent) on the active navigation item.

---

## 14. No Mobile Menu Functionality (Medium)

The clone has a hamburger button:
```html
<div class="mobile-menu-btn" onclick="this.nextElementSibling.classList.toggle('open')">☰</div>
```

But there is no CSS defined for `.open` on the `<ul>` (or it may be in the bundled CSS — verify). The original site has no mobile menu at all (it was desktop-only).

**Root Cause:** Mobile menu was attempted but may not have working CSS.

**Fix:** Ensure the CSS for `.mobile-menu-btn + ul.open` (or similar selector) exists and properly shows/hides the menu on mobile.

---

## Summary Table

| # | Issue | Severity | Category |
|---|---|---|---|
| 1 | Image paths broken (wrong base path) | Critical | Technical |
| 2 | Missing jQuery, ddsmoothmenu, epicrope.js | Critical | Technical |
| 3 | FoxyCart sends orders to real store | Critical | Business |
| 4 | Google Analytics poisons real site data | High | Technical |
| 5 | Canonical URL points to epicrope.com | Medium | SEO |
| 6 | Tutorials page is a bare redirect | Medium | Content |
| 7 | Missing meta keywords | Medium | SEO |
| 8 | Menu link path differences | Medium | Content |
| 9 | CSS class name mismatches | Low | Technical |
| 10 | "Our Shop" text truncated | Medium | Content |
| 11 | FAQ content differences | Low | Content |
| 12 | Slider DOM position moved | Low | Technical |
| 13 | Missing "current" nav class | Low | UX |
| 14 | Mobile menu likely non-functional | Medium | UX |

---

## Recommended Fix Order

1. **Immediate (Critical):** Fix image paths via Astro `base` config or relative paths
2. **Immediate (Critical):** Remove/redirect FoxyCart and Google Analytics from clone
3. **High:** Port navigation JS (dropdown menus)
4. **High:** Fix tutorial pages (convert PHP to HTML)
5. **Medium:** Restore truncated content, fix link paths, add meta keywords
6. **Medium:** Fix canonical URLs
7. **Low:** Clean up CSS classes, slider position, nav active states
