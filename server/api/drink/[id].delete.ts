import { useDrinkService } from '~/server/services'

export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id')
    if (!id) {
        throw createError({
            statusText: 'Bad Request',
            statusCode: 400,
        })
    }
    const { finishOrder } = useDrinkService()
    return await finishOrder(Number(id))
})
