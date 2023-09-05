import withAuthApi from "@/src/middlewares/withAuthApi";
import supabaseClient from "@/src/services/supabase";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

const handler = async (req, res) => {
  if (req.method !== "POST")
    return res
      .status(StatusCodes.METHOD_NOT_ALLOWED)
      .json(ReasonPhrases.METHOD_NOT_ALLOWED);
  const { body } = req;
  try {
    const addDiagram = await supabaseClient
      .from("diagrams")
      .insert({
        name: body.name,
        collection_name: body.collection_name,
        encoded_string: body.encoded_string,
        owner: req.user,
      })
      .select("*")
      .single();
    if (addDiagram.error) throw addDiagram.error;
    return res.status(StatusCodes.CREATED).json(addDiagram.data);
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).json(error);
  }
};

export default withAuthApi(handler);
