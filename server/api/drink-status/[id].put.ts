import { useDrinkService } from '~/server/services'

export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id')
    if (id === undefined || isNaN(Number(id))) {
        throw createError({
            statusText: 'Bad Request',
            statusCode: 400,
        })
    }

    const { updateDrinkStatus } = useDrinkService()
    await updateDrinkStatus(Number(id))
    return 'Ok'
})
