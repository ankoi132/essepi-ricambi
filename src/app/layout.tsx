import type { Metadata } from 'next';
import './globals.css';
import { StoreProvider } from '@/lib/store';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import VehicleSelectorModal from '@/components/VehicleSelectorModal';
import CookieBanner from '@/components/CookieBanner';

export const metadata: Metadata = {
  title: 'Essepi Ricambi | Negozio Online Ricambi Auto Originali & Aftermarket',
  description: 'Vetrina ufficiale Essepi Ricambi. Oltre 4.400 ricambi per auto e moto: pastiglie freno, kit distribuzione, fanali, cuscinetti e ricambi new old stock. Spedizione 24/48h con BRT/GLS.',
  keywords: [
    'ricambi auto', 
    'ricambi originali', 
    'essepi ricambi', 
    'codice oem', 
    'freni', 
    'distribuzione auto', 
    'pastiglie freno', 
    'new old stock ricambi', 
    'ebay essepiricambi'
  ],
  authors: [{ name: 'Essepi Ricambi' }],
  metadataBase: new URL('https://essepiricambi.it'),
  openGraph: {
    title: 'Essepi Ricambi | Ricambi Auto Originali & Aftermarket al Miglior Prezzo',
    description: 'Vetrina premium per ricambi auto. Oltre 4.400 articoli in pronta consegna con garanzia 24 mesi e fatturazione italiana.',
    url: 'https://essepiricambi.it',
    siteName: 'Essepi Ricambi',
    locale: 'it_IT',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" className="dark">
      <body className="min-h-screen flex flex-col bg-[#0b0f19] text-slate-100 antialiased selection:bg-orange-500 selection:text-white">
        <StoreProvider>
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
          <CartDrawer />
          <VehicleSelectorModal />
          <CookieBanner />
        </StoreProvider>
      </body>
    </html>
  );
}
