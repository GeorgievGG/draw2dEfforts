import draw2d from "draw2d"

export class BetweenNode extends draw2d.shape.node.Between {
  strategy : BetweenNodeStrategy = new MenuStrategy;

  constructor(attribs : any) {
    super(attribs);
  }

  getCanvas() { return super.getCanvas(); }
  getX() { return super.getX(); }
  getY() { return super.getY(); }
  setX(x : number) : void { super.setX(x); }
  setY(y : number) : void { super.setY(y); }

  onMouseEnter() : void {
    super.setBackgroundColor("#AFEEEE");
    super.setStroke(1);
  }

  onMouseLeave() : void {
    super.setBackgroundColor("#222222");
    super.setStroke(0);
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

interface BetweenNodeStrategy {
  onDragStart(node : BetweenNode, x, y, shiftKey, ctrlKey) : void;
  onDragEnd(node : BetweenNode, x, y, shiftKey, ctrlKey) : void;
}

class ActiveStrategy implements BetweenNodeStrategy {
  onDragStart(node : BetweenNode, x, y, shiftKey, ctrlKey) {}

  onDragEnd(node : BetweenNode, x, y, shiftKey, ctrlKey) {
    if (node.getY() > 500) node.getCanvas().remove(node);
    else {
      setTimeout(() => {
        node.setX(Math.round(node.getX() / 50) * 50);
        node.setY(Math.round(node.getY() / 50) * 50);
      }, 1);
    }
  }
}

class MenuStrategy implements BetweenNodeStrategy {
  onDragStart(node : BetweenNode, x, y, shiftKey, ctrlKey) {
    node.getCanvas().add(new BetweenNode({x: node.getX(), y: node.getY()}));
    node.strategy = new ActiveStrategy;
  }

  onDragEnd(node : BetweenNode, x, y, shiftKey, ctrlKey) {}
}