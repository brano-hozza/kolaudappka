import { useGameService } from '~/server/services/game.service'

export default defineEventHandler(async () => {
    const { finishVoting } = useGameService()
    await finishVoting()
    return 'Ok'
})
