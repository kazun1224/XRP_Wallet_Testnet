import type { NextPage } from "next";
import { ComponentProps, useState } from "react";
import axios, { AxiosRequestConfig } from "axios";
import Link from "next/link";
import { pagesPath } from "src/utils/$path";

type WalletDetail = {
  address: string;
  publicKey: string;
  privateKey: string;
  seed: string;
  balance: string;
};

const Home: NextPage = () => {
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
    <div className="p-20">
      <h1>hello world</h1>
      <Link href={pagesPath.addWallet.$url()}>
        <a className="bg-black text-white">MakeAccount</a>
      </Link>
      <form onSubmit={getMyWallet}>
        <label htmlFor="seed">seed</label>
        <input type="text" name="seed" id="seed" />
        <button className="bg-green-500">Connect!!</button>
      </form>

      <hr />
      <div>
        <p>{`address:${myWallet?.address}`}</p>
        <p>{`publicKey:${myWallet?.publicKey}`}</p>
        <p>{`privateKey:${myWallet?.privateKey}`}</p>
        <p>{`seed:${myWallet?.seed}`}</p>
        <p>{`balance:${myWallet?.balance}`}</p>
      </div>
      <div className="border p-4">
        <h2>XRPの送金</h2>
        {myWallet.address !== "" ? (
          <form onSubmit={transfer}>
            <div>
              <label htmlFor="destination">送信先アドレス</label>
              <input type="text" name="destination" id="destination" />
            </div>
            <div>
              <label htmlFor="amount">送金金額</label>
              <input type="number" name="amount" id="amount" />
            </div>
            <button>送金</button>
          </form>
        ) : (
          <p>アカウントを取得してください</p>
        )}
      </div>
    </div>
  );
};

export default Home;
