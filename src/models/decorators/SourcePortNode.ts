import draw2d from 'draw2d';
import { Port } from '../Port';

export class SourcePortNode extends draw2d.shape.node.Start {
  private static readonly ACTIVE_COLOR_LBLUE: string = "#AFEEEE";
  private static readonly INACTIVE_COLOR_WHITE: string = "#FFFFFF";
  private readonly PORT_NAME: string = "output";

  constructor(port: Port) {
    super({
      id: port.type.name + '_' + port.name,
      cssClass: port.type.name,
      width: port.width,
      height: port.height,
      bgColor: SourcePortNode.INACTIVE_COLOR_WHITE,
      stroke: 0
    });
    super.resetPorts().createPort(this.PORT_NAME);
  }

  onMouseEnter() {
    super.setBackgroundColor(SourcePortNode.ACTIVE_COLOR_LBLUE);
    super.setStroke(1);
  }

  onMouseLeave() {
    super.setBackgroundColor(SourcePortNode.INACTIVE_COLOR_WHITE);
    super.setStroke(0);
  }

  getOutputPorts(): draw2d.util.ArrayList {
    return super.getOutputPorts();
  }
};
