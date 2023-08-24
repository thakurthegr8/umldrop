import axios from "axios";
import { StatusCodes, ReasonPhrases } from "http-status-codes";
import supabaseClient from "@/src/services/supabase";
import withAuthApi from "@/src/middlewares/withAuthApi";

export default withAuthApi(async function handler(req, res) {
  if (req.method !== "POST") {
    return res
      .status(StatusCodes.METHOD_NOT_ALLOWED)
      .send(ReasonPhrases.METHOD_NOT_ALLOWED);
  }
  const result = {
    data: null,
    error: null,
    status: null,
  };
  try {
    const lemurApiResponse = await axios.post(
      "https://datalemur.com/api/submit-solution",
      {
        questionId: req.body.questionId,
        userSolution: req.body.userSolution,
      }
    );
    const lemurApiData = await lemurApiResponse.data;
    const { data: submissionData, error: submissionError } =
      await supabaseClient
        .from("submissions")
        .insert([
          {
            id: req.user,
            question: req.body.questionText,
            status: lemurApiData.status,
            solution: req.body.userSolution,
          },
        ])
        .select();
    console.log(submissionData);
    result.data = {
      codeResult: lemurApiData,
      submissionResult: submissionData,
    };
    result.status = 200;
  } catch (error) {
    const { data: submissionData, error: submissionError } =
      await supabaseClient
        .from("submissions")
        .insert([
          {
            id: req.user,
            question: req.body.questionText,
            status: "wrong",
            solution: req.body.userSolution,
          },
        ])
        .select();
    result.data = {
      codeResult: null,
      submissionResult: submissionData,
    };
    result.error = error?.response?.data;
    result.status = 400;
  }
  return res.status(result.status).json(result);
});
