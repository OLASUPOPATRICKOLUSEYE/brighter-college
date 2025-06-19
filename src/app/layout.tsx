import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pascal College Management System",
  description: "Designed and Developed By: ZachPascal Global Tech",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
         <Toaster
          position="bottom-right"
          toastOptions={{
            success: {
              style: {
                background: '#4ade80', // green-400
                color: '#fff',
              },
            },
            error: {
              style: {
                background: '#f87171', // red-400
                color: '#fff',
              },
            },
          }}
        />
      </body>
    </html>
  );
}
