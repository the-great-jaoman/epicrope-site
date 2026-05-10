# EpicRope Rebuild - TODO & Human Tasks

## 1. Missing Equipment Weights (Placeholders - Needs Real Values)
- **Blue Lock Carabiner**: `weight: 0` — get actual weight in lbs from product packaging or supplier
- **Twister Swivel**: `weight: 0` — get actual weight in lbs from product packaging or supplier

## 2. Missing Book Weights (Placeholders - Needs Real Values)
- **Rogue Hojojutsu**: `weight: 0` — get actual weight in lbs
- **The Little Guide to Getting Tied Up**: `weight: 0` — get actual weight in lbs

## 3. Color Descriptions — DOUBLE CHECK (Missing Content)
Only "Natural Hemp" description was scraped from the live site. Each rope product detail page shows an "About the color" box.
- Visit each product detail page on the live site (e.g., `https://epicrope.com/rope/hemp/amethyst`)
- Copy the "About the color" text
- Update `src/data/ropes.ts` → `colorDescription` field for each color

Colors needing descriptions:
- **Hemp (11)**: Amethyst, Black, Blue, Gold, Green, Orange, Pink, Purple, Scarlet, Turquoise, Yellow
- **Jute (9)**: Amethyst, Black, Blue, Burgundy, Emerald, Lavender, Natural, Purple, Scarlet
- **Shibari Jute (10)**: Amethyst, Black, Blue, Burgundy, Emerald, Gold, Natural, Pink, Purple, Scarlet

## 4. Tutorial YouTube IDs — DOUBLE CHECK (Missing Content)
Most tutorials have blank `youtubeEmbedUrl` fields. Visit each tutorial page on the live site and extract the YouTube embed URL from the `<iframe>`.

**Basics:**
- [ ] Bondage Safety 2 of 2 (`/tutorials/basics/bondage_safety/bondagesafetyII.php`)
- [ ] How To Get Tied Up I (`/tutorials/basics/how_to_get_tied_up/how_to_get_tied_up_i.php`)
- [ ] How to Get Tied Up II (`/tutorials/basics/how_to_get_tied_up/how_to_get_tied_up_iv.php`)
- [ ] How to Get Tied Up III (`/tutorials/basics/how_to_get_tied_up/how_to_get_tied_up_iii.php`)
- [ ] Coiling Rope (`/tutorials/basics/misc/coiling-rope.php`)

**Beginner Ties:**
- [ ] Burlington Bowline, Fast Bowline, French Bowline, Somerville Bowline
- [ ] 75% of All Shibari Bondage, Basket Weave Pattern, Diamond Pattern, Karada Pattern

**Upper Body Ties (all 12):**
- [ ] Basic Box Tie, Basic Broad Hishi Box Tie, Basic Karada Box Tie, Basic Osada Ryu 2 Rope TK
- [ ] Mishibari Karada Box Tie, Mishibari Lee Harrington Box Tie, MiShibari Lochai Box Tie, No Cinches TK
- [ ] Basic Chest Harness, Karada Chest Harness, MiShibari Chest Harness, Spinal Harness
- [ ] Back Web Tie, Basic Pillow Tie, Basic Rope Corset, Tengu Shibari

**Hip Harnesses (all 7):**
- [ ] Basic Gunslinger, Basket Seat Hip Harness, Hip Holster, Leto Hip Harness
- [ ] MiShibari Drum Harness, MiShibari Gunslinger, Mishibari Modified Gunslinger

**Body Harnesses (all 6):**
- [ ] Diamond Body Harness, Karada, MiShibari Box Tie Diamond Harness
- [ ] MiShibari Generic Hip Harness Karada, MiShibari Japanese Pearl Tie, MiShibari Karada

**Lower Body Ties (all 3):**
- [ ] Diamond Pattern Leg Tie, Gravity Boot, Karada Leg Tie

**Full Body Ties (both):**
- [ ] MiShibari Ebi Tie, MiShibari Hogtie

Update `src/data/tutorials.ts` → `youtubeEmbedUrl` field for each.

## 5. Tutorial Author Bios — DOUBLE CHECK (Missing Content)
Only Esinem's bio is filled in. Tutorials marked "(German)" by MiShibari need author info.

