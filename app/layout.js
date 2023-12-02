import "bootstrap-icons/font/bootstrap-icons.css";
import NavBar from "../components/NavBar";
import "./globals.css";

export const metadata = {
  title: "Admin Dashboard",
  description: "Dashboard Interface for admins.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <NavBar />
        {children}
      </body>
    </html>
  );
}
