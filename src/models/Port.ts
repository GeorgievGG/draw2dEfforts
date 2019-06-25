import { ElementType } from './ElementType';

export class Port {
  private _name: string;
  private _type: ElementType;
  private _width: number;
  private _height: number;

  constructor(name: string, type: ElementType) {
    this.name = name;
    this.type = type;
    this._width = 105;
    this._height = 20;
  }

  get name(): string {
    return this._name;
  }
  set name(value: string) {
    this._name = value;
  }

  get type(): ElementType {
    return this._type;
  }
  set type(value: ElementType) {
    this._type = value;
  }

  get height(): number {
    return this._height;
  }

  get width(): number {
    return this._width;
  }
};
