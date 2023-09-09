import withAuthApi from "@/src/middlewares/withAuthApi";
import supabaseClient from "@/src/services/supabase";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

const handler = async (req, res) => {
  if (req.method !== "DELETE")
    return res
      .status(StatusCodes.METHOD_NOT_ALLOWED)
      .json(ReasonPhrases.METHOD_NOT_ALLOWED);
  if (!req.query?.id)
    return res.status(StatusCodes.NOT_ACCEPTABLE).json("invalid parameters");
  try {
    const deletePayload = await supabaseClient
      .from("diagrams")
      .delete()
      .eq("id", req.query.id)
      .eq("owner", req.user)
      .select()
      .single();
    if (deletePayload.error) throw deletePayload.error;
    return res.status(StatusCodes.OK).json(deletePayload.data);
  } catch (error) {
    console.log(error);
    return res.status(StatusCodes.BAD_REQUEST).json(error);
  }
};

export default withAuthApi(handler);
