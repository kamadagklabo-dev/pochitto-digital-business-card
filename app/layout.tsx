import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "かまだえりこ | ぽちっと電子名刺",
  description: "現場の「困った」を、仕組みでやさしく。KAMADA WORKS かまだえりこの電子名刺です。",
  openGraph: {
    title: "かまだえりこ | ぽちっと電子名刺",
    description: "現場の「困った」を、仕組みでやさしく。",
    type: "website",
    locale: "ja_JP",
    images: [{ url: "/og.png", width: 1536, height: 1024, alt: "KAMADA WORKS かまだえりこの電子名刺" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "かまだえりこ | ぽちっと電子名刺",
    description: "現場の「困った」を、仕組みでやさしく。",
    images: ["/og.png"],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
