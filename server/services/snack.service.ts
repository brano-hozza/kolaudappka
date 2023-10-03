import { EntityType } from '@/types'
import { useRepository } from '~/server/data/db'
import { CreateSnackOrderDTO } from '~/types/dtos'

export const useSnackService = () => {
    const ordersRepository = useRepository(EntityType.SnackOrder)
    const snackStatusRepository = useRepository(EntityType.SnackStatus)
    const createOrder = async (dto: CreateSnackOrderDTO) => {
        const order = await ordersRepository.getByProperty('user', dto.user)
        if (order) {
            throw createError({
                statusCode: 400,
                statusMessage: 'User already ordered a drink',
            })
        }
        await ordersRepository.create({
            snackType: dto.type,
            user: dto.user,
        })
    }

    const getAllSnacks = async () => {
        return await snackStatusRepository.getAll()
    }

    const updateSnackStatus = async (id: number) => {
        const drinkStatus = await snackStatusRepository.get(id)
        if (!drinkStatus) {
            throw createError({
                statusCode: 400,
                statusMessage: 'Invalid data',
            })
        }
        drinkStatus.available = false
        await snackStatusRepository.update(id, drinkStatus)
    }

    const getAllSnackOrders = async () => {
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
        getAllSnackOrders,
        finishOrder,
        clearOrders,
        getAllSnacks,
        updateSnackStatus,
    }
}
