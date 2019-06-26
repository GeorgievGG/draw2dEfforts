import draw2d from "draw2d"
import { PortLabel } from './PortLabel';
import { OperatorNodeStrategy } from '../../contracts/OperatorNodeStrategy';
import { MenuStrategy } from '../strategies/MenuStrategy';

export class OperatorNode extends draw2d.shape.node.Between {
  private static readonly ACTIVE_COLOR_LBLUE: string = "#AFEEEE";
  private static readonly IDLE_COLOR_WHITE: string = "#FFFFFF";

  strategy : OperatorNodeStrategy = new MenuStrategy;

  constructor(attribs : any) {
    super(Object.assign(attribs, { x: 200, y: 500, width: 100, height: 40, bgColor: OperatorNode.IDLE_COLOR_WHITE, cssClass: "operatorNode" }));
    let label = new PortLabel(this, "Operation");
    let toCenter = new draw2d.layout.locator.CenterLocator();
    super.add(label, toCenter);
  }

  getCanvas() { return super.getCanvas(); }
  getX() { return super.getX(); }
  getY() { return super.getY(); }
  setX(x : number) : void { super.setX(x); }
  setY(y : number) : void { super.setY(y); }

  onMouseEnter() : void {
    super.setBackgroundColor(OperatorNode.ACTIVE_COLOR_LBLUE);
  }

  onMouseLeave() : void {
    super.setBackgroundColor(OperatorNode.IDLE_COLOR_WHITE);
  }

  onDragStart(x, y, shiftKey, ctrlKey) {
    let result = super.onDragStart(x, y, shiftKey, ctrlKey);
    this.strategy.onDragStart(this, x, y, shiftKey, ctrlKey);
    return result;
  }

  onDragEnd(x, y, shiftKey, ctrlKey) {
    let result = super.onDragEnd(x, y, shiftKey, ctrlKey);
    this.strategy.onDragEnd(this, x, y, shiftKey, ctrlKey);
    return result;
  }
}
