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
  const [myWallet, setMyWallet] = useState<WalletDetail>();
  const getMyWallet: ComponentProps<"form">["onSubmit"] = async (event) => {
    event.preventDefault();
    const seed: string = event.currentTarget.seed.value;
    console.log(seed);
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

  console.log(myWallet);

  return (
    <div className="p-20">
      <h1>hello world</h1>
      <form onSubmit={getMyWallet}>
        <label htmlFor="seed">seed</label>
        <input type="text" name="seed" id="seed" />
        <button className="bg-green-500">Connect!!</button>
      </form>

      <hr />
      <p>{`address:${myWallet?.address}`}</p>
      <p>{`publicKey:${myWallet?.publicKey}`}</p>
      <p>{`privateKey:${myWallet?.privateKey}`}</p>
      <p>{`seed:${myWallet?.seed}`}</p>
      <p>{`balance:${myWallet?.balance}`}</p>
    </div>
  );
};

export default Home;
