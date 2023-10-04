import { useRatingService } from '~/server/services'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    if (!(body.stars !== undefined && body.user && body.text)) {
        throw createError({
            statusCode: 400,
            message: 'Missing required fields',
        })
    }

    const { rate } = useRatingService()
    await rate(body)

    return 'Ok'
})