Update `src/data/tutorials.ts`:
- Set `author`, `authorBio`, and `authorUrl` for non-Esinem tutorials
- If unknown, leave blank (the page will just show the video without an author box)

## 6. Gallery Image Verification — DOUBLE CHECK
Not all rope colors have all 5 gallery images (1-single through 5-suspension).
- [ ] For each color, check which gallery images exist at: `https://epicrope.com/rope/{fiber}/{color}/img/images/{n}-{name}-{fiber}.png`
- [ ] If an image returns 404, remove it from the `images` array in `src/data/ropes.ts`
- [ ] Repeat for thumbnails at `.../img/thumbnails/`

**Images already confirmed 404 during download (needs arrays trimmed):**

Hemp gallery images that are MISSING:
- Amethyst: 4-riggers, 5-suspension
- Black: 5-suspension
- Gold: ALL 5 gallery images (1-single through 5-suspension)
- Green: ALL 5 gallery images
- Orange: 3-starter, 4-riggers, 5-suspension
- Pink: 4-riggers, 5-suspension
- Purple: 3-starter, 4-riggers, 5-suspension
- Scarlet: 5-suspension
- Turquoise: 5-suspension
- Yellow: 3-starter, 4-riggers, 5-suspension

Jute gallery images that are MISSING:
- Black: 5-suspension
- Blue: 5-suspension
- Burgundy: 2-double
- Emerald: 2-double, 5-suspension
- Lavender: 2-double, 5-suspension
- Natural: 2-double
- Purple: 4-riggers, 5-suspension
- Scarlet: 4-riggers

Shibari Jute: ALL gallery images MISSING for all colors (only main.png and thumbnail.png exist)

## 7. Kit Prices for Shibari Jute — DOUBLE CHECK
The kit table in `epicrope-build1.md` shows different prices for Shibari Jute:
- Shibari Floor Kit: hemp $184, jute $184, **shibari_jute $220.16**
- Shibari Unlimited: hemp $315, jute $315, **shibari_jute $377.28**

Current implementation uses flat $184/$315 for all fibers.
- [ ] Verify whether FoxyCart URL parameters override the prices (the kit URL includes explicit `price` params)
- [ ] If yes, the current approach is correct (the URL params set the price, not the kit definition)
- [ ] If no, update the kit system to support per-fiber pricing

## 8. Contact Form PHP Handler — Needs Setup
File created at `public/contact/index.php` with a basic PHP `mail()` implementation.
- [ ] Update the `$to` email address in `public/contact/index.php` to the correct recipient
- [ ] Verify your server has mail transport configured (sendmail, SMTP, etc.)
- [ ] Test form submission end-to-end
- [ ] Alternatively, replace with your preferred form handler/service

## 9. FoxyCart & GA — Connect Clone to Its Own Accounts

The clone currently uses the **real epicrope.com** FoxyCart store domain and Google Analytics tracking IDs.

### FoxyCart
- **Cart link**: Points to `https://epicrope.foxycart.com/cart?cart=view` in `src/components/Nav.astro`
- **Loader script**: Loads from `https://cdn.foxycart.com/epicrope/loader.js` in `src/layouts/BaseLayout.astro`
- **Form actions**: Point to `https://epicrope.foxycart.com/cart` in `RopeCustomForm.astro`, `KitButtons.astro`, `SimpleAddToCart.astro`
- **Image URLs**: Sent to FoxyCart as product images; currently use `site.url` (clone domain after fix) or hardcoded `https://epicrope.com`

**To make FoxyCart work for the clone:**
- [ ] Create a separate FoxyCart subdomain for testing (e.g., `epicrope-test.foxycart.com`)
- [ ] Update `site.foxyCartDomain` in `src/data/site.ts` to the test subdomain
- [ ] Update the loader script URL in `src/layouts/BaseLayout.astro`
- [ ] Verify image URLs sent to FoxyCart are publicly accessible

