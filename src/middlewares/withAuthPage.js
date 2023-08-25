const Cookies = require("cookies");
const { default: supabaseClient } = require("../services/supabase");

const withAuthPage = (handler) => {
  return async (ctx) => {
    const { req, res } = ctx;
    const cookies = new Cookies(req, res);
    const accessToken = cookies.get("access_token");
    if (!accessToken)
      return {
        notFound: true,
      };
    const { data, error: userFetchError } = await supabaseClient.auth.getUser(
      accessToken
    );
    if (userFetchError)
      return {
        notFound: true,
      };
    req.user = data.user.email;
    return handler(ctx);
  };
};

export default withAuthPage;
