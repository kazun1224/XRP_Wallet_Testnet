import Link from "next/link";
import { FC } from "react";
import { pagesPath } from "src/utils/$path";

export const Header: FC = () => {
  return (
    <header className=" bg-sky-800">
      <div className="container mx-auto flex flex-col flex-wrap items-center justify-between p-5 md:flex-row">
        <h1 className="font-bold text-white">XRP Ledger Wallet</h1>
        <div className="flex">
        <Link href={pagesPath.$url()}>
          <a className="block rounded border-0 bg-sky-500 py-2 px-6 text-lg text-white hover:bg-sky-600 focus:outline-none mr-5">
            ホームに戻る
          </a>
        </Link>
          <Link href={pagesPath.create.$url()}>
            <a className="block rounded border-0 bg-sky-500 py-2 px-6 text-lg text-white hover:bg-sky-600 focus:outline-none">
              アカウントを作成
            </a>
          </Link>
        </div>
      </div>
    </header>
  );
};
