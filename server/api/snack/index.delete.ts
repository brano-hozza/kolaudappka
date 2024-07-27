import { useSnackService } from "~~/server/services";

export default defineEventHandler(async () => {
  const { clearOrders } = useSnackService();
  await clearOrders();
  return "Ok";
});
