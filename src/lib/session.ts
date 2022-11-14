// this file is a wrapper with defaults to be used in both API routes and `getServerSideProps` functions
import type { IronSessionOptions } from "iron-session";
import type { User } from "../pages/api/user";
import { withIronSessionApiRoute, withIronSessionSsr } from "iron-session/next";

export const sessionOptions: IronSessionOptions = {
  password: "RLP.ERzDmGmUr8wQmR428n9ACtQDueG8" as string,
  cookieName: "albus",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};

// This is where we specify the typings of req.session.*
declare module "iron-session" {
  interface IronSessionData {
    user?: User;
  }
}
