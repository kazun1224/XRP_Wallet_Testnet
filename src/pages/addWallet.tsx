import type { NextPage } from "next";
import { ComponentProps, useState } from "react";
import axios, { AxiosRequestConfig } from "axios";

type WalletDetail = {
  address: string;
  publicKey: string;
  privateKey: string;
  seed: string;
  balance: string;
};

const MakeAccount: NextPage = () => {
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

  console.log(myWallet);

  return (
    <div className="p-20">
      <h1>新しいウォレットの作成</h1>
      <form onSubmit={MakeAccount}>
        <button className="bg-green-500">Make you new wallet!!</button>
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

export default MakeAccount;
