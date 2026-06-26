import type {Metadata} from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css'; // Global styles

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
});

export const metadata: Metadata = {
  title: 'NEXUS - Knowledge Interconnected Ecosystem',
  description: 'Pahami keterkaitan seluruh pengetahuan dunia dalam ekosistem belajar interaktif.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="id" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body suppressHydrationWarning className="bg-[#0a0e1a] text-[#f1f5f9] font-sans overflow-x-hidden min-h-screen selection:bg-[#00d4ff]/30 selection:text-[#00d4ff]">
        {children}
      </body>
    </html>
  );
}
