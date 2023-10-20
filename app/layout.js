import "./globals.css";
import { ThemeContextProvider } from "@/context/theme";
import { LoginModalContextProvider } from "@/context/loginForm";

import LoginForm from "@components/layout/modal/page";
import Header from "@components/layout/header/page";
import Footer from "@components/layout/footer/page";
import { AuthProvider } from "./providers";

export const metadata = {
  title: "Guillaume Giordano Développeur Web",
  description: "Je vous présente mon portfolio",
};

export default function RootLayout({ children }) {
  return (
    <html lang='fr'>
      <ThemeContextProvider>
        <LoginModalContextProvider>
          <AuthProvider>
            <body>
              <Header />
              <LoginForm />
              {children}
              <Footer />
            </body>
          </AuthProvider>
        </LoginModalContextProvider>
      </ThemeContextProvider>
    </html>
  );
}
