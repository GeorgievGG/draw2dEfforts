import draw2d from 'draw2d';

export class DestinationPortNode extends draw2d.shape.node.End {
  constructor(width: number, height: number, cssClass: string) {
    super({ width: width, height: height, cssClass: cssClass, bgColor: "#FFFFFF", stroke: 0 });
  }

  onMouseEnter() {
    super.setBackgroundColor("#AFEEEE");
    super.setStroke(1);
  }

  onMouseLeave() {
    super.setBackgroundColor("#FFFFFF");
    super.setStroke(0);
  }
};

