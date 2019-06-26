import { OperatorNode } from '../models/decorators/OperatorNode';

export interface OperatorNodeStrategy {
  onDragStart(node: OperatorNode, x, y, shiftKey, ctrlKey): void;
  onDragEnd(node: OperatorNode, x, y, shiftKey, ctrlKey): void;
}
