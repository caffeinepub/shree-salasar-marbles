# Shree Salasar Marbles

## Current State
The project has a backend (empty actor), all shadcn UI components, fonts, and generated images (hero marble, product marble/granite/tiles), but App.tsx is missing -- the frontend was never completed, causing a deployment error.

## Requested Changes (Diff)

### Add
- App.tsx with full single-page website for Shree Salasar Marbles
- Navbar with logo and smooth anchor navigation
- Hero section: full-width marble background image, business name in English + Hindi, tagline, CTA buttons (Call, WhatsApp)
- About section: business description, rating (4.8★, 69 reviews), location
- Products section: 3 product cards (Marble, Granite, Tiles) with generated images
- Reviews carousel: 4 real customer reviews in card slider
- Why Choose Us section: key differentiators as icon cards
- Location section: embedded Google Map for the business address
- Contact section: phone, WhatsApp link, contact form
- Floating WhatsApp button (fixed bottom-right)
- Footer with business info and links
- Smooth scroll behavior, hover animations

### Modify
- index.css: ensure premium font setup and smooth scrolling

### Remove
- Nothing (no existing UI to remove)

## Implementation Plan
1. Create App.tsx with all sections as listed above
2. Use generated images from /assets/generated/ for hero and products
3. Use PlayfairDisplay font for headings (luxury feel), GeneralSans for body
4. Color palette: white, warm grey, dark charcoal, gold accent
5. Glassmorphism cards for reviews and product sections
6. Embedded Google Maps iframe for R9WG+RX Chhatrapati Sambhajinagar
7. WhatsApp link: https://wa.me/918668216976
8. Phone: +91 8668216976
9. No AI branding anywhere
