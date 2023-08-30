import supabaseClient from "@/src/services/supabase";
import moment from "moment/moment";
import Cookies from "cookies";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json("method not allowed");
  try {
    const { data, error } = await supabaseClient.auth.signInWithPassword({
      ...req.body,
    });
    if (error) throw error;
    await supabaseClient.auth.setSession({
      access_token: data.session.access_token,
      refresh_token: data.session.refresh_token,
    });
    const cookies = new Cookies(req, res);
    const timestamp = new Date(moment.unix(data.session.expires_at).toString());
    cookies.set("access_token", data.session.access_token, {
      expires: timestamp,
    });
    cookies.set("refresh_token", data.session.refresh_token, {
      expires: timestamp,
    });
    const getUserData = await supabaseClient
      .from("users")
      .select("*")
      .eq("id", req.body.email);
    if (getUserData.error) throw new Error("Error getting user data");
    return res.status(200).json(getUserData.data[0]);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
}
