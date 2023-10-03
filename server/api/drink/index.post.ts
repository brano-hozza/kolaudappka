import { useDrinkService } from '~/server/services/drink.service'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    if (!(body.drinkType !== undefined && body.name)) {
        throw createError({
            statusCode: 400,
            message: 'Missing required fields',
        })
    }

    const { createOrder } = useDrinkService()
    await createOrder({
        type: body.drinkType,
        user: body.name,
    })

    return 'Ok'
})
