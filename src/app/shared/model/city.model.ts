export class City{
    constructor(
      public id: number,
      public name: string,
      public country: string,
      public coord?: object,
    ){}
}