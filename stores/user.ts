import { defineStore } from 'pinia'

interface State {
    name: string
    isAdmin: boolean
    partyCode: string
}

export const useUserStore = defineStore('user', {
    state: (): State => ({
        name: '',
        isAdmin: false,
        partyCode: '',
    }),
    getters: {
        getName(): string {
            return this.name
        },
        getIsAdmin(): boolean {
            return this.isAdmin
        },
        getPartyCode(): string {
            return this.partyCode
        },
    },
    actions: {
        setName(name: string): void {
            this.name = name
        },
        setIsAdmin(isAdmin: boolean): void {
            this.isAdmin = isAdmin
        },
        setPartyCode(partyCode: string): void {
            this.partyCode = partyCode
        },
    },
})
