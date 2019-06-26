import { Injectable } from '@angular/core';
import draw2d from 'draw2d';
import { DestinationPortNode } from '../models/DestinationPortNode';
import { Port } from '../models/Port';
import { PortImage } from '../models/PortImage';
import { PortLabel } from '../models/PortLabel';
import { SourcePortNode } from '../models/SourcePortNode';
import { OperatorNode } from 'src/models/OperatorNode';
import { NodeContainer } from 'src/models/NodeContainer';

@Injectable({
  providedIn: 'root'
})
export class Draw2DService {

  constructor() { }

  drawCanvas(maxPortsCount: number) {
    const canvas = new draw2d.Canvas('cnv', 1200, maxPortsCount * 40 + 200);
    canvas.setScrollArea($(window));

    return canvas;
  };

  drawFreeCanvasArea(canvas: draw2d.Canvas, width: number, height: number) {
    let rect = new draw2d.shape.basic.Rectangle({
      width: width,
      height: height,
      cssClass: "freeArea",
      resizeable: false,
      bgColor: "#DDDDDD"
    });
    rect.setDraggable(false);
    //let rect2 = new DestinationPortNode(105, 20);
    canvas.add(rect, 160, 20);
    //canvas.add(rect2, 500, 10);
  };

  drawPorts(canvas: draw2d.Canvas, ports: Port[]) {
    ports.forEach(function (value: Port, index: number) {
      this.drawPortElement(value, canvas, index);
    }.bind(this));
  };

  private drawPortElement(port: Port, canvas: draw2d.Canvas, index: number): void {
    let node = this.drawPortNode(port, canvas);
    node.add(new PortImage(node), new draw2d.layout.locator.XYRelPortLocator(0, 0.5))
        .add(new PortLabel(node, port.name), new draw2d.layout.locator.CenterLocator());

    let nodeXCoord = port.type.initialXCoord;
    let nodeYCoord = port.type.initialYCoord + 40 * index;
    canvas.add(node, nodeXCoord, nodeYCoord);
  };

  private drawPortNode(port: Port, canvas: draw2d.Canvas): draw2d.shape.node.Node {
    let node: draw2d.shape.node.Node;
    if (port.type.name == "sourcePort") {
      node = new SourcePortNode(port.width, port.height, port.type.name);
    }
    else {
      node = new DestinationPortNode(port.width, port.height, port.type.name);
    }

    return node.setResizeable(false).setDraggable(false);
  };

  drawDragAndDropMenu(canvas: draw2d.Canvas, width: number, height: number) {
    let dragAndDropMenu = new NodeContainer(160, 500, width, height, 0, 20, 20);

    for (let i = 0; i < 15; i++)
      dragAndDropMenu.add(new OperatorNode({}, "some operation", "somepath"));

    dragAndDropMenu.addToCanvas(canvas);
  }
}
