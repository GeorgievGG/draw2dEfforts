import draw2d from 'draw2d';
import { Port } from '../Port';

export class DestinationPortNode extends draw2d.shape.node.End {
  private static readonly ACTIVE_COLOR_LBLUE: string = "#AFEEEE";
  private static readonly INACTIVE_COLOR_WHITE: string = "#FFFFFF";
  private static readonly PORT_NAME: string = "output";
  constructor(port: Port) {
    super({ width: port.width, height: port.height, cssClass: port.type.name, bgColor: DestinationPortNode.INACTIVE_COLOR_WHITE, stroke: 0 });
  }

  onMouseEnter() {
    super.setBackgroundColor(DestinationPortNode.ACTIVE_COLOR_LBLUE);
    super.setStroke(1);
  }

  onMouseLeave() {
    super.setBackgroundColor(DestinationPortNode.INACTIVE_COLOR_WHITE);
    super.setStroke(0);
  }
};

