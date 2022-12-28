import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log(req);
  return res.json({ message: "Hello World" });
  //   const posts = await prisma.user.create({
  //     data: {
  //         id: id;
  //   res.json(posts);
}
