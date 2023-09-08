import { ReasonPhrases, StatusCodes } from "http-status-codes";
import withAuthApi from "@/src/middlewares/withAuthApi";
import supabaseClient from "@/src/services/supabase";

const handler = async (req, res) => {
  if (req.method !== "PUT")
    return res
      .status(StatusCodes.METHOD_NOT_ALLOWED)
      .json(ReasonPhrases.METHOD_NOT_ALLOWED);
  const { user } = req;
  try {
    if (req.body.name !== req.body.prev_name) {
      const updateDiagrams = await supabaseClient
        .from("diagrams")
        .update({ collection_name: req.body.name })
        .eq("owner", user)
        .eq("collection_name", req.body.prev_name);
    }
    const { prev_name, ...updatePayload } = req.body;
    const updateCollection = await supabaseClient
      .from("collections")
      .update(updatePayload)
      .eq("name", req.body.prev_name)
      .eq("id", user)
      .select()
      .single();
    if (updateCollection.error) throw updateCollection.error;
    return res.status(StatusCodes.OK).json(updateCollection.data);
  } catch (error) {
    console.log(error);
    return res.status(StatusCodes.BAD_REQUEST).json(error);
  }
};

export default withAuthApi(handler);
