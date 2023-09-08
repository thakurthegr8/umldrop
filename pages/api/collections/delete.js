import { ReasonPhrases, StatusCodes } from "http-status-codes";
import withAuthApi from "@/src/middlewares/withAuthApi";
import supabaseClient from "@/src/services/supabase";

const handler = async (req, res) => {
  if (req.method !== "DELETE")
    return res
      .status(StatusCodes.METHOD_NOT_ALLOWED)
      .json(ReasonPhrases.METHOD_NOT_ALLOWED);
  if (!req.query?.name)
    return res
      .status(StatusCodes.FAILED_DEPENDENCY)
      .json({ error: "collection name required" });
  const { user } = req;
  try {
    const deleteDiagrams = await supabaseClient
      .from("diagrams")
      .delete()
      .eq("owner", user)
      .eq("collection_name", req.query.name);  
    if (deleteDiagrams.error) throw deleteDiagrams.error;
    const deleteCollection = await supabaseClient
      .from("collections")
      .delete()
      .eq("name", req.query.name)
      .eq("id", user)
      .select()
      .single();
    if (deleteCollection.error) throw deleteCollection.error;
    return res.status(StatusCodes.OK).json(deleteCollection.data);
  } catch (error) {
    console.log(error);
    return res.status(StatusCodes.BAD_REQUEST).json(error);
  }
};

export default withAuthApi(handler);
