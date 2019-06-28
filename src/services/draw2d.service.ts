import { Injectable } from '@angular/core';
import draw2d from 'draw2d';
import { DestinationPortNode } from '../models/decorators/DestinationPortNode';
import { OperatorNode } from '../models/decorators/OperatorNode';
import { PortImage } from '../models/decorators/PortImage';
import { PortLabel } from '../models/decorators/PortLabel';
import { SourcePortNode } from '../models/decorators/SourcePortNode';
import { Port } from '../models/Port';
import { NodeContainer } from 'src/models/NodeContainer';
import { BoundingboxSelectionPolicy } from 'src/models/decorators/BoundingboxSelectionPolicy';

@Injectable({
  providedIn: 'root'
})
export class Draw2DService {

  constructor() { }

  drawCanvas(maxPortsCount: number) {
    const minHeight = Math.min(1200, maxPortsCount * 40 + 200);
    const canvas = new draw2d.Canvas('cnv', 1200, minHeight);
    canvas.setScrollArea($(window));

    // Removes focus from the focused element when the canvas is clicked.
    // This fixes an issue where hotkeys would stop working after an input field
    // (or something similar) is focused, as the SVG can not regain focus.
    $(document).on("click", "#cnv", () => {
      if (document.activeElement instanceof HTMLElement)
        document.activeElement.blur();
    });

    return canvas;
  };

  drawJailhouseElement(canvas: draw2d.Canvas, width: number, height: number) {
    let jailHouse = new draw2d.shape.composite.Jailhouse({
      width: width,
      height: height,
      cssClass: "jailhouse persists-filter",
      resizeable: false,
      bgColor: "#DDDDDD"
    });
    jailHouse.setDraggable(false);
    jailHouse.setBoundingBox = function () { }; // Disables resizing.
    canvas.add(jailHouse, 160, 20)
          // Enables drag selections starting from inside the jailhouse element.
          .installEditPolicy(new BoundingboxSelectionPolicy([jailHouse])); 
  };

  drawPorts(canvas: draw2d.Canvas, ports: Port[]) {
    ports.forEach(function (value: Port, index: number) {
      this.drawPortElement(value, canvas, index);
    }.bind(this));
  };

  getFigure(canvas: any, initialNodeType: string, portName: string) {
    return canvas.getFigure(initialNodeType + "_" + portName);
  };

  filter(figure: draw2d.Figure, canvas: draw2d.Canvas, initialNodeType: string): void {
    let chosenFigures = this.getFiguresChain(figure, initialNodeType);
    this.setAttributesToFigures(chosenFigures, { visible: true });
  };

  hideAllElements(canvas: any) {
    let allElements = this.getAllElements(canvas);
    this.setAttributesToFigures(allElements, { visible: false });
    return allElements;
  }

  showAllElements(canvas: any) {
    let allElements = this.getAllElements(canvas);
    this.setAttributesToFigures(allElements, { visible: true });
    return allElements;
  }

  drawDragAndDropMenu(canvas: draw2d.Canvas, width: number, height: number) {
    let dragAndDropMenu = new NodeContainer(160, 500, width, height, 0, 20, 20);

    for (let i = 0; i < 15; i++)
      dragAndDropMenu.add(new OperatorNode({}, "some operation", "somepath"));

    dragAndDropMenu.addToCanvas(canvas);
  }

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

  private getAllElements(canvas: draw2d.Canvas): draw2d.util.ArrayList {
    let allFigures = canvas.getFigures();
    let allElements = new draw2d.util.ArrayList();
    allFigures.each((i, value) => this.attachApplicableElements(i, value, allElements));
    this.setAttributesToFigures(allElements, { opacity: 1 });

    return allElements;
  };

  private getFiguresChain(figure: draw2d.Figure, initialNodeType: string): draw2d.util.ArrayList {
    let chosenFigures = new draw2d.util.ArrayList();
    chosenFigures.add(figure);
    this.addPorts(figure, initialNodeType, chosenFigures);
    return chosenFigures;
  }

  private addPorts(figure: draw2d.Figure, initialNodeType: string, chosenFigures: draw2d.util.ArrayList): void {
    if (initialNodeType == "sourcePort") {
      let outputPorts = figure.getOutputPorts();
      chosenFigures.addAll(outputPorts);
      outputPorts.each((i, value) => this.addConnections(value, initialNodeType, chosenFigures));
    }
    else {
      let inputPorts = figure.getInputPorts();
      chosenFigures.addAll(inputPorts);
      inputPorts.each((i, value) => this.addConnections(value, initialNodeType, chosenFigures));
    }
  }

  private addConnections(port: draw2d.Port, initialNodeType: string, chosenFigures: draw2d.util.ArrayList): void {
    let connections = port.getConnections();
    chosenFigures.addAll(connections);
    connections.each((i, value) => this.addChain(value, initialNodeType, chosenFigures));
  }

  private addChain(connection: draw2d.Connection, initialNodeType: string, chosenFigures: draw2d.util.ArrayList): void {
    let nextPort: draw2d.Port = connection.getSource();
    if (initialNodeType == "sourcePort") {
      nextPort = nextPort.name == "input0" ? nextPort : connection.getTarget();
    } else {
      nextPort = nextPort.name == "output0" ? nextPort : connection.getTarget();
    }
    chosenFigures.add(nextPort);
    let nextNode = nextPort.getParent();
    let nextFigures = this.getFiguresChain(nextNode, initialNodeType);
    chosenFigures.addAll(nextFigures);
  }

  private setAttributesToFigures(figures: draw2d.util.ArrayList, attributeConfig: any): void {
    figures.each((i, value) => this.applyFigureConfig(i, value, attributeConfig));
  }

  private attachApplicableElements(index: number, value: draw2d.Figure, result: draw2d.util.ArrayList): draw2d.util.ArrayList {
    if (value.cssClass.includes("persists-filter")) {
      return;
    }

    result.add(value);

    let subFigures = value.getChildren();
    subFigures.each((i, value) => this.attachApplicableElements(i, value, result));
    if (value.getConnections) {
      let connections = value.getConnections();
      connections.each((i, value) => this.attachApplicableElements(i, value, result));
    };
    if (value.getOutputPorts) {
      let outputPorts = value.getOutputPorts();
      outputPorts.each((i, value) => this.attachApplicableElements(i, value, result));
    }
    if (value.getInputPorts) {
      let inputPorts = value.getInputPorts();
      inputPorts.each((i, value) => this.attachApplicableElements(i, value, result));
    }
  }

  private applyFigureConfig(index: number, value: draw2d.Figure, attributeConfig: any): void {
    value.attr(attributeConfig);

    let subFigures = value.getChildren();
    subFigures.each((i, value) => this.applyFigureConfig(i, value, attributeConfig));
  }
}
