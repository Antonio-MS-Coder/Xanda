# Image Requirements for Xanda Landing Page

This document outlines the specific image requirements for the Xanda landing page. All images should follow these specifications for optimal performance and visual quality.

## Required Images

### 1. Logo (logo.svg)
- **Format**: SVG (vector)
- **Dimensions**: 112×28px (viewBox)
- **Color**: Gold (#CFAE63, #FCD34D)
- **Background**: Transparent
- **Usage**: Navigation bar, footer
- **Status**: ✅ Placeholder created (replace with final brand logo)

### 2. Hero Image (hero.webp)
- **Format**: WebP (with JPG fallback)
- **Dimensions**: 1200×800px (3:2 aspect ratio)
- **File Size**: ≤200KB
- **Quality**: 85-90%
- **Content**: Showcase of Xanda jars on elegant surface
- **Composition**:
  - Main products in focus
  - Black matte background or dark surface
  - Natural lighting with gold accents
  - Premium, editorial photography style
- **Alt Text**: "Frascos de mermeladas y salsas gourmet Xanda sobre fondo elegante"
- **Usage**: Hero section (above the fold)
- **Loading**: Eager (fetchpriority="high")

### 3. Jamaica Product Image (jamaica.webp)
- **Format**: WebP
- **Dimensions**: 900×1125px (4:5 aspect ratio - portrait)
- **File Size**: ≤120KB
- **Quality**: 85%
- **Content**: Jamaica con chile pasilla jar
- **Composition**:
  - Single jar, centered
  - Clean white or black background
  - Show label clearly
  - Product photography style
  - Consistent lighting with other products
- **Alt Text**: "Mermelada gourmet Jamaica con chile pasilla de Xanda"
- **Usage**: Product collection section
- **Loading**: Lazy

### 4. Cebolla Product Image (cebolla.webp)
- **Format**: WebP
- **Dimensions**: 900×1125px (4:5 aspect ratio - portrait)
- **File Size**: ≤120KB
- **Quality**: 85%
- **Content**: Cebolla caramelizada con tocino ahumado jar
- **Composition**: Same as Jamaica product
- **Alt Text**: "Salsa gourmet de cebolla caramelizada con tocino ahumado de Xanda"
- **Usage**: Product collection section
- **Loading**: Lazy

### 5. Arándano Product Image (arandano.webp)
- **Format**: WebP
- **Dimensions**: 900×1125px (4:5 aspect ratio - portrait)
- **File Size**: ≤120KB
- **Quality**: 85%
- **Content**: Arándano con mezcal y sal de gusano jar
- **Composition**: Same as Jamaica product
- **Alt Text**: "Mermelada gourmet de arándano con mezcal y sal de gusano de Xanda"
- **Usage**: Product collection section
- **Loading**: Lazy

### 6. Gift Box Image (giftbox.webp)
- **Format**: WebP
- **Dimensions**: 1200×900px (4:3 aspect ratio - landscape)
- **File Size**: ≤150KB
- **Quality**: 85%
- **Content**: Premium black gift box with 3 Xanda jars
- **Composition**:
  - Box open showing jars inside
  - Premium presentation
  - Black matte box with gold logo
  - Lifestyle photography angle
- **Alt Text**: "Caja de regalo Xanda con 3 frascos de mermeladas y salsas gourmet"
- **Usage**: Gift edition section
- **Loading**: Lazy

## Image Style Guidelines

### Photography Style
- **Aesthetic**: Premium, editorial, minimalist
- **Lighting**: Soft, natural light with subtle shadows
- **Background**: Black matte, dark surfaces, or clean white
- **Props**: Minimal — focus on products
- **Angle**: Straight-on or slightly elevated for jars
- **Depth of Field**: Shallow DOF to emphasize product

### Color Palette
- **Primary**: Black matte (#0a0a0a)
- **Accent**: Gold (#CFAE63, #FCD34D)
- **Neutral**: Grays and natural tones
- **Avoid**: Bright, saturated colors that clash with brand

### Product Photography Checklist
- ✅ Consistent lighting across all product images
- ✅ Same background (or complementary)
- ✅ Labels clearly visible and legible
- ✅ No reflections or glare on glass
- ✅ Products centered and properly aligned
- ✅ High resolution (can be downscaled, but start big)
- ✅ Clean, dust-free products

## Image Optimization Process

### Step 1: Capture/Source
- Use professional camera or high-quality smartphone (iPhone 12+ recommended)
- Shoot in RAW format if possible for maximum editing flexibility
- Take multiple shots with different angles and lighting

### Step 2: Edit
- **Software**: Adobe Lightroom, Photoshop, or Capture One
- Adjust exposure, contrast, and white balance
- Enhance colors subtly (don't over-saturate)
- Remove any dust, scratches, or imperfections
- Crop to exact dimensions specified above
- Export at 2x resolution first (e.g., 2400×1600px for hero)

### Step 3: Compress
Use one or more of these tools:

**WebP Conversion:**
- [Squoosh](https://squoosh.app/) — Best for manual optimization
  - Settings: WebP, Quality 85%, Effort 6
  - Compare before/after to ensure quality
- [CloudConvert](https://cloudconvert.com/) — Batch conversion
- [ImageMagick](https://imagemagick.org/) — Command line

**Command Line (ImageMagick):**
```bash
# Convert JPG to WebP
magick convert input.jpg -quality 85 -define webp:method=6 output.webp

# Resize and convert
magick convert input.jpg -resize 1200x800 -quality 85 -define webp:method=6 hero.webp
```

**Online Tools:**
- [TinyPNG](https://tinypng.com/) — JPG/PNG compression
- [Compressor.io](https://compressor.io/) — Multiple formats

### Step 4: Verify
- File size meets requirements
- Visual quality is acceptable
- Dimensions are exact
- Format is correct
- Test on different devices/screens

## Placeholder Images

If you don't have final images yet, you can use these placeholder services:

### Option 1: Unsplash (Free, High-Quality)
Search for:
- "gourmet food jar"
- "artisan jam"
- "luxury food product"
- "gift box black"

Example:
```
https://source.unsplash.com/1200x800/?gourmet,food,jar
```

### Option 2: Pexels (Free)
- [Pexels Food Photography](https://www.pexels.com/search/gourmet%20food/)

### Option 3: Generate Solid Color Placeholders
```html
<!-- Temporary placeholder until real images are ready -->
<div style="width:1200px;height:800px;background:#262626;display:flex;align-items:center;justify-content:center;color:#CFAE63;font-size:24px;">
  Hero Image Placeholder
</div>
```

## Testing Images

After adding images, test on:
- ✅ Desktop (Chrome, Firefox, Safari, Edge)
- ✅ Mobile (iOS Safari, Chrome Mobile)
- ✅ Tablet (iPad, Android tablet)
- ✅ Slow 3G connection (Chrome DevTools)
- ✅ Different screen sizes (responsive)

## Performance Checklist

Before deploying:
- [ ] All images are WebP format
- [ ] All images meet file size requirements
- [ ] All images have descriptive alt text
- [ ] All images have width/height attributes
- [ ] Hero image has loading="eager" and fetchpriority="high"
- [ ] Other images have loading="lazy"
- [ ] Images look sharp on Retina displays
- [ ] No layout shift when images load (CLS)
- [ ] Images are properly compressed
- [ ] Lighthouse performance score ≥90

## Social Media Images

For best social media sharing:

### Open Graph Image (og:image)
- **Recommended**: 1200×630px
- **Format**: JPG or PNG
- **File Size**: ≤500KB
- **Content**: Brand + product showcase
- **Text**: Large, readable on small screens
- **Usage**: Facebook, LinkedIn previews

Currently using hero.webp — consider creating a dedicated OG image with:
- Xanda logo
- Tagline: "Sabores gourmet mexicanos"
- Best-selling product
- Gold accents

## Future Enhancements

### Additional Images to Consider
- **Lifestyle shots**: Products in use (on cheese board, with cocktails, etc.)
- **Ingredient close-ups**: Chile pasilla, jamaica flowers, cranberries
- **Process photos**: Behind-the-scenes artisan production
- **Team photos**: People behind Xanda
- **Customer photos**: User-generated content
- **Video**: Short product showcase (15-30 seconds)

### Image SEO
- Use descriptive file names: `xanda-jamaica-chile-pasilla-mermelada-gourmet.webp`
- Add images to sitemap.xml
- Consider image CDN for faster delivery
- Implement progressive image loading
- Add image schema markup for rich results

## Resources

### Stock Photography (if needed)
- [Unsplash](https://unsplash.com/) — Free, high-quality
- [Pexels](https://www.pexels.com/) — Free stock photos
- [Adobe Stock](https://stock.adobe.com/) — Premium (paid)

### Image Editing
- [Photopea](https://www.photopea.com/) — Free Photoshop alternative (browser)
- [GIMP](https://www.gimp.org/) — Free desktop editor
- [Canva](https://www.canva.com/) — Easy design tool

### Optimization Tools
- [Squoosh](https://squoosh.app/) — Best image compressor
- [ImageOptim](https://imageoptim.com/) — Mac app (free)
- [TinyPNG](https://tinypng.com/) — Online compressor
- [WebP Converter](https://cloudconvert.com/webp-converter) — Batch conversion

### Validation
- [Google PageSpeed Insights](https://pagespeed.web.dev/)
- [GT Metrix](https://gtmetrix.com/)
- [WebPageTest](https://www.webpagetest.org/)

---

**Questions?** Contact hola@xanda.mx
