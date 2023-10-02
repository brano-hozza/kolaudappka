import { useGameService } from '~/server/services/game.service'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    if (!(body.gameType !== undefined && body.name)) {
        throw createError({
            statusCode: 400,
            message: 'Missing required fields',
        })
    }

    const { voteForGame } = useGameService()
    await voteForGame({
        gameType: body.gameType,
        user: body.name,
    })

    return 'Ok'
})
