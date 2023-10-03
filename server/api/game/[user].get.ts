import { useGameService } from '~/server/services'

export default defineEventHandler(async (event) => {
    const user = getRouterParam(event, 'user')
    if (!user) {
        throw createError({
            statusText: 'Bad Request',
            statusCode: 400,
        })
    }

    const { getVoteOfUser } = useGameService()
    return await getVoteOfUser(user)
})
