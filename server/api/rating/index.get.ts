import { useRatingService } from '~/server/services'

export default defineEventHandler(async () => {
    const { getAllRatings } = useRatingService()
    return await getAllRatings()
})
