// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // get app id from query params
  const appId = req.query.id as string;

  if (!appId) {
    res.status(400).json({ error: "Missing app id" });
    return;
  }

  // get app data from database
  const { data } = await axios.get(`https://api.knack.com/v1/applications/${appId}`);

  const rawAppData = data.application;

  res.status(200).json(rawAppData);
}
