import { DrinkType } from '@/types'

const { data: statuses } = await useFetch('/api/drink-status')
const { data: orders } = await useFetch('/api/drink')
const user = useState('user', () => '')

export const isAvailable = (drinkType: DrinkType) =>
    statuses.value?.find((s: { drinkType: any }) => s.drinkType === drinkType)
        ?.available ?? true

export const isOrdered = (drinkType: DrinkType) =>
    orders.value?.find((s: { drinkType: any }) => s.drinkType === drinkType)
        ?.user === user.value
