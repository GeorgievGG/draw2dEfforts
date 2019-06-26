import draw2d from "draw2d"
import { PortLabel } from './PortLabel';
import { OperatorNodeStrategy } from '../../contracts/OperatorNodeStrategy';
import { MenuStrategy } from '../strategies/MenuStrategy';
import { PortImage } from './PortImage';

export class OperatorNode extends draw2d.shape.node.Between {
  private static readonly ACTIVE_COLOR_LBLUE: string = "#AFEEEE";
  private static readonly IDLE_COLOR_WHITE: string = "#FFFFFF";

  private static readonly DEFAULT_ATTRIBS: Object = {width:100, height:40, bgColor: OperatorNode.IDLE_COLOR_WHITE, cssClass: "operatorNode"}

  private readonly label: string;
  private readonly imagePath: string;

  strategy : OperatorNodeStrategy = new MenuStrategy;

  constructor(attribs: Object, labelText: string = "Operation", imagePath: string = null) {
    super(Object.assign(attribs, OperatorNode.DEFAULT_ATTRIBS));
    super.setResizeable(false);

    this.label = labelText;

    let toCenter = new draw2d.layout.locator.CenterLocator();
    super.add(new PortLabel(this, labelText), toCenter);

    if (imagePath) {
      this.imagePath = imagePath;
      let toLeft = new draw2d.layout.locator.XYRelPortLocator(0, 0.5)
      super.add(new PortImage(this), toLeft);
    }

    let label = new PortLabel(this, "Operation");
  }

  getCanvas() { return super.getCanvas(); }
  getX() { return super.getX(); }
  getY() { return super.getY(); }
  setX(x : number) : void { super.setX(x); }
  setY(y : number) : void { super.setY(y); }
  getComposite() { return super.getComposite(); }

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

  clone(): OperatorNode {
    return new OperatorNode({x: super.getX(), y: super.getY()}, this.label, this.imagePath);
  }
}
