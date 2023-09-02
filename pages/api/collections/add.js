import { ReasonPhrases, StatusCodes } from "http-status-codes";
import withAuthApi from "@/src/middlewares/withAuthApi";
import supabaseClient from "@/src/services/supabase";

const handler = async (req, res) => {
  if (req.method !== "POST")
    return res
      .status(StatusCodes.METHOD_NOT_ALLOWED)
      .json(ReasonPhrases.METHOD_NOT_ALLOWED);
  const collectionNameValidator =
    /^[a-zA-Z0-9](?:[a-zA-Z0-9]|-(?=[a-zA-Z0-9]))*(?<!-)$/;
  try {
    if (!collectionNameValidator.test(req.body.name)) throw new Error("Invalid collection name. The name can only contain alphanumeric characters, hyphens, and cannot start or end with a hyphen.");
    const tryFinding = await supabaseClient
      .from("collections")
      .select("*", { count: "exact" })
      .eq("id", req.user)
      .eq("name", req.body.name);
    if (tryFinding.count !== 0)
      throw new Error("A collection with similar name already exists");
    const payload = {
      id: req.user,
      name: req.body.name,
      description: req.body?.description,
      private: false,
    };
    const addCollection = await supabaseClient
      .from("collections")
      .insert(payload)
      .select("*")
      .single();

    if (addCollection.error) throw addCollection.error;
    return res.status(StatusCodes.OK).json(addCollection.data);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(StatusCodes.CONFLICT).json({ message: error.message });
    }
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ ...error, message: ReasonPhrases.BAD_REQUEST });
  }
};

export default withAuthApi(handler);
