import { useDrinkService } from '~/server/services/drink.service'

export default defineEventHandler(async () => {
    const { getAllDrinks } = useDrinkService()
    return await getAllDrinks()
})
