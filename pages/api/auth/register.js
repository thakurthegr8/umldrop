import supabaseClient from "@/src/services/supabase";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json("method not allowed");
  try {
    const { data, error } = await supabaseClient.auth.signUp({
      ...req.body,
    });
    if (error) throw error;
    return res.status(201).json(data);
  } catch (error) {
    return res.status(400).json(error);
  }
}
