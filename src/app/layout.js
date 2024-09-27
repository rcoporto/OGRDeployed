import "./globals.css";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  weight: ["300", "400", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata = {
  title: "Ocular Genetic Registry",
  description: "Welcome to the Ocular Genetic Registry",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.variable}>
        {children}
      </body>
    </html>
  );
}
