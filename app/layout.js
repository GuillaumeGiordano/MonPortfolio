import "./globals.css";
import { ThemeContextProvider } from "@/context/theme";
import { LoginModalContextProvider } from "@/context/loginForm";
import { AuthProvider } from "./providers";

import LoginForm from "@components/layout/modal/page";
import Header from "@components/layout/header/page";
import Footer from "@components/layout/footer/page";

export const metadata = {
  title: "Guillaume Giordano Développeur Web",
  description: "Je vous présente mon portfolio",
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

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
