import withAuthApi from "@/src/middlewares/withAuthApi";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

const handler = async (req, res) => {
  if (req.method !== "POST")
    return res
      .status(StatusCodes.METHOD_NOT_ALLOWED)
      .json(ReasonPhrases.METHOD_NOT_ALLOWED);
  return res.status(StatusCodes.OK).json(req.body);
};

export default withAuthApi(handler);
