"use server";

import globalStorage from "node-global-storage";
import axios from "axios";
import { v4 as uuid } from "uuid";

type CreatePayment = {
  amount: number;
  userId: string;
  courseId: string;
  id_token: string;
};

export const grantToken = async () => {
  try {
    const { data } = await axios.post(
      process.env.PGW_BKASH_GRANT_TOKEN_URL!,
      {
        app_key: process.env.PGW_BKASH_API_KEY,
        app_secret: process.env.PGW_BKASH_API_SECRET,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          username: process.env.PGW_BKASH_USERNAME,
          password: process.env.PGW_BKASH_PASSWORD,
        },
      }
    );
    return data?.id_token;
  } catch (error) {
    console.log(error);
  }
};

export const checkoutWithBkash = async ({
  amount,
  userId,
  courseId,
  id_token,
}: CreatePayment) => {
  try {
    const res = await axios.post(
      process.env.PGW_BKASH_CREATE_PAYMENT_URL!,
      {
        mode: "0011",
        payerReference: " ",
        callbackURL: `http://localhost:3000/api/payment`,
        amount: amount,
        currency: "BDT",
        intent: "sale",
        merchantInvoiceNumber: "Inv" + uuid().substring(0, 5),
      },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          authorization: id_token,
          "x-app-key": process.env.PGW_BKASH_API_KEY,
        },
      }
    );
    return {
      url: res.data.bkashURL,
    };
  } catch (error) {
    console.log(error);
    throw new Error("Fail to grand token");
  }
};
