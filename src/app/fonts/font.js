import { Poppins, Lora } from "next/font/google";

const poppins_init = Poppins({
    weight: ["300", "400", "600", "700"],
    subsets: ["latin"],
    variable: "--font-poppins",
  });

  const lora_init = Lora({
    weight: ["400", "500", "600", "700"],
    subsets: ["latin"],
    variable: "--font-lora",
  });
  
  export const poppins = poppins_init.variable;
  export const lora = lora_init.variable;