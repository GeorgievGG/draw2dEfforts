import draw2d from "draw2d"
import { PortLabel } from './PortLabel';

export class OperatorNode extends draw2d.shape.node.Between {
  static idleColor : string = "#FFFFFF";
  static activeColor : string = "#AFEEEE";

  strategy : OperatorNodeStrategy = new MenuStrategy;

  constructor(attribs : any) {
    super(Object.assign(attribs, {x: 200, y:500, width:100, height:40, bgColor: OperatorNode.idleColor, cssClass: "operatorNode"}));
    super.add(new PortLabel(this, "Operation"), new draw2d.layout.locator.CenterLocator());
  }

  getCanvas() { return super.getCanvas(); }
  getX() { return super.getX(); }
  getY() { return super.getY(); }
  setX(x : number) : void { super.setX(x); }
  setY(y : number) : void { super.setY(y); }

  onMouseEnter() : void {
    super.setBackgroundColor(OperatorNode.activeColor);
  }

  onMouseLeave() : void {
    super.setBackgroundColor(OperatorNode.idleColor);
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

interface OperatorNodeStrategy {
  onDragStart(node : OperatorNode, x, y, shiftKey, ctrlKey) : void;
  onDragEnd(node : OperatorNode, x, y, shiftKey, ctrlKey) : void;
}

class ActiveStrategy implements OperatorNodeStrategy {
  onDragStart(node : OperatorNode, x, y, shiftKey, ctrlKey) {}

  onDragEnd(node : OperatorNode, x, y, shiftKey, ctrlKey) {
    if (node.getY() > 500) node.getCanvas().remove(node);
    else {
      setTimeout(() => {
        node.setX(Math.round(node.getX() / 20) * 20);
        node.setY(Math.round(node.getY() / 20) * 20);
      }, 1);
    }
  }
}

class MenuStrategy implements OperatorNodeStrategy {
  onDragStart(node : OperatorNode, x, y, shiftKey, ctrlKey) {
    node.getCanvas().add(new OperatorNode({x: node.getX(), y: node.getY()}));
    node.strategy = new ActiveStrategy;
  }

  onDragEnd(node : OperatorNode, x, y, shiftKey, ctrlKey) {}
}