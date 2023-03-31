export class Circle{
    pos : any
    level : number
    angles : Array<any>
    radius: number
    gap : number
    constructor(pos: any,balllevel: number, angles: Array<any>, radius: number, gap: number) {
      this.pos=pos
      this.level = balllevel;
      this.angles = angles;
      this.radius = radius;
      this.gap = gap;
    }
  }