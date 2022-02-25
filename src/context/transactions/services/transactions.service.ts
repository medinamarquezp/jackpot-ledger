import { PoolParticipant } from "@/src/context/pool/entities/pool-participant.entity";
import { LedgerRepository } from "@/src/context/ledger/repositories/ledger.repository";
import { LedgerLine } from "@/src/context/ledger/entities/ledger-line.entity";
import { PoolRepository } from "@/src/context/pool/repositories/pool.repository";
import { JackpotRepository } from "@/src/context/jackpot/repositories/jackpot.repository";

export class TransactionsService {
  private poolRepository: PoolRepository;
  private jackpotRepository: JackpotRepository;
  private ledgerRepository: LedgerRepository;

  constructor(
    poolRepository: PoolRepository,
    jackpotRepository: JackpotRepository,
    ledgerRepository: LedgerRepository
  ) {
    this.poolRepository = poolRepository;
    this.jackpotRepository = jackpotRepository;
    this.ledgerRepository = ledgerRepository;
  }

  deposit(participant: PoolParticipant, amount: number) {
    if (amount < 0) throw new Error("Deposit must receive a positive amount");
    // Get current jackpot key before update it
    const currentKey = participant.JackpotKey;
    // Update pool registry
    participant.addTokens(amount);
    this.poolRepository.upsertParticipant(participant);
    // Add new line to ledger
    const ledgerLine = new LedgerLine(participant.ParticipantAddress, amount);
    this.ledgerRepository.addNewLine(ledgerLine);
    // Update jackpot registry
    this.jackpotRepository.upsertTickets(currentKey, participant);
  }

  withdraw(participant: PoolParticipant, amount: number) {
    if (amount < 0) amount*= -1;
    // Get current jackpot key before update it
    const currentKey = participant.JackpotKey;
    // Update pool registry
    participant.substractTokens(amount);
    this.poolRepository.upsertParticipant(participant);
    // Add new line to ledger
    const ledgerLine = new LedgerLine(participant.ParticipantAddress, -amount);
    this.ledgerRepository.addNewLine(ledgerLine);
    // Update jackpot registry
    this.jackpotRepository.upsertTickets(currentKey, participant);
  }
}
