export class NoticeInfo {
  id: number;
  time: string;
  name: string;
  address: string;
  title: string;
  content: string;
  lang: any;
  public constructor(
    title: string,
    content: string,
    lang?: any,
    id?: number,
    name?: string,
    address?: string,
  ) {
    this.title = title;
    this.content = content;
    this.time = new Date().toLocaleString();
    this.name = name ? name : '';
    this.id = id ? id : 0;
    this.lang = lang ? lang : 'en';
    this.address = address ? address : '';
  }
}
