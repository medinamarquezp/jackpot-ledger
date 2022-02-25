import { PoolParticipant } from "../entities/pool-participant.entity";

export class PoolRepository {
  private pool: Map<string, PoolParticipant>;

  constructor() {
    this.pool = new Map();
  }

  getParticipant(address: string): PoolParticipant | null {
    if (!this.pool.has(address)) return null;
    return this.pool.get(address) as PoolParticipant;
  }

  upsertParticipant(participant: PoolParticipant) {
    this.pool.set(participant.ParticipantAddress, participant);
  }

  totalParticipants(): number {
    return this.pool.size;
  }
}