import draw2d from 'draw2d';

export class PortImage extends draw2d.shape.basic.Image {
  private parentNode;

  constructor(startNode, imagePath : string = "/assets/start.png") {
    super({ width: 20, height: 20, path: imagePath });
    this.parentNode = startNode;
  }

  onMouseEnter() {
    this.parentNode.onMouseEnter();
  }

  onMouseLeave() {
    this.parentNode.onMouseLeave();
  }
};
