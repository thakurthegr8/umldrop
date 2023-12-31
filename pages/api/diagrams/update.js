import withAuthApi from "@/src/middlewares/withAuthApi";
import supabaseClient from "@/src/services/supabase";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

const handler = async (req, res) => {
  if (req.method !== "PUT")
    return res
      .status(StatusCodes.METHOD_NOT_ALLOWED)
      .json(ReasonPhrases.METHOD_NOT_ALLOWED);
  try {
    const paramsToUpdate = ["name", "encoded_string"];
    const payload = {};
    paramsToUpdate.forEach((item) => {
      if (req.body?.[item]) {
        payload[item] = req.body[item];
      }
    });
    const updatedPayload = await supabaseClient
      .from("diagrams")
      .update(payload)
      .eq("id", req.body.id)
      .eq("collection_name", req.body.collection_name)
      .eq("owner", req.user)
      .select()
      .single();
    if (updatedPayload.error) throw updatedPayload.error;
    return res.status(StatusCodes.CREATED).json(updatedPayload.data);
  } catch (error) {
    console.log(error);
    return res.status(StatusCodes.BAD_REQUEST).json(error);
  }
};

export default withAuthApi(handler);
