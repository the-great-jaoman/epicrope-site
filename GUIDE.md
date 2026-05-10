# EpicRope Maintenance Guide

## Quick Start
```bash
npm install
npm run dev      # Development server
npm run build    # Build static site to dist/
npm run preview  # Preview the built site
```

## How to Add a New Rope Color
1. Open `src/data/ropes.ts`
2. Find the appropriate fiber (hemp, jute, or shibari_jute)
3. Add a new entry to the `colors` array:
   ```typescript
   { name: "YourColor", slug: "yourcolor", images: galleryImages("fiber", "yourcolor"), colorDescription: "Description text" }
   ```
4. Download product images to `public/rope/{fiber}/{color}/img/`
5. Run `npm run build`

## How to Add a New Product (Equipment/Books)
1. Open `src/data/equipment.ts` or `src/data/books.ts`
2. Add a new entry to the array with name, slug, price, weight, description, listImage, detailImages
3. Download product images to the corresponding directory
4. Rebuild

## How the FoxyCart Integration Works
- **Kit buttons**: `<a>` tags linking to `https://epicrope.foxycart.com/cart?{params}`
- **Custom rope form**: `<form>` POSTing to FoxyCart with hidden fields
- **Simple products**: Same form pattern for equipment/books
- **Sale coupon**: Auto-applied via JS in `BaseLayout.astro`
- **Bulk coupon**: Auto-applied when cart > $250

## Updating Sale/Coupon Codes
Edit `src/data/site.ts`:
- `sale.code` - The coupon code
- `sale.endDate` - When the sale expires (ISO date string)
- `bulkDiscount.threshold` - Cart total for bulk discount

## Changing the Navigation
Edit `src/components/Nav.astro`. The nav uses semantic HTML with CSS dropdowns.

## File Structure
```
src/
  data/          - Product/catalog data (edit these to update products)
  layouts/       - BaseLayout.astro (shared HTML shell)
  components/    - Reusable UI components
  pages/         - Route pages (one per URL)
  scripts/       - Client-side JavaScript
  styles/        - Global CSS with Tailwind
public/          - Static assets (images, PHP handler)
```
