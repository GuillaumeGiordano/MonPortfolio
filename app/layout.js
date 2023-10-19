import "./globals.css";
import AuthProvider from "@/components/authprovider/Authprovider";
import { ThemeContextProvider } from "@/context/theme";
import { LoginModalContextProvider } from "@/context/loginForm";

import LoginForm from "@components/layout/modal/page";
import Header from "@components/layout/header/page";
import Footer from "@components/layout/footer/page";

export const metadata = {
  title: "Guillaume Giordano Développeur Web",
  description: "Je vous présente mon portfolio",
};

export default function RootLayout({ children }) {
  return (
    <html lang='fr'>
      <AuthProvider>
        <ThemeContextProvider>
          <LoginModalContextProvider>
            <body>
              <Header />
              <LoginForm />
              {children}
              <Footer />
            </body>
          </LoginModalContextProvider>
        </ThemeContextProvider>
      </AuthProvider>
    </html>
  );
}
