import supabaseClient from "@/src/services/supabase";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json("method not allowed");
  try {
    const { data: signUpData, error: signUpError } =
      await supabaseClient.auth.signUp({
        email: req.body.email,
        password: req.body.password,
      });
    if (signUpError) throw signUpError;
    const { data: addUserData, error: addUserError } = await supabaseClient
      .from("users")
      .insert([{ id: req.body.email, name: req.body.name }])
      .select();
    if (addUserError) throw addUserError;
    return res.status(201).json({ user: addUserData, session: signUpData });
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
}
