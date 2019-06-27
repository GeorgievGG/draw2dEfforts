import { OperatorNodeStrategy } from '../../contracts/OperatorNodeStrategy';
import { OperatorNode } from '../decorators/OperatorNode';
import draw2d from "draw2d";

export class ActiveStrategy implements OperatorNodeStrategy {
  constructor(private readonly node: OperatorNode) {
    node.defaultPorts();
    node.removeCssClass('persists-filter');
  }

  onDragStart(x, y, shiftKey, ctrlKey) { }

  onDragEnd(x, y, shiftKey, ctrlKey) {
    setTimeout(() => {
      if (this.node.getComposite() == null || !this.node.getComposite().hitTest(x, y)) 
        this.removeNode();
      else
        this.alignToGrid(this.node.getComposite());
    }, 1);
  }

  private removeNode() {
    this.node.getCanvas().getCommandStack().execute(new draw2d.command.CommandDelete(this.node));
  }

  private alignToGrid(parent) {
    this.node.setX(Math.round(this.node.getX() / 20) * 20);
    this.node.setY(Math.round(this.node.getY() / 20) * 20);

    // Snap to inside the parent.
    let nodeBox = this.node.getBoundingBox();
    let parentBox = parent.getBoundingBox();
    
    if (nodeBox.getLeft() < parentBox.getLeft())
      this.node.setX(parent.getX());
    else if (nodeBox.getRight() > parentBox.getRight())
      this.node.setX(parent.getX() + parent.getWidth() - this.node.getWidth());
    
    if (nodeBox.getTop() < parentBox.getTop())
      this.node.setY(parent.getY());
    else if (nodeBox.getBottom() > parentBox.getBottom())
      this.node.setY(parent.getY() + parent.getHeight() - this.node.getHeight());
  }
}
