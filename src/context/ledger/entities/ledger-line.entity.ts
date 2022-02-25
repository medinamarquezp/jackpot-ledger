import { getUid } from "../../shared/uids";

export class LedgerLine {
  private id: string;
  private date: Date;
  private address: string;
  private balance: number;

  constructor(address: string, balance: number) {
    this.id =  getUid();
    this.date = new Date();
    this.address = address;
    this.balance = balance;
  }

  getLineAsObject(): object {
    return { ...this };
  }

  get Address () {
    return this.address;
  }

  get Balance () {
    return this.balance;
  }
}