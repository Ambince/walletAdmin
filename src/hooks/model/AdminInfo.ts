export class AdminInfo {
  id: string;
  name: string;
  time: Date;
  public constructor(
    name: string,
    id?: string,
  ) {
    this.time = new Date();
    this.name = name;
    this.id = id ? id : '';
  }
}
