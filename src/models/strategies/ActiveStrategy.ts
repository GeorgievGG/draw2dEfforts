import { OperatorNodeStrategy } from '../../contracts/OperatorNodeStrategy';
import { OperatorNode } from '../decorators/OperatorNode';

export class ActiveStrategy implements OperatorNodeStrategy {
  onDragStart(node: OperatorNode, x, y, shiftKey, ctrlKey) { }

  onDragEnd(node: OperatorNode, x, y, shiftKey, ctrlKey) {
    setTimeout(() => {
      if (node.getComposite() == null || !node.getComposite().hitTest(x, y)) 
        this.removeNode(node);
      else
        this.alignToGrid(node);
    }, 1);
  }

  private removeNode(node: OperatorNode) {
    node.getCanvas().remove(node);
  }

  private alignToGrid(node: OperatorNode) {
      node.setX(Math.round(node.getX() / 20) * 20);
      node.setY(Math.round(node.getY() / 20) * 20);
  }
}
