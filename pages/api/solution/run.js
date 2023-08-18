// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import axios from "axios";

export default async function handler(req, res) {
  try {
    const response = await axios.post(
      "https://datalemur.com/api/submit-solution",
      req.body
    );
    const data = await response.data;
    return res.status(200).json(data);
  } catch (error) {
    console.log(error.response.data);
    return res.status(400).json(error?.response?.data);
  }
}
