// import { useNuxtApp } from 'nuxt/app'

import { useService } from '~/server/data/db'
import { EntityType } from '~/types'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    if (!(body.drinkType && body.name)) {
        throw createError({
            statusCode: 400,
            message: 'Missing required fields',
        })
    }

    const { create } = useService(EntityType.Drink)
    await create({
        drinkType: body.drinkType,
        name: body.name,
    })
})
