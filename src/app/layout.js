import "./globals.css";
import { poppins, lora } from "./fonts/font";
// import { Poppins, Lora } from "next/font/google";

// const poppins_init = Poppins({
//   weight: ["300", "400", "600", "700"],
//   subsets: ["latin"],
//   variable: "--font-poppins",
// });

export const metadata = {
  title: "National Ocular Genetic Registry",
  description: "National Ocular Genetic Registry Website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* <body className={poppins.variable}> */}
      <body className={`${poppins} ${lora}`}>
        {children}
      </body>
    </html>
  );
}
