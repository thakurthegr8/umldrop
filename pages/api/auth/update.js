import withAuthApi from "@/src/middlewares/withAuthApi";
import supabaseClient from "@/src/services/supabase";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

export default withAuthApi(async function handler(req, res) {
  if (req.method !== "PUT")
    return res
      .status(StatusCodes.METHOD_NOT_ALLOWED)
      .json(ReasonPhrases.METHOD_NOT_ALLOWED);
  try {
    const { data: updateUserData, error: updateUserError } =
      await supabaseClient
        .from("users")
        .update(req.body)
        .eq("id", req.user)
        .select()
        .single();
    if (updateUserError) throw updateUserError;
    return res.status(StatusCodes.OK).json(updateUserData);
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).json(error);
  }
});
