## Jest and Babel (for Testing Only)

If you encounter errors about JSX or Babel when running Jest tests, you may need to add a minimal `babel.config.js` file for test compatibility:

```js
// babel.config.js (for Jest only, do NOT commit for production Next.js build)
module.exports = {
  presets: ["next/babel"],
};
```

> ⚠️ Only use this file locally for testing. Delete or ignore it before building or deploying with Next.js to avoid SWC conflicts.
## Testing with Jest

This project uses [Jest](https://jestjs.io/) and [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) for unit and component testing.

### Running Tests

To run all tests:

```bash
npm test
```

Test files are located in `src/__tests__/` and use the `.test.js` extension.

### Example Test

See `src/__tests__/store-detail.test.js` for a sample component test:

```js
import { render, screen } from '@testing-library/react';
import StoreDetail from '@/components/Stroe/Detail/StoreDetail';

it('renders store details', () => {
  render(<StoreDetail store={mockStore} />);
  expect(screen.getByText('Test Store')).toBeInTheDocument();
});
```

### Notes
- JSDOM is used as the test environment.
- Some browser APIs (like `window.matchMedia`) are mocked in test files as needed.
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
