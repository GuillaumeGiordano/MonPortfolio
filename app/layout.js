import "./globals.css";
import AuthProvider from "@/components/authprovider/Authprovider";
import { ThemeContextProvider } from "@/context/theme";
import { LoginModalContextProvider } from "@/context/loginForm";

import Footer from "@components/footer/page";
import LoginForm from "@components/elements/modal/page";
import Header from "@components/header/page";

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
