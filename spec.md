# AE & Associates Law and Migration

## Current State
New project — no existing application files.

## Requested Changes (Diff)

### Add
- Full luxury law firm marketing website with 9 sections + floating CTA
- Contact form that stores submissions in the backend
- All sections: Navbar, Hero, Positioning, Services, Testimonials, Authority, Contact, Final CTA, Footer

### Modify
- N/A

### Remove
- N/A

## Implementation Plan

### Backend
- Store contact form submissions (name, email, phone, matter description, timestamp)
- Query submissions (for admin use)

### Frontend
- Sticky navbar: transparent → solid dark on scroll, gold serif logo, nav links, Book Consultation CTA
- Hero: full-viewport dark gradient, large serif headline, two CTA buttons, animated gold divider
- Positioning: OUR APPROACH label, headline, body copy, 3-stat bar with gold numbers
- Services: 5 premium dark navy cards with gold accents, hover effects
- Testimonials: dark bg, 5-star rating display, 3 testimonial cards
- Authority: WHY CHOOSE US list with gold checkmarks
- Contact: form + contact details, stores to backend
- Final CTA: full-width dark with gold gradient
- Footer: dark bg, logo, links, contact, copyright
- Floating gold pulse button bottom-right
- Scroll-triggered fade-in animations via Intersection Observer
- Google Fonts: Playfair Display + Inter
- Mobile-first responsive
