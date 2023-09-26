import { kv } from '@vercel/kv'
import { Drink, Entity, EntityType, Game, Snack } from '~/types'

interface EntityLookup {
    [EntityType.Game]: Game
    [EntityType.Snack]: Snack
    [EntityType.Drink]: Drink
}

interface EntityStorage {
    entities: Entity[]
    [key: string]: unknown
}

export function useService<T extends EntityType>(entityType: T) {
    const getAll = async (): Promise<EntityLookup[T][]> => {
        return (await kv.get(entityType)) ?? []
    }
    const getById = async (
        id: number
    ): Promise<EntityLookup[T] | undefined> => {
        return ((await kv.get(entityType)) as EntityLookup[T][])?.find(
            (entity) => entity.id === id
        )
    }

    const create = async (
        entity: Omit<EntityLookup[T], 'id'>
    ): Promise<EntityLookup[T]> => {
        const entities = ((await kv.get(entityType)) as EntityLookup[T][]) ?? []
        let lastId = (await kv.get<number>('id')) ?? 0
        const newEntity = { ...entity, id: ++lastId } as EntityLookup[T]
        await kv.set('id', ++lastId)
        await kv.set(entityType, [...entities, newEntity])
        return newEntity
    }

    return {
        getAll,
        getById,
        create,
    }
}
