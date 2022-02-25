/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { randomElement } from "@/src/context/shared/random";
import { PoolParticipant } from "@/src/context/pool/entities/pool-participant.entity";

export class JackpotRepository {
  private tickets: Map<string, PoolParticipant>;
  private totalTickets: number;

  constructor() {
    this.tickets = new Map();
    this.totalTickets = 0;
  }

  existsTicket(jackpotKey: string): boolean {
    return this.tickets.has(jackpotKey);
  }

  addTickets(participant: PoolParticipant): void {
    this.tickets.set(participant.JackpotKey, participant);
    this.totalTickets += participant.Tickets;
  }

  updateTickets(currentKey: string, participant: PoolParticipant): string {
    const newKey = participant.JackpotKey;
    const beforeUpdateTickets = Number(currentKey.split("-")[1]);
    this.tickets.delete(currentKey);
    this.totalTickets-=beforeUpdateTickets;
    this.addTickets(participant);
    return newKey;
  }

  upsertTickets(currentKey: string, participant: PoolParticipant) {
    if (this.existsTicket(currentKey)) {
      this.updateTickets(currentKey, participant);
    } else {
      this.addTickets(participant);
    }
  }

  getWinner(): PoolParticipant | null {
    let winner = null;
    let totalTickets = 0;
    const winningTicket = randomElement(1, this.totalTickets);

    for (const [key, value] of this.tickets) {
      const [_, tickets] = key.split("-");
      totalTickets += Number(tickets);
      if (winningTicket <= totalTickets) {
        winner = value;
        break;
      }
    }
    return winner;
  }

  get TotalTicket(): number {
    return this.totalTickets;
  }
}
