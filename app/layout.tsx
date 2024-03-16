import { ThemeProvider } from "@/components/theme-provider"
import { ClerkProvider } from '@clerk/nextjs'
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster} from "react-hot-toast";

import "./globals.css";
import { ModalProviders } from "@/providers/modal/modal-providers";
import { ConfettiProvider } from "@/providers/confetti/confetti-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LMS - E-learning platform",
  description: "An E-learning platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster />
            <ModalProviders />
            <ConfettiProvider />
          </ThemeProvider>
      </body>
      </html>
    </ClerkProvider>
  );
}
