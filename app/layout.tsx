import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FitWithPalak | Clinical Functional Nutrition",
  description:
    "For women whose reports come back normal while their body clearly is not. Book a 30-minute clinical assessment with Palak.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,500;0,600;1,500;1,600&family=Inter+Tight:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="/palak.css" />
      </head>
      <body>{children}</body>
    </html>
  );
}
