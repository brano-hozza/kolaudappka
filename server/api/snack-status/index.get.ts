import { useSnackService } from "~~/server/services";

export default defineEventHandler(async () => {
  const { getAllSnacks } = useSnackService();
  return await getAllSnacks();
});
