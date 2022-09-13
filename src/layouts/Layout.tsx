import { Footer } from "src/layouts/Footer";
import { Header } from "src/layouts/Header";
import { CustomLayout } from "next";

export const Layout: CustomLayout = (props) => {
  return (
    <div className="body bg-slate-200">
      <Header />
      <main className="px-5 py-24">{props.children}</main>
      <Footer />
    </div>
  );
};
