import { useSnackService } from "~~/server/services";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  if (id === undefined || isNaN(Number(id))) {
    throw createError({
      statusText: "Bad Request",
      statusCode: 400,
    });
  }

  const { updateSnackStatus } = useSnackService();
  await updateSnackStatus(Number(id));
  return "Ok";
});
