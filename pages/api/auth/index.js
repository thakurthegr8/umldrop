import supabaseClient from "@/src/services/supabase";
import { getCookies } from "@/src/utils/cookies";
import Cookies from "cookies";

const handler = async (req, res) => {
  try {
    const cookies = new Cookies(req,res);
    const refreshToken = cookies.get("refresh_token");
    const accessToken = cookies.get("access_token");
    if (accessToken && refreshToken) {
      await supabaseClient.auth.setSession({
        access_token: accessToken,
        refresh_token: refreshToken,
      });
    } else {
      throw new Error("User is not authenticated.");
    }
    const data = await supabaseClient.auth.getSession();
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      return res.status(400).json(error.message);
    }
    return res.status(400).json("Unauthenticated");
  }
};

export default handler;
