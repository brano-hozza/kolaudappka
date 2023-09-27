// import { useNuxtApp } from 'nuxt/app'

import { useService } from '~/server/data/db'
import { EntityType } from '~/types'

export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id')
    if (!id) {
        throw createError({
            statusText: 'Bad Request',
            statusCode: 400,
        })
    }
    const { resolve } = useService(EntityType.Drink)
    return await resolve(Number(id))
})
