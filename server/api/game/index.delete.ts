import { useGameService } from '~/server/services'

export default defineEventHandler(async () => {
    const { finishVoting } = useGameService()
    await finishVoting()
    return 'Ok'
})
