import { Injectable } from '@angular/core';
import draw2d from 'draw2d';
import { DestinationPortNode } from '../models/DestinationPortNode';
import { Port } from '../models/Port';
import { PortImage } from '../models/PortImage';
import { PortLabel } from '../models/PortLabel';
import { SourcePortNode } from '../models/SourcePortNode';

@Injectable({
  providedIn: 'root'
})
export class Draw2DService {

  constructor() { }

  drawCanvas(maxPortsCount: number) {
    const canvas = new draw2d.Canvas('cnv', 1200, maxPortsCount * 40);
    canvas.setScrollArea($(window));

    return canvas;
  };

  drawFreeCanvasArea(canvas: draw2d.Canvas, width: number, height: number) {
    let rect = new draw2d.shape.basic.Rectangle({
      width: width,
      height: height,
      cssClass: "freeArea",
      resizeable: false
    });
    rect.setDraggable(true);
    //let rect2 = new DestinationPortNode(105, 20);
    canvas.add(rect, 156, 10);
    //canvas.add(rect2, 500, 10);
  };

  drawPorts(canvas: draw2d.Canvas, ports: Port[]) {
    ports.forEach(function (value: Port, index: number) {
      this.drawPortElement(value, canvas, index);
    }.bind(this));
  };

  private drawPortElement(port: Port, canvas: draw2d.Canvas, index: number): void {
    let node = this.drawPortNode(port, canvas);
    let image = this.drawPortImage(node, canvas);
    let label = this.drawPortLabel(node, port.name, canvas);
    let group = this.groupNodeParts(node, image, label);
    this.drawPortGroup(port, index, canvas, group);
  };

  private drawPortNode(port: Port, canvas: draw2d.Canvas): draw2d.shape.node.Node {
    let node: draw2d.shape.node.Node;
    if (port.type.name == "sourcePort") {
      node = new SourcePortNode(port.width, port.height, port.type.name);
    }
    else {
      node = new DestinationPortNode(port.width, port.height, port.type.name);
    }

    canvas.add(node, 0, 0);

    return node;
  };

  private drawPortImage(node: draw2d.shape.node.Node, canvas: draw2d.Canvas): PortImage {
    let image = new PortImage(node);
    canvas.add(image, 5, 0);
    return image;
  };

  private drawPortLabel(node: draw2d.shape.node.Node, portName: string, canvas: draw2d.Canvas): PortLabel {
    let text = new PortLabel(node, portName);
    canvas.add(text, 30, 5);
    return text;
  };

  private groupNodeParts(node: draw2d.shape.node.Node, image: PortImage, text: PortLabel): draw2d.shape.composite.Group {
    let group = new draw2d.shape.composite.Group({ resizable: false })
    group.assignFigure(node);
    group.assignFigure(image);
    group.assignFigure(text);
    group.setDraggable(false);

    return group;
  }

  private drawPortGroup(port: Port, index: number, canvas: any, group: any) {
    let nodeXCoord = port.type.initialXCoord;
    let nodeYCoord = port.type.initialYCoord + 40 * index;
    canvas.add(group, nodeXCoord, nodeYCoord);
  }
}
