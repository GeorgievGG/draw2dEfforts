import { OperatorNodeStrategy } from '../../contracts/OperatorNodeStrategy';
import { OperatorNode } from '../decorators/OperatorNode';

export class ActiveStrategy implements OperatorNodeStrategy {
  constructor(private readonly node: OperatorNode) {
    node.defaultPorts();
  }

  onDragStart(x, y, shiftKey, ctrlKey) { }

  onDragEnd(x, y, shiftKey, ctrlKey) {
    setTimeout(() => {
      if (this.node.getComposite() == null || !this.node.getComposite().hitTest(x, y)) 
        this.removeNode();
      else
        this.alignToGrid();
    }, 1);
  }

  private removeNode() {
    this.node.getCanvas().remove(this.node);
  }

  private alignToGrid() {
      this.node.setX(Math.round(this.node.getX() / 20) * 20);
      this.node.setY(Math.round(this.node.getY() / 20) * 20);
  }
}
