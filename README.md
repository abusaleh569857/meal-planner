# 🥗 Foodie Zone - Smart Recipe Meal Planner

An interactive **Single Page Application (SPA)** built with **React** that allows users to browse recipes, plan their weekly meals, and automatically generate a shopping list based on their plan.

---

## 🚀 Setup & Run

Follow these steps to get the project up and running on your local machine.

### 1. Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16.0.0 or higher recommended)
- **npm** or **yarn** package manager

### 2. Installation Steps

Clone the repository and install dependencies:

```bash
# Clone the repository
git clone https://github.com/abusaleh569857/meal-planner.git

# Navigate into the project directory
cd meal-planner

# Install dependencies
npm install
```

### 3. Environment Variables

This project uses **TheMealDB** public API. No API key is required for the standard features.

### 4. How to Run the Project

Start the development server:

```bash
npm run dev
# OR
npm start
```

Open [http://localhost:5173](http://localhost:5173) (or the port shown in your terminal) to view it in the browser.

## 🏗️ Architecture Overview

### 1. Folder Structure

The project follows a modular, component-based architecture for better scalability and organization:

- **`/src/components`**: Reusable UI components used within pages (e.g., `RecipeCard`, `SearchBar`, `MealPlanModal`, `LoadingSpinner`, `RecipeList`).
- **`/src/shared`**: Global components shared across the entire application layout (e.g., `NavBar`, `Footer`).
- **`/src/pages`**: Main views corresponding to routes (e.g., `HomePage`, `RecipeDetails`, `WeeklyMealPlan`, `ShoppingList`, `ErrorPage`).
- **`/src/context`**: Context API setup for global state management (`MealPlanContext`).
- **`/src/hooks`**: Custom hooks for business logic and data fetching (`useMealPlan`, `useRecipes`, `useRecipeDetails`, `useCategory`).
- **`/src/utils`**: Helper functions and data processing logic (e.g., `ParseMeal`, `DataHandler`).
- **`/src/MainLayout`**: Contains the root layout wrapper (`Root.jsx`).
- **`/src/route`**: Application routing configuration (`Route.jsx`).

### 2. State Management Approach

I used **React Context API** (`MealPlanContext`) combined with `useReducer`.

- **Why?** To avoid "prop-drilling" and effectively manage the global state of the **Weekly Meal Plan**. Actions like `ADD_MEAL`, `REMOVE_MEAL`, `CLEAR_DAY_MEALS`, and `CLEAR_WEEK` need to be accessible from multiple components (Modal, Plan Page, Shopping List).

### 3. Custom Hooks

- **`useRecipes`**: Manages the fetching logic for recipe search results based on user queries or categories.
- **`useRecipeDetails`**: Fetches and manages the loading/error state for a specific recipe's details, keeping the UI component clean.
- **`useMealPlan`**: A wrapper around the Context to provide easy access to the `state` and `dispatch` functions throughout the app.
- **`useCategory`**: Fetches and caches recipe categories for the homepage search bar.

---

## 🛠️ Technical Decisions

### 1. Libraries & Patterns

- **Tailwind CSS3**: For rapid, utility-first styling and easy mobile responsiveness.
- **SweetAlert2**: To replace default browser alerts with professional, customizable, and animated pop-ups (e.g., confirmation before clearing meal plans).
- **React Router DOM**: For seamless client-side navigation without page reloads.
- **Local Storage**: Used to persist the **Meal Plan** and **Shopping List Status** so users don't lose data on refresh.

### 2. Trade-offs Made

- **No Backend Database**: Used `localStorage` for data persistence.
  - _Trade-off:_ Data is limited to the user's specific browser/device.
- **External API Limits**: Relies on TheMealDB public tier.
  - _Trade-off:_ Some advanced filtering (like multi-ingredient search) is limited by the API capabilities.

### 3. Future Improvements

- Implement **Drag-and-Drop** functionality for the Meal Planner.
- Add **User Authentication** (Firebase/Auth0) to save plans across devices.
- Add **Unit Testing** (Jest/Vitest) for critical logic like the Shopping List generator.

## ⏱️ Time Breakdown

| Task                           | Time Spent    |
| :----------------------------- | :------------ |
| **Setup & Folder Structure**   | 2 hours       |
| **Custom Hooks & API Logic**   | 5 hours       |
| **State Management (Context)** | 5 hours       |
| **UI Components & Styling**    | 12 hours      |
| **Shopping List Logic**        | 8 hours       |
| **Testing, Fixes & Polish**    | 4 hours       |
| **Total**                      | **~36 Hours** |

## 🧩 Challenges Faced

### 1. Synchronizing Shopping List Status

- **Problem:** When the meal plan changed (e.g., a meal was removed), re-generating the shopping list would reset the "Purchased" checkboxes for existing items.
- **Solution:** I implemented a logic in `ShoppingList.jsx` that saves only the **status** (`{ "Egg": true }`) in LocalStorage. When generating the list from the API, the code merges the fresh ingredients with the saved status map.

### 2. Scroll Position on Navigation

- **Problem:** When clicking on a recipe from the footer or bottom of the page, the new page would load scrolled to the bottom.
- **Solution:** Added a `useEffect` hook with `window.scrollTo(0, 0)` in the `RecipeDetails` component to ensure every page load starts at the top.

### 3. Formatting API Instructions

- **Problem:** The API returned instructions as a huge block of text with inconsistent newlines.
- **Solution:** Used Regex in the `RecipeDetails` page to split the text by newlines (`\r\n`) and filter out empty strings to render clean, readable steps.

## 📸 Screenshots

### 1. Recipe Search & Browse

![Recipe Search](./screenshots/recipe-search.png)

### 2. Recipe Details View

![Recipe Details](./screenshots/recipe-details.png)

### 3. Weekly Meal Plan

![Weekly Meal Plan](./screenshots/meal-plan.png)

### 4. Smart Shopping List

![Shopping List](./screenshots/shopping-list.png)

### 5. Mobile Responsive View

![Mobile View](./screenshots/mobile-view.png)

---

**Developed by [Abusaleh Alam Khan](https://github.com/abusaleh569857)**
