import { useDrinkService } from '~/server/services/drink.service'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    if (!(body.type !== undefined && body.name)) {
        throw createError({
            statusCode: 400,
            message: 'Missing required fields',
        })
    }

    const { createOrder } = useDrinkService()
    await createOrder(body)

    return 'Ok'
})
