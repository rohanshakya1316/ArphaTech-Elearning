import { ToastContainer } from "react-toastify";
import "./globals.css";
import ProtectedRoute from "@/components/ProtectedRoute";
import NavBar from "@/components/NavBar";
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
      <body className="min-h-full flex flex-col bg-[#f2f2f7]">
        <NavBar />
        <ProtectedRoute>{children}</ProtectedRoute>
        <ToastContainer position="top-right" autoClose={1500} />
      </body>
    </html>
  );
}
