import { useRepository } from '../data/db'
import { EntityType } from '~/types'
import { RateDTO } from '~/types/dtos'

export const useRatingService = () => {
    const repository = useRepository(EntityType.Rating)
    const rate = async (dto: RateDTO) => {
        const rating = await repository.getByProperty('user', dto.user)
        if (rating) {
            throw createError({
                statusCode: 400,
                statusMessage: 'User has already voted',
            })
        }
        await repository.create({
            user: dto.user,
            stars: dto.stars,
            text: dto.text,
        })
    }

    const getAllRatings = async () => {
        return await repository.getAll()
    }

    const getRatingOfUser = async (user: string) => {
        return (await repository.getByProperty('user', user)) ?? null
    }

    return {
        rate,
        getAllRatings,
        getRatingOfUser,
    }
}
