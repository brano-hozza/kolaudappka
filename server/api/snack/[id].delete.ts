import { useSnackService } from '~/server/services/snack.service'

export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id')
    if (!id) {
        throw createError({
            statusText: 'Bad Request',
            statusCode: 400,
        })
    }
    const { finishOrder } = useSnackService()
    return await finishOrder(Number(id))
})
