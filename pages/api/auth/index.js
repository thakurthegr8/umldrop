import supabaseClient from "@/src/services/supabase";
import Cookies from "cookies";

const handler = async (req, res) => {
  try {
    const cookies = new Cookies(req, res);
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
    const session = await supabaseClient.auth.getSession();
    if (session.error) throw new Error("Error getting session");
    const { data: user, error: userDataError } = await supabaseClient
      .from("users")
      .select("*")
      .eq("id", session.data.session.user.email);
    if (userDataError) throw new Error("Error getting user data");
    return res.status(200).json(user[0]);
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      return res.status(400).json(error.message);
    }
    return res.status(400).json("Unauthenticated");
  }
};

export default handler;
