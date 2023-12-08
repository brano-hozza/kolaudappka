import { defineStore } from 'pinia'
import { DrinkType, GameType, SnackType } from '~/types'

interface State {
    name: string
    code: string
    startDateTime: Date
    evalStartTime: Date
    jamLink: string
    drinkMenu: DrinkType[]
    snackMenu: SnackType[]
    gameMenu: GameType[]
}

export const usePartyStore = defineStore('party', {
    state: (): State => ({
        name: '',
        code: '',
        startDateTime: new Date(),
        evalStartTime: new Date(),
        jamLink: '',
        drinkMenu: [],
        snackMenu: [],
        gameMenu: [],
    }),
    getters: {
        getName(): string {
            return this.name
        },
        getCode(): string {
            return this.code
        },
        getStartDateTime(): Date {
            return this.startDateTime
        },
        getEvalStartTime(): Date {
            return this.evalStartTime
        },
        getJamLink(): string {
            return this.jamLink
        },
        getDrinkMenu(): DrinkType[] {
            return this.drinkMenu
        },
        getSnackMenu(): SnackType[] {
            return this.snackMenu
        },
        getGameMenu(): GameType[] {
            return this.gameMenu
        },
    },
    actions: {
        setName(name: string): void {
            this.name = name
        },
        setCode(code: string): void {
            this.code = code
        },
        setStartDateTime(startDateTime: Date): void {
            this.startDateTime = startDateTime
        },
        setEvalStartTime(evalStartTime: Date): void {
            this.evalStartTime = evalStartTime
        },
        setJamLink(jamLink: string): void {
            this.jamLink = jamLink
        },
        setDrinkMenu(drinkMenu: DrinkType[]): void {
            this.drinkMenu = drinkMenu
        },
        setSnackMenu(snackMenu: SnackType[]): void {
            this.snackMenu = snackMenu
        },
        setGameMenu(gameMenu: GameType[]): void {
            this.gameMenu = gameMenu
        },
    },
})
