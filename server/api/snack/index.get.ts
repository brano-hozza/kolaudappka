import { useSnackService } from '~/server/services'

export default defineEventHandler(async () => {
    const { getAllSnackOrders } = useSnackService()
    return await getAllSnackOrders()
})
