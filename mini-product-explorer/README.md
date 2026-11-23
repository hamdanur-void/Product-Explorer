# Mini Product Explorer

A beginner-friendly React + Vite application that fetches product data from the Fake Store API.

## Features

- Fetches products from a free public API
- Displays product images, titles, prices, and ratings
- Search products by title
- Add and remove favorite products
- Saves favorites in browser `localStorage`
- Loading and error messages
- Responsive layout

## Technologies

- React
- Vite
- JavaScript
- CSS
- Fake Store API: https://fakestoreapi.com/products

## Run locally

Make sure Node.js is installed.

```bash
npm install
npm run dev
```

Open the local address shown in your terminal, usually http://localhost:5173.

## Create a production build

```bash
npm run build
```

## Project structure

```text
mini-product-explorer/
├── index.html
├── package.json
├── README.md
├── .gitignore
└── src/
    ├── App.jsx
    ├── App.css
    ├── index.css
    └── main.jsx
```

## How it works

The app uses `fetch()` inside `useEffect()` to request products from the Fake Store API. React state stores the products, loading status, error message, search text, and favorites. The `filter()` method handles searching and filtering, while `localStorage` keeps favorite product IDs in the browser.

## Note

An internet connection is required to load products from the API.
