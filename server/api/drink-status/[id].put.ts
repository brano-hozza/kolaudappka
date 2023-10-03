import { useDrinkService } from '~/server/services/drink.service'

export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id')
    if (!id || isNaN(Number(id))) {
        throw createError({
            statusText: 'Bad Request',
            statusCode: 400,
        })
    }

    const { updateDrinkStatus } = useDrinkService()
    await updateDrinkStatus(Number(id))
    return 'Ok'
})
