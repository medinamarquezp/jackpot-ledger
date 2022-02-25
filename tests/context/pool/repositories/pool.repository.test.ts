import { Participant } from "@/src/context/pool/entities/participant.entity";
import { PoolParticipant } from "@/src/context/pool/entities/pool-participant.entity";
import { PoolRepository } from "@/src/context/pool/repositories/pool.repository";
import { getUid } from "@/src/context/shared/uids";

describe('Pool repository tests', () => {
  let participantAlpha: Participant;
  let poolParticipantAlpha: PoolParticipant;
  let participantBeta: Participant;
  let poolParticipantBeta: PoolParticipant;

  beforeAll(() => {
    participantAlpha = new Participant(getUid());
    poolParticipantAlpha = new PoolParticipant(participantAlpha, 100);
    participantBeta = new Participant(getUid());
    poolParticipantBeta = new PoolParticipant(participantBeta, 500);
  });

  it('should add a new participant', () => {
    const poolRepository = new PoolRepository();
    poolRepository.upsertParticipant(poolParticipantAlpha);
    expect(poolRepository.totalParticipants()).toBe(1);
  });

  it('should find an existing participant', () => {
    const poolRepository = new PoolRepository();
    poolRepository.upsertParticipant(poolParticipantAlpha);
    expect(poolRepository.getParticipant(participantAlpha.Address)).toEqual(poolParticipantAlpha);
  });

  it('should update an existing participant', () => {
    const poolRepository = new PoolRepository();
    poolRepository.upsertParticipant(poolParticipantAlpha);
    poolRepository.upsertParticipant(poolParticipantBeta);
    expect(poolRepository.totalParticipants()).toBe(2);
    poolParticipantBeta.addTokens(50);
    poolRepository.upsertParticipant(poolParticipantBeta);
    const participantFromRepo = poolRepository.getParticipant(poolParticipantBeta.ParticipantAddress);
    expect(participantFromRepo?.Tokens).toBe(550);
  });
});