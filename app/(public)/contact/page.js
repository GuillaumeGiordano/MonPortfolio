"use client";
import { useThemeContext } from "@/app/context/theme";

export default function contact() {
  const { isLightTheme } = useThemeContext();
  return (
    <main className={`${isLightTheme ? "dark" : "light"}`}>
      <section className='section' id=''>
        <h2>Contact</h2>
      </section>
    </main>
  );
}
