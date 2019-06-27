import { OperatorNode } from '../models/decorators/OperatorNode';

export interface OperatorNodeStrategy {
  onDragStart(x, y, shiftKey, ctrlKey): void;
  onDragEnd(x, y, shiftKey, ctrlKey): void;
}
