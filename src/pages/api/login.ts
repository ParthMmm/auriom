import type { User } from "./user";

import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../lib/session";
import { NextApiRequest, NextApiResponse } from "next";
import { withSessionAPI } from "../../lib/session";

export default withIronSessionApiRoute(loginRoute, sessionOptions);

async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
  const { username } = await req.body;

  try {
    const user = { username: username } as User;
    req.session.user = user;
    await req.session.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}

// import { withIronSessionApiRoute } from "iron-session/next";

// You can also pass an async or sync function which takes request and response object and return IronSessionOptions
// export default  withIronSessionApiRoute(
//   function userRoute(req, res) {
//     res.send({ user: req.session.user });
//   },
//   (req, res) => {

//     // Infer max cookie from request
//     // const maxCookieAge = getMaxCookieAge(req);
//     return {
//       cookieName: "myapp_cookiename",
//       password: "complex_password_at_least_32_characters_long",
//       // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
//       cookieOptions: {
//         // setMaxCookie age here.
//         // maxCookieAge,
//         secure: process.env.NODE_ENV === "production",
//       },
//     };
//   }
//   async function
// );
