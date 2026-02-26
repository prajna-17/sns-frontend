import { Poppins } from "next/font/google";
import Providers from "@/components/Providers";
import "./globals.css";
import CartInitializer from "@/components/CartInitializer";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata = {
  title: "SNS",
  description: "Electronics and Furniture website for business in next js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} antialiased`}
        suppressHydrationWarning
      >
        <Providers>
          <CartInitializer />
          {children}
        </Providers>{" "}
      </body>
    </html>
  );
}
