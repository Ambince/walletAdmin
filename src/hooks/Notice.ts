export class Notice {
  id: number;
  time: Date;
  name: string;
  title: string;
  content: string;
  lang: any;
  public constructor(
    title: string,
    content: string,
    lang?: any,
    id?: number,
    name?: string
  ) {
    this.title = title;
    this.content = content;
    this.time = new Date();
    this.name = name ? name : '';
    this.id = id ? id : 0;
    this.lang = lang ? lang : 'en';
  }
}
