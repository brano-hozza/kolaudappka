import { useRepository } from '../data/db'
import { EntityType } from '~/types'
import { VoteForGameDTO } from '~/types/dtos'

export const useGameService = () => {
    const repository = useRepository(EntityType.GameVote)
    const voteForGame = async (dto: VoteForGameDTO) => {
        const vote = await repository.getByProperty('user', dto.user)
        if (!vote) {
            await repository.create(dto)
            return
        }
        await repository.update(vote.id, dto)
    }

    const getAllVotes = async () => {
        return await repository.getAll()
    }

    const getVoteOfUser = async (user: string) => {
        return (await repository.getByProperty('user', user)) ?? null
    }

    const finishVoting = async () => {
        await repository.deleteAll()
    }

    return {
        voteForGame,
        getAllVotes,
        getVoteOfUser,
        finishVoting,
    }
}
