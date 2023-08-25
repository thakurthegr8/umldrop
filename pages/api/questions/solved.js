import supabaseClient from "@/src/services/supabase";
import { StatusCodes } from "http-status-codes";

export default async function (req, res) {
  try {
    return res.status(StatusCodes.OK).json({});
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).json(error);
  }
}
