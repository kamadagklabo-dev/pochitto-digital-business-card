import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "鎌田エリ子 | ぽちっと電子名刺",
  description: "現場の「困った」を、仕組みで解決。かまだWorks 鎌田エリ子の電子名刺です。",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ja"><body>{children}</body></html>;
}
