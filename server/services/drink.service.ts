import { DrinkType, EntityType } from '@/types'
import { CreateDrinkOrderDTO } from '@/types/dtos'
import { useRepository } from '~/server/data/db'

export const useDrinkService = () => {
    const ordersRepository = useRepository(EntityType.DrinkOrder)
    const drinkStatusRepository = useRepository(EntityType.DrinkStatus)
    const createOrder = async (dto: CreateDrinkOrderDTO) => {
        const order = await ordersRepository.getByProperty('user', dto.user)
        if (order) {
            throw createError({
                statusCode: 400,
                statusMessage: 'User already ordered a drink',
            })
        }
        await ordersRepository.create({
            drinkType: dto.type,
            user: dto.user,
        })
    }

    const getAllDrinks = async () => {
        return await drinkStatusRepository.getAll()
    }

    const resetDrinks = async () => {
        const drinks = Object.values(DrinkType)
            .filter((x) => typeof x === 'number')
            .map((drinkType) => ({
                drinkType: drinkType as DrinkType,
                available: true,
            }))
        console.log(drinks)
        await drinkStatusRepository.deleteAll()
        for (const drink of drinks) {
            await drinkStatusRepository.create(drink)
        }
    }

    const updateDrinkStatus = async (id: number) => {
        const drinkStatus = await drinkStatusRepository.get(id)
        if (!drinkStatus) {
            throw createError({
                statusCode: 400,
                statusMessage: 'Invalid data',
            })
        }
        drinkStatus.available = false
        await drinkStatusRepository.update(id, drinkStatus)
    }

    const getAllDrinkOrders = async () => {
        return await ordersRepository.getAll()
    }

    const finishOrder = async (id: number) => {
        const order = await ordersRepository.get(id)
        if (!order) {
            throw createError({
                statusCode: 400,
                statusMessage: 'Invalid data',
            })
        }
        await ordersRepository.deleteById(id)
    }

    const clearOrders = async () => {
        await ordersRepository.deleteAll()
    }

    return {
        createOrder,
        getAllDrinkOrders,
        finishOrder,
        clearOrders,
        getAllDrinks,
        updateDrinkStatus,
        resetDrinks,
    }
}
