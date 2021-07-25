export class AdminInfo {
  id: string;
  name: string;
  time: string;
  public constructor(
    name: string,
    id?: string,
  ) {
    this.time = new Date().toLocaleString();
    this.name = name;
    this.id = id ? id : '';
  }
}
