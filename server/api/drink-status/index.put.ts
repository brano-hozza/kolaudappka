import { useDrinkService } from "~~/server/services";

export default defineEventHandler(async () => {
  const { resetDrinks } = useDrinkService();
  await resetDrinks();
  return "Ok";
});
