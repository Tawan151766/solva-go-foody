# Solva Go Foody

Online Food Ordering Application built with Next.js, React, and Tailwind CSS

## Main Features
- Search restaurants by name, location, category, and cuisine (nationality)
- filtering with debounce
- View restaurant details, menus
- Cart system and order placement
- Search order by encoded (base64) order ID
- Modern UI/UX, fully responsive for mobile and desktop
- Beautiful loading spinner on all loading screens

## Technologies
- Next.js 14 (App Router)
- React 18
- Tailwind CSS
- Context API (Global State)
- React Icons

## Getting Started
1. Install dependencies
   ```bash
   npm install
   # or
   yarn install
   ```
2. Create a `.env` file and set your API URL:
   ```env
   NEXT_PUBLIC_API_URL=https://your-api-url
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your-google-maps-key
   ```
3. Run the app
   ```bash
   npm run dev
   # or
   yarn dev
   ```

## Project Structure
- `src/app/` — Main pages, order, store
- `src/components/` — UI Components (CardStore, LoadingSpinner, Navbar, etc.)
- `src/context/` — Context API (FilterContext, CartContext)

## Developer
- Tawan-
