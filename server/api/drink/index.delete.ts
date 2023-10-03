import { useDrinkService } from '~/server/services/drink.service'

export default defineEventHandler(async () => {
    const { clearOrders } = useDrinkService()
    await clearOrders()
    return 'Ok'
})
