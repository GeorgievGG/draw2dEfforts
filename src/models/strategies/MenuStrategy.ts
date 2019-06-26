import { OperatorNodeStrategy } from '../../contracts/OperatorNodeStrategy';
import { OperatorNode } from '../decorators/OperatorNode';
import { ActiveStrategy } from './ActiveStrategy';

export class MenuStrategy implements OperatorNodeStrategy {
  onDragStart(node: OperatorNode, x, y, shiftKey, ctrlKey) {
    let newNode = node.clone();
    node.getCanvas().add(newNode);
    node.strategy = new ActiveStrategy;
  }

  onDragEnd(node: OperatorNode, x, y, shiftKey, ctrlKey) { }
}
