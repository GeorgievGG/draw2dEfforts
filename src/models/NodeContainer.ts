import draw2d from "draw2d"

/**
 * Only used for setting up nodes prior to adding them to the canvas.
 */
export class NodeContainer {
  private lastRow: number = 0;
  private heightTaken: number = 0;
  private rowWidthTaken: number = 0;
  private rowWidths: number[] = new Array();
  private elementHeights: number[][] = new Array();
  private elements: draw2d.shape.basic.Rectangle[][] = [];
  private finalized: boolean = false;
  
  constructor(private x: number, 
              private y: number, 
              private width: number, 
              private maxHeight: number,
              private padding: number = 0,
              private marginsX: number = 10,
              private marginsY: number = 10) {

    this.elementHeights.push([]);
    this.elements.push([]);
  }

  add(node: draw2d.shape.basic.Rectangle) {
    if (this.finalized) {
      console.error("Do not add nodes to a NodeContainer after it's been finalized (after calling addToCanvas).");
      return;
    }

    if (this.padding * 2 + this.rowWidthTaken + this.marginsX + node.getWidth() > this.width) {
      this.rowWidths.push(this.rowWidthTaken - this.marginsX);
      this.heightTaken += Math.max.apply(Math, this.elementHeights[this.lastRow]) + this.marginsY;
      this.rowWidthTaken = 0;
      this.lastRow += 1;
      this.elementHeights.push([]);
      this.elements.push([]);
    }

    if (this.padding * 2 + this.heightTaken + node.getHeight() > this.maxHeight) {
      // Size overflow. No functionality yet.
    }

    node.setX(this.x + this.padding + this.rowWidthTaken);
    node.setY(this.y + this.padding + this.heightTaken);

    this.rowWidthTaken += node.getWidth() + this.marginsX;
    this.elementHeights[this.lastRow].push(node.getHeight());
    this.elements[this.lastRow].push(node);
  }

  /**
   * Finalizes the alignment process and adds all elements to a canvas.
   * @param canvas Canvas to add the contents to.
   * @param centerHorizontally Will center the nodes horizontally in the container. Default is true.
   */
  addToCanvas(canvas: draw2d.Canvas, centerHorizontally: boolean = true) {
    this.rowWidths[this.lastRow] = this.rowWidthTaken;

    if (centerHorizontally) {
      for (let row = 0; row <= this.lastRow; row++) {
        let leftOver = (this.width - this.padding * 2 - this.rowWidths[row]) / 2;
        this.elements[row].forEach((node, i) => node.setX(node.getX() + leftOver));
      }
    }

    // Flatten array and add each to the canvas.
    [].concat.apply([], this.elements).forEach((node, i, arr) => canvas.add(node));

    this.finalized = true;
  }
}