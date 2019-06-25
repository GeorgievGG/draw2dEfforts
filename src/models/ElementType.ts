export class ElementType {
  private _name: string;
  private readonly _initialXCoord: number;
  private readonly _initialYCoord: number;

  constructor(name: string, initialXCoord: number, initialYCoord: number) {
    this.name = name;
    this._initialXCoord = initialXCoord;
    this._initialYCoord = initialYCoord;
  }

  get name(): string {
    return this._name;
  }
  set name(value: string) {
    this._name = value;
  }

  get initialXCoord(): number {
    return this._initialXCoord;
  }

  get initialYCoord(): number {
    return this._initialYCoord;
  }
};
