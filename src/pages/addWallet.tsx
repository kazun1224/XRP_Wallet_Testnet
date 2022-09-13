import type { CustomNextPage } from "next";
import { ComponentProps, useState } from "react";
import axios, { AxiosRequestConfig } from "axios";
import { Layout } from "src/layouts";

type WalletDetail = {
  address: string;
  publicKey: string;
  privateKey: string;
  seed: string;
  balance: string;
};

const MakeAccount: CustomNextPage = () => {
  const [myWallet, setMyWallet] = useState<WalletDetail>();
  const MakeAccount: ComponentProps<"form">["onSubmit"] = async (event) => {
    event.preventDefault();
    const options: AxiosRequestConfig = {
      url: "/api/makeAccount",
      method: "POST",
    };

    const { data } = await axios(options);
    setMyWallet(data);
  };

  return (
    <div className="p-20">
      <div className="container mx-auto flex w-full flex-col items-start  md:flex-row ">
        <div className=" mb-16  flex flex-col items-center text-center md:mb-0 md:w-3/6 md:items-start md:text-left">
          <h2 className="title-font mb-4 text-3xl font-medium text-gray-900 sm:text-4xl">
            アカウントの作成
          </h2>
          <p className="mt-5 leading-relaxed">
            ボタンを押してアカウントを作成しよう！
            <br />
            押して数秒後に情報が表示されるよ！
            <br />
            アカウント情報はメモをして大事に補完してね
          </p>
          <form onSubmit={MakeAccount} className="mt-5">
            <button className="mt-5 block rounded border-0 bg-sky-500 py-2 px-6 text-lg text-white hover:bg-sky-600 focus:outline-none">
              作成する
            </button>
          </form>
        </div>
        <div className="w-5/6 md:w-3/6 lg:w-full lg:max-w-lg">
          <h2 className="title-font mb-4 text-3xl font-medium text-gray-900 sm:pl-6 sm:text-4xl">
            アカウント情報
          </h2>
          <dl>
            <div className="mt-6 flex-grow sm:mt-0 sm:pl-6">
              <dt className="title-font mb-1 text-xl font-medium text-gray-900">
                address
              </dt>
              <dd className="leading-relaxed"> {myWallet?.address}</dd>
            </div>
            <div className="mt-6 flex-grow sm:mt-0 sm:pl-6">
              <dt className="title-font mb-1 text-xl font-medium text-gray-900">
                publicKey
              </dt>
              <dd className="leading-relaxed">
                <p>{myWallet?.publicKey}</p>{" "}
              </dd>
            </div>
            <div className="mt-6 flex-grow sm:mt-0 sm:pl-6">
              <dt className="title-font mb-1 text-xl font-medium text-gray-900">
                privateKey
              </dt>
              <dd className="leading-relaxed"> {myWallet?.privateKey}</dd>
            </div>
            <div className="mt-6 flex-grow sm:mt-0 sm:pl-6">
              <dt className="title-font mb-1 text-xl font-medium text-gray-900">
                seed
              </dt>
              <dd className="leading-relaxed"> {myWallet?.seed}</dd>
            </div>
            <div className="mt-6 flex-grow sm:mt-0 sm:pl-6">
              <dt className="title-font mb-1 text-xl font-medium text-gray-900">
                balance
              </dt>
              <dd className="leading-relaxed"> {myWallet?.balance}</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
};

MakeAccount.getLayout = (page) => <Layout>{page}</Layout>;

export default MakeAccount;
