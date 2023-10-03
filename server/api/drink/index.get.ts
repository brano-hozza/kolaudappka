import { useDrinkService } from '~/server/services/drink.service'

export default defineEventHandler(async () => {
    const { getAllDrinkOrders } = useDrinkService()
    return await getAllDrinkOrders()
})
