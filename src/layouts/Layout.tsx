import { Footer } from "src/layouts/Footer";
import { Header } from "src/layouts/Header";
import { CustomLayout } from "next";
import Head from "next/head";

export const Layout: CustomLayout = (props) => {
  return (
    <>
      <Head>
        <title>XRP Ledger Wallet</title>
        <meta
          name="description"
          content="This is a wallet that trades XRP on XRP Ledger."
        ></meta>
        <link rel="shortcut icon" href="/static/favicon.ico" />
      </Head>
      <div className="body bg-slate-200">
        <Header />
        <main className="px-5 py-24">{props.children}</main>
        <Footer />
      </div>
    </>
  );
};
