// import { useNuxtApp } from 'nuxt/app'

import { EntityType, useService } from '~/server/data/db'

let id_counter = 0

export default defineEventHandler(async () => {
    // const app = useNuxtApp()
    const { create } = useService(EntityType.Game)
    const id = id_counter++
    return create({
        id,
    })
})
