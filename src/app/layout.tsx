import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Providers } from "@/components/providers/Providers";
import { getCurrentUser } from "@/lib/session";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PetCare - Agendamento Online",
  description: "Agende banho, tosa e consultas para seu pet",
  icons: {
    icon: '/assets/logo/innerlogo.png',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getCurrentUser();

  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <Providers initialUser={user}>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
