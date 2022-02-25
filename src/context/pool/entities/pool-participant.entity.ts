import { Participant } from "./participant.entity";

export class PoolParticipant {
  private participant: Participant;
  private tokens: number;
  private tickets: number;

  constructor(participant: Participant, tokens: number) {
    this.participant = participant;
    this.tokens = tokens;
    this.tickets = this.tokens;
  }

  addTokens(quantity: number): number {
    this.tokens = this.tokens + quantity;
    this.tickets = this.tokens;
    return this.tokens;
  }

  substractTokens(quantity: number): number {
    if (this.tokens < quantity) {
      throw new Error("Subtraction quantity is greater than number of tokens");
    }
    this.tokens = this.tokens - quantity;
    this.tickets = this.tokens;
    return this.tokens;
  }

  get Tokens(): number {
    return this.tokens;
  }

  get Tickets(): number {
    return this.tickets;
  }

  get ParticipantAddress(): string {
    return this.participant.Address;
  }

  get JackpotKey(): string {
    return `${this.ParticipantAddress}-${this.tickets}`;
  }
}