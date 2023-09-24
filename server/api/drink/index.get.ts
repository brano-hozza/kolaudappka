// import { useNuxtApp } from 'nuxt/app'

import { useService } from '~/server/data/db'
import { EntityType } from '~/types'

export default defineEventHandler(async () => {
    // const app = useNuxtApp()
    const { getAll } = useService(EntityType.Drink)
    return getAll()
})
