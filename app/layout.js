import "./globals.css";
import ParentHeader from "@/app/components/parentHeader/ParentHeader";
import Footer from "./components/footer/Footer";
// import store from "@/app/redux/store";
// import { Provider } from "react-redux";
import CustomProvider from "@/app/redux/provider";
export const metadata = {
  title: "Shoe Store | Ahmad Imran",
  description: "Demo website developed by Ahmad Imran for displaying in portfolio",
};

export default function RootLayout({ children }) {
  return (
    <CustomProvider>
      <html lang="en">
        <head></head>
        <body>
          <ParentHeader />
          {children}
          <Footer />
        </body>
      </html>
    </CustomProvider>
  );
}
