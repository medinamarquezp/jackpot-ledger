export class Participant {
  private address: string;

  constructor(address: string) {
    this.address = address;
  }

  get Address() {
    return this.address;
  }

  set Address(adress: string) {
    this.address = adress;
  }
}