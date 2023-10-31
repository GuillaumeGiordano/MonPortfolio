import "./globals.css";
import { ThemeContextProvider } from "@/context/theme";
import { LoginModalContextProvider } from "@/context/loginForm";
import { AuthProvider } from "./providers";

import Header from "@components/layout/header/page";
import Footer from "@components/layout/footer/page";

export const metadata = {
  title: "Guillaume Giordano - Développeur Web Freelance",
  description:
    "Découvrez mon portfolio de développement web. Expert en création de sites web modernes et performants.",
  author: "Guillaume Giordano",
  url: "https://www.guillaumegiordano.com",
  keywords:
    "développeur web, portfolio, sites web, développement web, application web, expert web, freelance web, JavaScript, Next.js, React, Node.js",
  siteName: "Guillaume Giordano Développeur Web",
  twitterUsername: "@votreTwitter",
};

// export const dynamic = "force-dynamic";
// export const revalidate = 0;

export default function RootLayout({ children }) {
  return (
    <html lang='fr'>
      <ThemeContextProvider>
        <LoginModalContextProvider>
          <AuthProvider>
            <body>
              <Header />
              {children}
              <Footer />
            </body>
          </AuthProvider>
        </LoginModalContextProvider>
      </ThemeContextProvider>
    </html>
  );
}
