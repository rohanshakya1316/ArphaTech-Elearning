import "./globals.css";
export const metadata = {
  title: {
    default: "E-Learning",
    template: "%s | E-Learning",
  },
  description: "Powered By ArphaTech Solution",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
