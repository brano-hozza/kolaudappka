import { useGameService } from '~/server/services'

export default defineEventHandler(async () => {
    const { getAllVotes } = useGameService()
    return await getAllVotes()
})
