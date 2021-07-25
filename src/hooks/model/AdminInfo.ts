export class AdminInfo {
  id: string;
  name: string;
  time: string;
  address: string;
  public constructor(
    name: string,
    address?: string,
    id?: string
  ) {
    this.time = new Date().toLocaleString();
    this.name = name;
    this.id = id ? id : '';
    this.address = address ? address : '';
  }
}
