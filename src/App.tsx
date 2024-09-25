import { Outlet } from "react-router-dom";
import Footer from "./components/home/Footer";
import Header from "./components/home/Header";
import { ThemeProvider } from "./components/providers/ThemeProvider";
import { Toaster } from "sonner";

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="flex flex-col min-h-screen">
        <Toaster richColors />
        <Header />
        <main className="container grow">
          <Outlet />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
