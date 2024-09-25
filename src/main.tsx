import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.tsx";
import ErrorBoundary from "./ErrorBoundary.tsx";
import { V1IsLogin, V1Protected } from "./V1Protected.tsx";
import V1Login from "./pages/auth/V1Login.tsx";
import V1Register from "./pages/auth/V1Register.tsx";
import V1Me from "./pages/me/V1Me.tsx";
import V1TagCreate from "./pages/v1-tag/V1TagCreate.tsx";
import V1TagUpdate from "./pages/v1-tag/V1TagUpdate.tsx";
import V1CategoryCreate from "./pages/v1-category/V1CategoryCreate.tsx";
import V1CategoryUpdate from "./pages/v1-category/V1CategoryUpdate.tsx";
import V1Tag from "./pages/v1-tag/V1Tag.tsx";
import V1Category from "./pages/v1-category/V1Category.tsx";
import V1Product from "./pages/v1-product/V1Product.tsx";
import V1ProductCreate from "./pages/v1-product/V1ProductCreate.tsx";
import V1ProductUpdate from "./pages/v1-product/V1ProductUpdate.tsx";
import V1User from "./pages/v1-user/V1User.tsx";
import V1UserUpdate from "./pages/v1-user/V1UserUpdate.tsx";
import { ThemeProvider } from "./components/providers/ThemeProvider.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} errorElement={<ErrorBoundary />}>
      <Route index element={<Home />} />
      <Route path="me" element={<V1Me />} />
      <Route element={<V1IsLogin />}>
        <Route path="login" element={<V1Login />} />
        <Route path="register" element={<V1Register />} />
      </Route>
      <Route path="product" element={<V1Product />} />
      <Route path="category" element={<V1Category />} />
      <Route path="tag" element={<V1Tag />} />

      <Route element={<V1Protected />}>
        <Route path="user" element={<V1User />} />
        <Route path="user-update/:id" element={<V1UserUpdate />} />
        <Route path="product-create" element={<V1ProductCreate />} />
        <Route path="product-update/:id" element={<V1ProductUpdate />} />
        <Route path="category-create" element={<V1CategoryCreate />} />
        <Route path="category-update/:id" element={<V1CategoryUpdate />} />
        <Route path="tag-create" element={<V1TagCreate />} />
        <Route path="tag-update/:id" element={<V1TagUpdate />} />
      </Route>
    </Route>
  )
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>
);
