import { useSnackService } from "~~/server/services";

export default defineEventHandler(async () => {
  const { resetSnacks } = useSnackService();
  await resetSnacks();
  return "Ok";
});
