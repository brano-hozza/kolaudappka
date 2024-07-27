import { useRatingService } from "~~/server/services";

export default defineEventHandler(async (event) => {
  const user = getRouterParam(event, "user");
  if (!user) {
    throw createError({
      statusText: "Bad Request",
      statusCode: 400,
    });
  }

  const { getRatingOfUser } = useRatingService();
  return await getRatingOfUser(user);
});
