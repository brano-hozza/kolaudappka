import { useRepository } from "../data/db";
import { EntityType } from "~~/types";
import type { VoteForGameDTO } from "~~/types/dtos";

export const useGameService = () => {
  const repository = useRepository(EntityType.GameVote);
  const voteForGame = async (dto: VoteForGameDTO) => {
    const vote = await repository.getByProperty("user", dto.user);
    if (!vote) {
      await repository.create({
        gameType: dto.type,
        user: dto.user,
      });
      return;
    }
    await repository.update(vote.id, {
      gameType: dto.type,
      user: dto.user,
    });
  };

  const getAllVotes = async () => {
    return await repository.getAll();
  };

  const getVoteOfUser = async (user: string) => {
    return (await repository.getByProperty("user", user)) ?? null;
  };

  const finishVoting = async () => {
    await repository.deleteAll();
  };

  return {
    voteForGame,
    getAllVotes,
    getVoteOfUser,
    finishVoting,
  };
};
