import { getUid } from "@/src/context/shared/uids";
import { Participant } from "@/src/context/pool/entities/participant.entity";
import { PoolRepository } from "@/src/context/pool/repositories/pool.repository";
import { PoolParticipant } from "@/src/context/pool/entities/pool-participant.entity";
import { LedgerRepository } from "@/src/context/ledger/repositories/ledger.repository";
import { JackpotRepository } from "@/src/context/jackpot/repositories/jackpot.repository";
import { TransactionsService } from "@/src/context/transactions/services/transactions.service";

describe('Transactions service tests', () => {
  let participantAlpha: Participant;
  let poolParticipantAlpha: PoolParticipant;
  let participantBeta: Participant;
  let poolParticipantBeta: PoolParticipant;
  let poolRepository: PoolRepository;
  let jackpotRepository: JackpotRepository;
  let ledgerRepository: LedgerRepository;
  let transactionsService: TransactionsService;

  beforeEach(() => {
    participantAlpha = new Participant(getUid());
    poolParticipantAlpha = new PoolParticipant(participantAlpha, 100);
    participantBeta = new Participant(getUid());
    poolParticipantBeta = new PoolParticipant(participantBeta, 500);
    poolRepository = new PoolRepository();
    jackpotRepository = new JackpotRepository();
    ledgerRepository = new LedgerRepository();
    transactionsService = new TransactionsService(poolRepository, jackpotRepository, ledgerRepository);
  });

  it('should add a deposit', () => {
    transactionsService.deposit(poolParticipantAlpha, 50);
    expect(poolParticipantAlpha.Tokens).toBe(150);
    expect(poolRepository.totalParticipants()).toBe(1);
    expect(poolRepository.getParticipant(poolParticipantAlpha.ParticipantAddress)).toEqual(poolParticipantAlpha);
    expect(ledgerRepository.getTotalOperations()).toBe(1);
    expect(ledgerRepository.getBalance(poolParticipantAlpha.ParticipantAddress)).toBe(50);
    expect(jackpotRepository.TotalTicket).toBe(150);
    expect(jackpotRepository.existsTicket(poolParticipantAlpha.JackpotKey)).toBe(true);
    expect(jackpotRepository.getWinner()).toEqual(poolParticipantAlpha);
  });

  it('should make a withdrawal', () => {
    transactionsService.withdraw(poolParticipantBeta, 100);
    expect(poolParticipantBeta.Tokens).toBe(400);
    expect(poolRepository.totalParticipants()).toBe(1);
    expect(poolRepository.getParticipant(poolParticipantBeta.ParticipantAddress)).toEqual(poolParticipantBeta);
    expect(ledgerRepository.getTotalOperations()).toBe(1);
    expect(ledgerRepository.getBalance(poolParticipantBeta.ParticipantAddress)).toBe(-100);
    expect(jackpotRepository.TotalTicket).toBe(400);
    expect(jackpotRepository.existsTicket(poolParticipantBeta.JackpotKey)).toBe(true);
    expect(jackpotRepository.getWinner()).toEqual(poolParticipantBeta);
  });
});