**To keep pointing to the real store (current behavior):**
- [ ] Test that adding items to cart from the clone correctly submits to `epicrope.foxycart.com`
- [ ] Verify the cart popup loads and displays correctly
- [ ] Ensure image URLs sent to FoxyCart use `https://epicrope.com` (not the clone domain) — if images fail, revert `imageUrl` in `RopeCustomForm.astro` and `KitButtons.astro` to hardcode `https://epicrope.com`

### Google Analytics / Ads
- **GA4 ID**: `G-3GVCSPDFEQ` (real EpicRope property)
- **Google Ads ID**: `AW-867060290` (real EpicRope property)
- Configured in `src/data/site.ts` and loaded in `src/layouts/BaseLayout.astro`

**To make GA work for the clone:**
- [ ] Create separate GA4 and Google Ads properties for the clone domain
- [ ] Update `gaTrackingId` and `googleAdsId` in `src/data/site.ts`
- [ ] Test that pageviews appear in the correct property

**To keep pointing to real accounts (current behavior):**
- [ ] Accept that clone traffic will pollute real analytics
- [ ] Or add domain checking to conditionally load GA only on `epicrope.com`

---

## 10. FoxyCart Integration — DOUBLE CHECK
Verify all add-to-cart flows work correctly:
- [ ] **Kit buttons**: Click a kit button → FoxyCart cart opens with correct items, prices, quantities
- [ ] **Custom rope form**: Submit → correct price, weight, name appear in cart
- [ ] **Equipment/book forms**: Submit → correct product appears in cart
- [ ] **Bulk discount coupon**: Auto-applies at $250+ cart total
- [ ] **Sale coupon**: Auto-applies before 2025-12-17
- [ ] **Cart link**: "Cart" nav link goes to `https://epicrope.foxycart.com/cart?cart=view`

The kit URLs are generated dynamically in `src/components/KitButtons.astro`. The form actions point to `https://{foxyCartDomain}/cart` where `foxyCartDomain = "epicrope.foxycart.com"` (from `src/data/site.ts`).

## 10. Nav Active State — DOUBLE CHECK
The responsive nav hamburger button is a simple JS toggle.
- [ ] Test mobile hamburger menu at ≤768px width
- [ ] Verify dropdown menus work on hover on desktop
- [ ] Verify "current" class highlights the active page

## 11. Rainbow Rope Detail Pages — DOUBLE CHECK
Two new pages created:
- [ ] `/hemp/rainbow_rope` → $1.30/ft, image from `/rainbow_rope/hemp/img/main.png`
- [ ] `/jute/rainbow_rope` → $1.50/ft, image from `/rainbow_rope/jute/img/main.png`
- [ ] Verify these match the expected layout and FoxyCart integration
- [ ] Verify the KitButtons component generates correct URL params for these pages

## 12. Rope Builder JS — DOUBLE CHECK
- [ ] Test the custom rope form on any rope detail page
- [ ] Switching UOM between ft/m should update length options correctly
- [ ] Changing length should update price/weight hidden fields
- [ ] The "Add" button should submit to FoxyCart with correct values

## 13. Responsive Layout — DOUBLE CHECK
Test every page template at viewport widths:
- [ ] 320px (mobile)
- [ ] 768px (tablet)
- [ ] 1024px (small desktop)
- [ ] 1440px (large desktop)

Look for:
- Content overflowing
- Nav breaking or becoming unusable
- Product grids not stacking properly
- Image gallery thumbnails overlapping
- Kit buttons wrapping awkwardly

## 14. SEO Meta Tags — DOUBLE CHECK
- [ ] Every page has a unique `<title>` and `<meta name="description">`
- [ ] Canonical URLs point to the correct live URL
- [ ] No duplicate title/description patterns
- [ ] 404 page has appropriate title

## 15. Image Verification — DOUBLE CHECK (Post-Download)
After downloading all images:
- [ ] Verify all pages render without broken images
- [ ] Check that all product images show the correct color/fiber
- [ ] Verify tutorial thumbnails load
- [ ] Check the favicon displays

## 16. Build Output — DOUBLE CHECK
- [ ] `npm run build` completes without errors
- [ ] All expected pages are in `dist/`
- [ ] Static assets (CSS, JS) load correctly
- [ ] No console errors in browser dev tools
