"use client";
import { useThemeContext } from "@/app/context/theme";

export default function CV() {
  const { isLightTheme } = useThemeContext();
  return (
    <main className={`${isLightTheme ? "dark" : "light"}`}>
      <section className='section' id=''>
        <h2>Mon CV</h2>
      </section>
    </main>
  );
}
