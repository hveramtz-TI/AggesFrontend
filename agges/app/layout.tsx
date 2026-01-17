import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-primary",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://agges.cl"),

  title: {
    default: "AGGES | Soluciones Innovadoras para tu Negocio",
    template: "%s | AGGES",
  },

  description:
    "En AGGES ofrecemos soluciones tecnológicas innovadoras, gestión de documentos y consultoría para potenciar el crecimiento de tu empresa.",

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    type: "website",
    locale: "es_CL",
    url: "https://agges.cl",
    siteName: "AGGES",
    title: "AGGES | Soluciones Innovadoras",
    description:
      "Soluciones tecnológicas y gestión eficiente para empresas.",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "AGGES Logo",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "AGGES | Soluciones Innovadoras",
    description:
      "Soluciones tecnológicas y gestión eficiente para empresas.",
    images: ["/logo.png"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#83CA4A",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={montserrat.variable} suppressHydrationWarning>
      <body className="antialiased font-primary">
        {children}
      </body>
    </html>
  );
}
