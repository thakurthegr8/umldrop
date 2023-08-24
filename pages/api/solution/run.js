// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import axios from "axios";

export default async function handler(req, res) {
  const result = {
    data: null,
    error: null,
    status: null,
  };
  try {
    const lemurApiResponse = await axios.post(
      "https://datalemur.com/api/submit-solution",
      req.body
    );
    const lemurApiData = await lemurApiResponse.data;
    result.data = {
      codeResult: lemurApiData,
      submissionResult: null,
    };
    result.status = 200;
  } catch (error) {
    result.error = error?.response?.data;
    result.status = 400;
  }
  return res.status(result.status).json(result);
}
