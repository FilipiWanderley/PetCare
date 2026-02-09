import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Providers } from '@/components/providers/Providers';
import { getCurrentUser } from '@/lib/session';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    template: '%s | PetCare',
    default: 'PetCare - Cuidado e Carinho para seu Pet',
  },
  description:
    'Agende banho, tosa e consultas veterinárias online. Profissionais qualificados e ambiente seguro para seu melhor amigo.',
  keywords: ['pet shop', 'banho e tosa', 'veterinário', 'agendamento online', 'cachorro', 'gato'],
  authors: [{ name: 'PetCare Team' }],
  creator: 'PetCare',
  icons: {
    icon: '/assets/logo/innerlogo.png',
    apple: '/assets/logo/innerlogo.png',
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://petcare.com.br',
    title: 'PetCare - O Melhor para seu Amigo',
    description: 'Agende serviços de estética e saúde animal com facilidade.',
    siteName: 'PetCare',
    images: [
      {
        url: '/assets/images/hero-pets.jpg',
        width: 1200,
        height: 630,
        alt: 'PetCare Hero Image',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PetCare - Agendamento Online',
    description: 'Cuidado completo para seu pet a um clique de distância.',
    images: ['/assets/images/hero-pets.jpg'],
  },
  robots: {
    index: true,
    follow: true,
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
