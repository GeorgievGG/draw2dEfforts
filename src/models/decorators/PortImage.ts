import draw2d from 'draw2d';

export class PortImage extends draw2d.shape.basic.Image {
  private parentNode: draw2d.Figure;

  constructor(startNode: draw2d.Figure, imagePath: string = "/assets/start.png") {
    super({ width: startNode.getHeight(), height: startNode.getHeight(), path: imagePath });
    this.parentNode = startNode;
  }

  onMouseEnter() {
    this.parentNode.onMouseEnter();
  }

  onMouseLeave() {
    this.parentNode.onMouseLeave();
  }
};
