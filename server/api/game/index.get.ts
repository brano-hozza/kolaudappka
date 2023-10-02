import { useGameService } from '~/server/services/game.service'

export default defineEventHandler(async () => {
    const { getAllVotes } = useGameService()
    return await getAllVotes()
})
