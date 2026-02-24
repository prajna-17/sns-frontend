import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function SiteLayout({ children }) {
  return (
    <>
      <div className="p-3">
        <Header />
        {children}
      </div>
      <Footer />
    </>
  );
}
