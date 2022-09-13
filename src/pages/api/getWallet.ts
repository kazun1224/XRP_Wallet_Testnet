import type { NextApiRequest, NextApiResponse } from "next";

import { Client, Wallet } from "xrpl";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const client = new Client("wss://s.altnet.rippletest.net:51233");
  await client.connect();
  const wallet = Wallet.fromSeed(req.body.seed);
  const balance = await client.getXrpBalance(wallet.address);
  const currentWallet = {
    address: wallet.address,
    publicKey: wallet.publicKey,
    privateKey: wallet.privateKey,
    seed: req.body.seed,
    balance,
  };
  await client.disconnect();

  res.status(200).json(currentWallet);
};

export default handler;
