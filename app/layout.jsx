import "./globals.css";
import { font } from '@/app/ui/fonts';


export default function RootLayout({children}) {
  return (
    <html lang="en">
      <body className={`${font.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
