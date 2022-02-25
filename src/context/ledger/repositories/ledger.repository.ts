import { LedgerLine } from "../entities/ledger-line.entity";

export class LedgerRepository {
  private ledger: LedgerLine[] = [];

  addNewLine(line: LedgerLine): number {
    return this.ledger.push(line);
  }

  getLedger(): LedgerLine[] {
    return this.ledger;
  }

  getTotalOperations(): number {
    return this.ledger.length;
  }

  getBalance(address: string): number {
    let balance = 0;
    this.ledger.forEach(line => {
      if (line.Address === address) {
        balance+= line.Balance;
      }
    });
    return balance;
  }
}