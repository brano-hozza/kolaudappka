import { useSnackService } from '~/server/services/snack.service'

export default defineEventHandler(async () => {
    const { getAllSnackOrders } = useSnackService()
    return await getAllSnackOrders()
})
