import { LedgerLine } from "@/src/context/ledger/entities/ledger-line.entity";
import { LedgerRepository } from "@/src/context/ledger/repositories/ledger.repository";
import { getUid } from "@/src/context/shared/uids";

describe('Ledger repository tests', () => {
  let addressAlpha: string, addressBeta: string;
  let line1: LedgerLine, line2: LedgerLine, line3: LedgerLine, line4: LedgerLine;

  beforeAll(() => {
    addressAlpha = getUid();
    addressBeta = getUid();
    line1 = new LedgerLine(addressAlpha, 100);
    line2 = new LedgerLine(addressBeta, 512);
    line3 = new LedgerLine(addressAlpha, 260);
    line4 = new LedgerLine(addressBeta, -12);
  });

  it('should get ledgerLine like an object', () => {
    const object = {
      id: line1.Id,
      date: line1.Date,
      address: line1.Address,
      balance: line1.Balance
    }
    expect(line1.getLineAsObject()).toEqual(object);
  });

  it('should add a new line to ledger', () => {
    const ledgerRepo = new LedgerRepository();
    ledgerRepo.addNewLine(line1);
    ledgerRepo.addNewLine(line2);
    expect(ledgerRepo.getTotalOperations()).toBe(2);
  });

  it('should get an address balance', () => {
    const ledgerRepo = new LedgerRepository();
    ledgerRepo.addNewLine(line1);
    ledgerRepo.addNewLine(line2);
    ledgerRepo.addNewLine(line3);
    ledgerRepo.addNewLine(line4);
    expect(ledgerRepo.getBalance(addressAlpha)).toBe(360);
    expect(ledgerRepo.getBalance(addressBeta)).toBe(500);
  });
});