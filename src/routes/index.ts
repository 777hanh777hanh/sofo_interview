import { createBrowserRouter } from "react-router";
import React, { lazy } from "react";

// import lazy components
const HomePage = lazy(() => import("@/pages/HomePage"));
const AboutPage = lazy(() => import("@/pages/AboutPage"));
const NotFoundPage = lazy(() => import("@/pages/NotFoundPage"));

// Navigation history stack
export const navigationHistory: string[] = ["/"];

// Create a function to track navigation
export const trackNavigation = (path: string) => {
  // Don't add duplicate consecutive entries
  if (navigationHistory[navigationHistory.length - 1] !== path) {
    navigationHistory.push(path);
  }
};

// goBack function that navigates to previous page or home if no history
export const goBack = () => {
  // Remove current page
  navigationHistory.pop();

  // If history is empty or has only home page, go to home
  if (navigationHistory.length <= 1) {
    return "/";
  }

  // Return the previous page
  return navigationHistory[navigationHistory.length - 1];
};

const router = createBrowserRouter([
  {
    path: "/",
    element: React.createElement(HomePage),
    loader: () => {
      trackNavigation("/");
      return null;
    },
  },
  {
    path: "/about",
    element: React.createElement(AboutPage),
    loader: () => {
      trackNavigation("/about");
      return null;
    },
  },
  {
    path: "*",
    element: React.createElement(NotFoundPage),
    loader: ({ request }: { request: Request }) => {
      const path = new URL(request.url).pathname;
      trackNavigation(path);
      return null;
    },
  },
]);

export default router;
