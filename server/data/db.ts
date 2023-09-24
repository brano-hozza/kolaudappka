import { Drink, Entity, EntityType, Game, Snack } from "~/types"

const drinks: Drink[] = []

const snacks: Snack[] = []

const games: Game[] = []

interface EntityLookup {
    [EntityType.Game]: Game
    [EntityType.Snack]: Snack
    [EntityType.Drink]: Drink
}

export function useService<T extends EntityType>(entityType: T) {
    const _getAll = (storage: Entity[]): Entity[] => storage

    const _getById = (storage: Entity[], id: number): Entity | undefined =>
        storage.find((entity) => entity.id === id)

    const _create = (storage: Entity[], entity: Entity): Entity => {
        storage.push(entity)
        return entity
    }

    let _storage: Entity[]
    switch (entityType) {
        case EntityType.Drink:
            _storage = drinks
            break
        case EntityType.Snack:
            _storage = snacks
            break
        case EntityType.Game:
            _storage = games
            break
    }

    return {
        getAll: () => _getAll(_storage) as EntityLookup[T][],
        getById: (id: number) => _getById(_storage, id) as EntityLookup[T],
        create: (entity: Omit<EntityLookup[T], 'entityType'>) =>
            _create(_storage, { ...entity, entityType }) as EntityLookup[T],
    }
}
