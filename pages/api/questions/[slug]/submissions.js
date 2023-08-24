import withAuthApi from "@/src/middlewares/withAuthApi";
import supabaseClient from "@/src/services/supabase";

export default withAuthApi(async function (req, res) {
  try {
    const { data: submissionsData, error: submissionsError } =
      await supabaseClient
        .from("submissions")
        .select("*")
        .eq("id", req.user)
        .eq("question", req.query.slug);
    if (submissionsError) {
      throw submissionsError;
    }
    return res.status(200).json(submissionsData);
  } catch (error) {
    return res.status(400).json(error);
  }
});
