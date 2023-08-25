import supabaseClient from "@/src/services/supabase";
import { StatusCodes } from "http-status-codes";

export default async function (req, res) {
  try {
    const { data: submissionsData, error: submissionsError } =
      await supabaseClient
        .from("solved_submissions_view_4")
        .select("*")
        .eq("id", "1000015256@dit.edu.in");
    if (submissionsError) throw submissionsError;
    return res.status(StatusCodes.OK).json(submissionsData);
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).json(error);
  }
}
