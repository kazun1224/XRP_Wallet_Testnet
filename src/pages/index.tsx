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

const Home: CustomNextPage = () => {
  const wallet = {
    address: "",
    publicKey: "",
    privateKey: "",
    seed: "",
    balance: "",
  };
  const [myWallet, setMyWallet] = useState<WalletDetail>(wallet);
  const getMyWallet: ComponentProps<"form">["onSubmit"] = async (event) => {
    event.preventDefault();
    const seed: string = event.currentTarget.seed.value;
    const options: AxiosRequestConfig = {
      // here
      url: "/api/getWallet",
      method: "POST",
      data: {
        seed,
      },
    };

    const { data } = await axios(options);
    setMyWallet(data);
  };

  const transfer: ComponentProps<"form">["onSubmit"] = async (event) => {
    event.preventDefault();
    const amount = event.currentTarget.amount.value;
    const destination = event.currentTarget.destination.value;
    const options: AxiosRequestConfig = {
      url: "/api/MoneyTransfer",
      method: "POST",
      data: {
        seed: myWallet?.seed,
        destination,
        amount,
      },
    };

    const { data } = await axios(options);
    setMyWallet({ ...myWallet, balance: data.balance });
  };

  return (
    <div>
      <div className="container mx-auto flex w-full flex-col items-start  md:flex-row ">
        <div className=" mb-16  flex flex-col items-center text-center md:mb-0 md:w-3/6 md:items-start md:text-left">
          <h2 className="title-font mb-4 text-3xl font-medium text-gray-900 sm:text-4xl">
            アカウント
          </h2>
          <p className="mt-5 leading-relaxed">
            シードフレーズを入力して既存のアカウントデータを取得する
          </p>
          <form onSubmit={getMyWallet} className="mt-5">
            <label htmlFor="seed" className="text-sm leading-7 text-gray-600">
              シードフレーズ
            </label>
            <input
              type="text"
              name="seed"
              id="seed"
              className="w-full rounded border border-gray-300 bg-white py-1 px-3 text-base leading-8 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
            />
            <button className="mt-5 block rounded border-0 bg-sky-500 py-2 px-6 text-lg text-white hover:bg-sky-600 focus:outline-none">
              取得
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
      <div className="container mx-auto  px-5 py-24">
        <h2 className="title-font mb-4 text-3xl font-medium text-gray-900 sm:text-4xl">
          XRPの送金
        </h2>
        {myWallet.address !== "" ? (
          <form onSubmit={transfer}>
            <div>
              <label
                htmlFor="destination"
                className="text-sm leading-7 text-gray-600"
              >
                送信先アドレス
              </label>
              <input
                type="text"
                name="destination"
                id="destination"
                className="w-full rounded border border-gray-300 bg-white py-1 px-3 text-base leading-8 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
              />
            </div>
            <div>
              <label
                htmlFor="amount"
                className="text-sm leading-7 text-gray-600"
              >
                送金金額
              </label>
              <input
                type="number"
                name="amount"
                id="amount"
                className="w-full rounded border border-gray-300 bg-white py-1 px-3 text-base leading-8 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
              />
            </div>
            <button className="mt-5 block rounded border-0 bg-sky-500 py-2 px-6 text-lg text-white hover:bg-sky-600 focus:outline-none">
              送金
            </button>
          </form>
        ) : (
          <p>アカウントを取得してください</p>
        )}
      </div>
    </div>
  );
};

Home.getLayout = (page) => <Layout>{page}</Layout>;

export default Home;
