import { useSnackService } from '~/server/services/snack.service'

export default defineEventHandler(async () => {
    const { clearOrders } = useSnackService()
    await clearOrders()
    return 'Ok'
})
