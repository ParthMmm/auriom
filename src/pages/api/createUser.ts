import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log(req);

  const { id, username } = req.body.data;

  const user = await prisma.user.create({
    data: {
      id: id,
      username: username,
    },
  });

  if (user) {
    res.status(200).json({ message: "User created", user });
  }
}
