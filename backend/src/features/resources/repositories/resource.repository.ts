import prisma from "../../../lib/prisma";

export async function findResourcesByUserId(userId: number) {
  return prisma.resource.findMany({
    where: {
      userId,
    },
    orderBy: {
      id: "desc",
    },
  });
}
