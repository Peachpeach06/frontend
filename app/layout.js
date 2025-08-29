import { Poppins, Prompt } from "next/font/google";
import "./globals.css";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";

// โหลด Poppins
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

// โหลด Prompt
const prompt = Prompt({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata = {
  title: "Peachy - Modern UI",
  description: "Frontend with Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html>
      {/* ใช้ className ของ font โดยตรง */}
      <body className={`${poppins.className} ${prompt.className} antialiased`}>
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  );
}
