import withAuthApi from "@/src/middlewares/withAuthApi";
import supabaseClient from "@/src/services/supabase";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

const handler = async (req, res) => {
  if (req.method !== "GET")
    return res
      .status(StatusCodes.METHOD_NOT_ALLOWED)
      .json(ReasonPhrases.METHOD_NOT_ALLOWED);
  try {
    const collections = await supabaseClient
      .from("collections")
      .select("name")
      .eq("id", req.user);
    if (collections.error) throw collections.error;
    return res.status(StatusCodes.OK).json(collections.data);
  } catch (error) {
    console.log(error);
    return res.status(StatusCodes.BAD_REQUEST).json(error);
  }
};

export default withAuthApi(handler);
