import { useDrinkService } from '~/server/services/drink.service'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    if (!(body.drinkType && body.name)) {
        throw createError({
            statusCode: 400,
            message: 'Missing required fields',
        })
    }

    const { createDrink } = useDrinkService()
    await createDrink({
        type: body.drinkType,
        user: body.name,
    })

    return 'Ok'
})
