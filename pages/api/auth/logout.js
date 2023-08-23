// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import supabaseClient from "@/src/services/supabase";
import Cookies from "cookies";

const handler = async (req, res) => {
  const cookies = new Cookies(req, res);
  cookies.set("access_token", null, { maxAge: Date.now() });
  cookies.set("refresh_token", null, { maxAge: Date.now() });
  await supabaseClient.auth.signOut();
  res.redirect("/api/auth");
};

export default handler;
