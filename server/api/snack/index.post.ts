import { useSnackService } from "~~/server/services";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  if (!(body.type !== undefined && body.user)) {
    throw createError({
      statusCode: 400,
      message: "Missing required fields",
    });
  }

  const { createOrder } = useSnackService();
  await createOrder(body);

  return "Ok";
});
