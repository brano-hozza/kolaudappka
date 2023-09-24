// import { useNuxtApp } from 'nuxt/app'

import { useService } from '~/server/data/db'
import { EntityType } from '~/types'

let id_counter = 0

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    if (!(body.drinkType && body.name)) {
        throw createError({
            statusCode: 400,
            message: 'Missing required fields',
        })
    }

    const { create } = useService(EntityType.Drink)
    const id = id_counter++
    return create({
        id,
        drinkType: body.drinkType,
        name: body.name,
    })
})
