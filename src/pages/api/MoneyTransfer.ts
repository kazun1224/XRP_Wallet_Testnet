import type { NextApiRequest, NextApiResponse } from "next";

import xrpl, { Client, Wallet, xrpToDrops, getBalanceChanges } from "xrpl";

type transferData = {
  seed: string;
  amount: number;
  destination: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const transferData: transferData = req.body;
  const client = new Client("wss://s.altnet.rippletest.net:51233");
  await client.connect();
  // seedで自身のアカウントを取得
  const wallet = Wallet.fromSeed(transferData.seed);

  const prepared = await client.autofill({
    TransactionType: "Payment",
    Account: wallet.address, // 送金するの自身のウォレットアドレス
    Amount: xrpToDrops(transferData.amount), // 送金金額
    Destination: transferData.destination, // 送信先のウォレットアドレス
  });

  const signed = wallet.sign(prepared); // 準備されたトランザクションに署名します。
  const tx = await client.submitAndWait(signed.tx_blob); //トランザクションを送信し、結果を待ちます。

  let mateData;
  if (tx.result.meta !== undefined && typeof tx.result.meta !== "string") {
    mateData = JSON.stringify(getBalanceChanges(tx.result.meta), null, 2);
    // mateDataの中身 10xrp送金
    // [
    //   {
    //     "account": "rE7uUMoEGKb8CHYAP7VikLe1fAvVyheYUa",
    //     "balances": [
    //       {
    //         "currency": "XRP",
    //         "value": "-10.000012"
    //       }
    //     ]
    //   },
    //   {
    //     "account": "rfEfpuS9F2dZfxVewZ3RrV3ojc7Nrusyi3",
    //     "balances": [
    //       {
    //         "currency": "XRP",
    //         "value": "10"
    //       }
    //     ]
    //   }
    // ]
  }
  // 送金後残高
  const balance = await client.getXrpBalance(wallet.address);

  await client.disconnect();

  res.status(200).json({ balance, mateData });
};

export default handler;
