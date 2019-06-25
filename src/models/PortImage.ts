import draw2d from 'draw2d';

export class PortImage extends draw2d.shape.basic.Image {
  private parentNode;

  constructor(startNode) {
    super({ width: 20, height: 20, path: "/assets/start.png" });
    this.parentNode = startNode;
  }

  onMouseEnter() {
    this.parentNode.setBackgroundColor("#AFEEEE");
    this.parentNode.setStroke(1);
  }

  onMouseLeave() {
    this.parentNode.setBackgroundColor("#FFFFFF");
    this.parentNode.setStroke(0);
  }
};
