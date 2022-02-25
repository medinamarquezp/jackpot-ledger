import { JackpotRepository } from '@/src/context/jackpot/repositories/jackpot.repository';
import { Participant } from '@/src/context/pool/entities/participant.entity';
import { PoolParticipant } from '@/src/context/pool/entities/pool-participant.entity';
import { getUid } from '@/src/context/shared/uids';

describe('Jackpot repository tests', () => {
  let participant: Participant;
  let poolParticipant: PoolParticipant;
  let competitor: Participant;
  let poolCompetitor: PoolParticipant;

  beforeAll(() => {
    participant = new Participant(getUid());
    poolParticipant = new PoolParticipant(participant, 100);
    competitor = new Participant(getUid());
    poolCompetitor = new PoolParticipant(competitor, 500);
  });

  it('should add tickets to jackpot', () => {
    const jackpotRepo = new JackpotRepository();
    jackpotRepo.addTickets(poolParticipant);
    expect(jackpotRepo.TotalTicket).toBe(100);
    expect(jackpotRepo.existsTicket(poolParticipant.JackpotKey)).toBe(true);
  });

  it('should add tickets to jackpot by using upsert method', () => {
    const jackpotRepo = new JackpotRepository();
    const currentKey = poolParticipant.JackpotKey;
    jackpotRepo.upsertTickets(currentKey, poolParticipant);
    expect(jackpotRepo.TotalTicket).toBe(100);
    expect(jackpotRepo.existsTicket(poolParticipant.JackpotKey)).toBe(true);
  });

  it('should update existing tickets', () => {
    const jackpotRepo = new JackpotRepository();
    const currentKey = poolParticipant.JackpotKey;
    jackpotRepo.addTickets(poolParticipant);
    poolParticipant.addTokens(20);
    jackpotRepo.updateTickets(currentKey, poolParticipant);
    expect(jackpotRepo.TotalTicket).toBe(120);
    expect(jackpotRepo.existsTicket(poolParticipant.JackpotKey)).toBe(true);
  });

  it('should update existing tickets by using upsert method', () => {
    poolParticipant.substractTokens(20);
    const jackpotRepo = new JackpotRepository();
    const currentKey = poolParticipant.JackpotKey;
    jackpotRepo.addTickets(poolParticipant);
    poolParticipant.addTokens(20);
    jackpotRepo.upsertTickets(currentKey, poolParticipant);
    expect(jackpotRepo.TotalTicket).toBe(120);
    expect(jackpotRepo.existsTicket(poolParticipant.JackpotKey)).toBe(true);
  });

  it('should get a winner', () => {
    const jackpotRepo = new JackpotRepository();
    jackpotRepo.addTickets(poolParticipant);
    jackpotRepo.addTickets(poolCompetitor);
    const winner = jackpotRepo.getWinner();
    const winnerAddress = winner?.ParticipantAddress || "";
    const isWinnerInPlayers = [
      poolParticipant.ParticipantAddress, 
      poolCompetitor.ParticipantAddress
    ].includes(winnerAddress);
    expect(isWinnerInPlayers).toBe(true);
  });
});
