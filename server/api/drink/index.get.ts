import { useDrinkService } from "~~/server/services";

export default defineEventHandler(async () => {
  const { getAllDrinkOrders } = useDrinkService();
  return await getAllDrinkOrders();
});
