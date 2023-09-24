// import { useNuxtApp } from 'nuxt/app'

import { EntityType, useService } from '~/server/data/db'

export default defineEventHandler(async () => {
    // const app = useNuxtApp()
    const { getAll } = useService(EntityType.Game)
    return getAll()
})
