import { useRepository } from '../data/db'
import { EntityType } from '~/types'
import { CreateDrinkDTO } from '~/types/dtos'

export const useDrinkService = () => {
    const repository = useRepository(EntityType.Drink)
    const createDrink = async (dto: CreateDrinkDTO) => {
        await repository.create({
            drinkType: dto.type,
            user: dto.user,
            resolved: false,
        })
    }

    const getAllDrinks = async () => {
        return await repository.getAll()
    }

    const getDrink = async (id: number) => {
        return await repository.get(id)
    }

    const finishOrder = async (id: number) => {
        const order = await repository.get(id)
        if (!order) {
            throw createError({
                statusCode: 400,
                statusMessage: 'Invalid data',
            })
        }
        order.resolved = true
        await repository.update(id, order)
    }

    const clearDrinks = async () => {
        await repository.deleteAll()
    }

    return {
        createDrink,
        getAllDrinks,
        getDrink,
        finishOrder,
        clearDrinks,
    }
}
