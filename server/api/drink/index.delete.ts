import { useDrinkService } from "~~/server/services";

export default defineEventHandler(async () => {
  const { clearOrders } = useDrinkService();
  await clearOrders();
  return "Ok";
});
