import { OperatorNodeStrategy } from '../../contracts/OperatorNodeStrategy';
import { OperatorNode } from '../decorators/OperatorNode';
import { ActiveStrategy } from './ActiveStrategy';

export class MenuStrategy implements OperatorNodeStrategy {
  constructor(private readonly node: OperatorNode) {
    node.resetPorts();
    node.addCssClass('persists-filter');
    node.setSelectable(false);
  }

  onDragStart(x, y, shiftKey, ctrlKey) {
    let newNode = this.node.clone();
    this.node.getCanvas().add(newNode);
    this.node.strategy = new ActiveStrategy(this.node);
  }

  onDragEnd(x, y, shiftKey, ctrlKey) { }
}
