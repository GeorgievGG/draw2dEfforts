import draw2d from "draw2d"
import { PortLabel } from './PortLabel';
import { PortImage } from './PortImage';

export class OperatorNode extends draw2d.shape.node.Between {
  static readonly idleColor : string = "#FFFFFF";
  static readonly activeColor : string = "#AFEEEE";

  static readonly defaultAttribs : Object = {x: 200, y:500, width:100, height:40, bgColor: OperatorNode.idleColor, cssClass: "operatorNode"};

  readonly label : string;
  readonly imagePath : string;
  readonly attribs : Object;

  strategy : OperatorNodeStrategy = new MenuStrategy;

  constructor(attribs : Object, labelText : string = "Operation", imagePath : string = null) {
    super(Object.assign(attribs, OperatorNode.defaultAttribs));
    this.label = labelText;
    this.attribs = Object.assign(attribs, OperatorNode.defaultAttribs);
    
    super.add(new PortLabel(this, labelText), new draw2d.layout.locator.CenterLocator());

    if (imagePath) {
      this.imagePath = imagePath;
      super.add(new PortImage(this), new draw2d.layout.locator.XYRelPortLocator(0.5, 0));
    }
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

  clone() : OperatorNode {
    return new OperatorNode(this.attribs, this.label, this.imagePath);
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
    node.getCanvas().add(node.clone());
    node.strategy = new ActiveStrategy;
  }

  onDragEnd(node : OperatorNode, x, y, shiftKey, ctrlKey) {}
}