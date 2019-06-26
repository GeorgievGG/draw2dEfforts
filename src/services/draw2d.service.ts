import { Injectable } from '@angular/core';
import draw2d from 'draw2d';
import { DestinationPortNode } from '../models/decorators/DestinationPortNode';
import { OperatorNode } from '../models/decorators/OperatorNode';
import { PortImage } from '../models/decorators/PortImage';
import { PortLabel } from '../models/decorators/PortLabel';
import { SourcePortNode } from '../models/decorators/SourcePortNode';
import { Port } from '../models/Port';
import { NodeContainer } from 'src/models/NodeContainer';

@Injectable({
  providedIn: 'root'
})
export class Draw2DService {

  constructor() { }

  drawCanvas(maxPortsCount: number) {
    const minHeight = Math.min(1200, maxPortsCount * 40 + 200);
    const canvas = new draw2d.Canvas('cnv', 1200, minHeight);
    canvas.setScrollArea($(window));

    return canvas;
  };

  drawJailhouseElement(canvas: draw2d.Canvas, width: number, height: number) {
    let jailHouse = new draw2d.shape.composite.Jailhouse({
      width: width,
      height: height,
      cssClass: "jailhouse",
      resizeable: false,
      bgColor: "#DDDDDD"
    });
    jailHouse.setDraggable(false);
    canvas.add(jailHouse, 160, 20);
  };

  drawPorts(canvas: draw2d.Canvas, ports: Port[]) {
    ports.forEach(function (value: Port, index: number) {
      this.drawPortElement(value, canvas, index);
    }.bind(this));
  };

  private drawPortElement(port: Port, canvas: draw2d.Canvas, index: number): void {
    let node = this.drawPortNode(port, canvas);
    let image = new PortImage(node);
    let label = new PortLabel(node, port.name);
    let toRelativePosition = new draw2d.layout.locator.XYRelPortLocator(0, 0.5);
    let toCenter = new draw2d.layout.locator.CenterLocator();
    node.add(image, toRelativePosition)
      .add(label, toCenter);

    let nodeXCoord = port.type.initialXCoord;
    let nodeYCoord = port.type.initialYCoord + 40 * index;
    canvas.add(node, nodeXCoord, nodeYCoord);
  };

  private drawPortNode(port: Port, canvas: draw2d.Canvas): draw2d.shape.node.Node {
    let node: draw2d.shape.node.Node;
    if (port.type.name == "sourcePort") {
      node = new SourcePortNode(port);
    }
    else {
      node = new DestinationPortNode(port);
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
