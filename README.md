# Aruna Flow - Yoga Studio Website

A modern, fully responsive yoga studio website built with React, TypeScript, and TailwindCSS. Features include multi-language support (Ukrainian/English), animated UI components, booking forms with Telegram integration, and a complete schedule management system.

## Features

- **Multi-page Application**: Home, Schedule, About, and Contacts pages
- **Bilingual**: Ukrainian and English language support with easy switching
- **Responsive Design**: Mobile-first approach with adaptive layouts for all screen sizes
- **Smooth Animations**: fadeIn, scaleIn animations with intersection observers
- **Telegram Integration**: All forms send notifications directly to Telegram
- **Interactive Schedule**: Filterable class schedule with booking functionality
- **Contact Forms**:
  - Main booking form
  - Callback request form
  - Newsletter subscription
  - Live mini-chat with admin
- **Google Maps Integration**: Embedded map with studio location
- **SEO Optimized**: Proper meta tags and semantic HTML

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **TailwindCSS** - Styling
- **Lucide React** - Icons
- **Vercel Functions** / **Netlify Functions** - Serverless API for Telegram

## Getting Started

### Prerequisites

- Node.js 16+ and npm

### Installation

```bash
# Install dependencies
npm install

# Run development server (frontend only, mock Telegram)
npm run dev

# Run API server for Telegram (in separate terminal)
npm run dev:api

# Build for production
npm run build

# Type checking
npm run typecheck
```

### Development Mode

For full functionality with real Telegram integration in development:

1. **Terminal 1** - Run API server:
   ```bash
   npm run dev:api
   ```
   This starts Express server on http://localhost:3001

2. **Terminal 2** - Run Vite dev server:
   ```bash
   npm run dev
   ```
   This starts frontend on http://localhost:5173

Now all forms will send real messages to Telegram!

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import the project in Vercel
3. Deploy - Vercel will automatically detect the configuration

The site is configured with `vercel.json` for proper routing and CORS headers.

### Deploy to Netlify

1. Push your code to GitHub
2. Import the project in Netlify
3. Deploy - Netlify will use the `netlify.toml` configuration

Both platforms support the serverless function at `/api/send-telegram.ts` out of the box.

## Telegram Bot Configuration

The Telegram bot is pre-configured with:
- Bot Token: `8149651558:AAEcCMGUzcEDULbcGHbk0lCMhk_S51GUBJo`
- Chat ID: `8149651558`

All form submissions (booking, callback, newsletter, chat) will send formatted messages to the configured Telegram chat.

**Note:** In development mode (`npm run dev`), forms will work in mock mode and log data to console instead of sending to Telegram. Real Telegram integration works only in production (Vercel/Netlify).

## Project Structure

```
src/
├── components/        # Reusable components (Header, MobileNav)
├── context/          # React context (LanguageContext)
├── hooks/            # Custom hooks (useScrollAnimation)
├── i18n/             # Translations (UK/EN)
├── pages/            # Page components (Home, Schedule, About, Contacts)
├── App.tsx           # Main app component with routing
├── index.css         # Global styles and animations
└── main.tsx          # Entry point

api/
└── send-telegram.ts  # Serverless function for Telegram integration

public/
└── aruna logo.png    # Studio logo
```

## Features Breakdown

### Home Page
- Hero section with call-to-action
- Benefits showcase (4 cards)
- Student testimonials (3 cards)
- Smooth scroll to booking form

### Schedule Page
- Filterable class list (All, Yoga, Meditation, Stretching)
- 14 weekly classes with details
- Direct booking from each class
- Responsive card layout

### About Page
- Studio philosophy section
- Team presentation (3 instructors)
- Core values showcase
- Image galleries with hover effects

### Contacts Page
- Main booking form with validation
- Contact information cards
- Callback request form
- Newsletter subscription
- Mini-chat interface
- Google Maps integration

## Customization

### Colors
The design uses a warm, calming color palette:
- Primary: Amber (amber-400 to amber-600)
- Accent: Rose (rose-50 to rose-300)
- Neutral: Stone (stone-50 to stone-800)

### Fonts
- Headings: Playfair Display (serif)
- Body: Inter (sans-serif)

### Animations
Custom animations defined in `index.css`:
- `fadeIn` - Fade in with upward motion
- `scaleIn` - Scale up from center
- `slideInLeft` - Slide from left
- `slideInRight` - Slide from right

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## License

This project is created for Aruna Flow Yoga Studio.

## Contact

For questions or support, contact the Aruna Flow team through the website forms or Telegram.
