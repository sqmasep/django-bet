import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "~/layouts/Navbar";
import { cn } from "~/lib/utils";
import ReactQueryProvider from "~/components/ReactQueryProvider";
import AuthProvider from "~/features/auth/contexts/AuthProvider";

const dmSans = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="min-h-full">
      <body className={cn(dmSans.className, "min-h-full pb-24")}>
        <ReactQueryProvider>
          <AuthProvider>
            <Navbar />
            {children}
          </AuthProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
