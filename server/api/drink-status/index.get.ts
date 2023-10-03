import { useDrinkService } from '~/server/services'

export default defineEventHandler(async () => {
    const { getAllDrinks } = useDrinkService()
    return await getAllDrinks()
})
