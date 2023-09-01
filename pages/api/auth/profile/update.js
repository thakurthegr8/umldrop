import withAuthApi from "@/src/middlewares/withAuthApi";
import supabaseClient from "@/src/services/supabase";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

const handler = withAuthApi(async (req, res) => {
  if (req.method !== "PUT")
    return res
      .status(StatusCodes.METHOD_NOT_ALLOWED)
      .json(ReasonPhrases.METHOD_NOT_ALLOWED);
  if (!Object.keys(req.body).includes("username"))
    return res.status(StatusCodes.FORBIDDEN).json(ReasonPhrases.FORBIDDEN);
  try {
    const update = await supabaseClient
      .from("users")
      .update({
        username: req.body.username,
      })
      .eq("id", req.user).select();
    if (update.error) throw update.error;
    return res.status(StatusCodes.OK).json(update.data);
  } catch (error) {
    return res.status(StatusCodes.BAD_GATEWAY).json(error);
  }
  return res.status(200).json(req.body);
});

export default handler;
