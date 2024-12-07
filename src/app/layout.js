import "./globals.css";
import { poppins, lora } from "./fonts/font";
import { AuthProvider } from "./context/authContext"; // Import the AuthProvider

export const metadata = {
  title: "National Ocular Genetic Registry",
  description: "National Ocular Genetic Registry Website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins} ${lora}`}>
        <AuthProvider> {/* Wrap AuthProvider around the children */}
          {children}
        </AuthProvider>
        {/* <script src="../path/to/flowbite/dist/flowbite.min.js"></script> */}
      </body>
    </html>
  );
}
