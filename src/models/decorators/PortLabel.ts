import draw2d from 'draw2d';

export class PortLabel extends draw2d.shape.basic.Label {
  private parentNode;

  constructor(startNode, text: String) {
    super({ fontSize: 10, text: text, stroke: 0, padding: 0 });
    this.parentNode = startNode;
  }

  onMouseEnter() {
    this.parentNode.onMouseEnter();
  }

  onMouseLeave() {
    this.parentNode.onMouseLeave();
  }

};
