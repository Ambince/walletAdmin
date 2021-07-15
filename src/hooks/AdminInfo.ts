export class AdminInfo {
  id: number;
  name: string;
  time: Date;
  public constructor(
    name: string,
    id?: number,
  ) {
    this.time = new Date();
    this.name = name;
    this.id = id ? id : 0;
  }
}
