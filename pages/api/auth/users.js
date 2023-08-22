import supabaseClient from "@/src/services/supabase";

export default async function handler(req, res) {
  const getUserData = await supabaseClient.from("users").select("name");
  return res.status(200).json(getUserData);
}
