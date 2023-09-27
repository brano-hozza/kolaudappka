import { kv } from '@vercel/kv'
import { Drink, EntityType, Game, Snack } from '~/types'

interface EntityLookup {
    [EntityType.Game]: Game
    [EntityType.Snack]: Snack
    [EntityType.Drink]: Drink
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
        entity: Omit<EntityLookup[T], 'id' | 'resolved'>
    ): Promise<EntityLookup[T]> => {
        const entities = ((await kv.get(entityType)) as EntityLookup[T][]) ?? []
        let lastId = (await kv.get<number>('id')) ?? 0
        const newEntity = {
            ...entity,
            id: ++lastId,
            resolved: false,
        } as EntityLookup[T]
        await kv.set('id', ++lastId)
        await kv.set(entityType, [...entities, newEntity])
        return newEntity
    }

    const resolve = async (id: number) => {
        const entities = (await kv.get(entityType)) as EntityLookup[T][]
        const newEntities = entities.map((e) => {
            if (e.id === id) {
                e.resolved = true
            }
            return e
        })
        await kv.set(entityType, newEntities)
    }

    const deleteAll = async () => {
        await kv.del(entityType)
    }

    return {
        getAll,
        getById,
        create,
        resolve,
        deleteAll,
    }
}
