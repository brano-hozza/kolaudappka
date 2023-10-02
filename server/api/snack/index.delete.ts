import { useDrinkService } from '~/server/services/drink.service'

export default defineEventHandler(async () => {
    const { clearDrinks } = useDrinkService()
    return await clearDrinks()
})
