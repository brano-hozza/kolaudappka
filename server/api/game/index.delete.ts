import { useGameService } from '~/server/services/game.service'

export default defineEventHandler(async () => {
    const { finishVoting } = useGameService()
    return await finishVoting()
})
