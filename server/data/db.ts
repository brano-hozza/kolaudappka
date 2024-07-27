import { kv } from "@vercel/kv";
import type {
  DrinkOrder,
  DrinkStatus,
  GameVote,
  SnackOrder,
  SnackStatus,
  Rating,
} from "~~/server/models";
import type { EntityType } from "~~/types";

interface EntityLookup {
  [EntityType.GameVote]: GameVote;
  [EntityType.SnackOrder]: SnackOrder;
  [EntityType.SnackStatus]: SnackStatus;
  [EntityType.DrinkOrder]: DrinkOrder;
  [EntityType.DrinkStatus]: DrinkStatus;
  [EntityType.Rating]: Rating;
}

export function useRepository<T extends EntityType>(entityType: T) {
  const getAll = async (): Promise<EntityLookup[T][]> => {
    return (await kv.get(entityType)) ?? [];
  };
  const get = async (id: number): Promise<EntityLookup[T] | undefined> => {
    return ((await kv.get(entityType)) as EntityLookup[T][])?.find(
      (entity) => entity.id === id,
    );
  };

  const getByProperty = async <K extends keyof EntityLookup[T]>(
    key: K,
    value: EntityLookup[T][K],
  ) => {
    return ((await kv.get(entityType)) as EntityLookup[T][])?.find(
      (entity) => entity[key] === value,
    );
  };

  const create = async (
    entity: Omit<EntityLookup[T], "id">,
  ): Promise<EntityLookup[T]> => {
    const entities = ((await kv.get(entityType)) as EntityLookup[T][]) ?? [];
    let lastId = (await kv.get<number>("id")) ?? 0;
    const newEntity = {
      ...entity,
      id: ++lastId,
    } as EntityLookup[T];
    await kv.set("id", ++lastId);
    await kv.set(entityType, [...entities, newEntity]);
    return newEntity;
  };

  const update = async (id: number, entity: Omit<EntityLookup[T], "id">) => {
    const entities = (await kv.get(entityType)) as EntityLookup[T][];
    const newEntities = entities.map((e) => {
      if (e.id === id) {
        return entity;
      }
      return e;
    });
    await kv.set(entityType, newEntities);
  };

  const deleteAll = async () => {
    await kv.del(entityType);
  };

  const deleteById = async (id: number) => {
    const entities = (await kv.get(entityType)) as EntityLookup[T][];
    const newEntities = entities.filter((e) => e.id !== id);
    await kv.set(entityType, newEntities);
  };

  return {
    getAll,
    get,
    getByProperty,
    create,
    update,
    deleteAll,
    deleteById,
  };
}
