import { AfterViewInit, Component } from '@angular/core';
import draw2d from 'draw2d';
import { DevicesService } from '../services/devices.service';
import { PortType } from '../models/PortType';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  private readonly SOURCE_PORTS_X_COORDINATE = 10;
  private readonly DEST_PORTS_X_COORDINATE = 1000;
  
   
  constructor(private devicesService: DevicesService) { }
  ngAfterViewInit() {
    var sourcePorts = this.devicesService.getSourcePorts();
    var destinationPorts = this.devicesService.getDestinationPorts();
    var maxPortsCount = Math.max(sourcePorts.length, destinationPorts.length);
    const canvas = new draw2d.Canvas('cnv', 1200, maxPortsCount * 40);

    canvas.setScrollArea($(window));

    drawPorts(canvas, sourcePorts, PortType.Source);
    drawPorts(canvas, destinationPorts, PortType.Destination);
  }
}

class MyStartNode extends draw2d.shape.node.Start {
  constructor() {
    super({ width: 105, height: 20, opacity: 1, cssClass: "startNode", bgColor: "#FFFFFF", stroke: 0 });
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

class MyEndNode extends draw2d.shape.node.End {
  constructor() {
    super({ width: 105, height: 20, opacity: 1, cssClass: "endNode", bgColor: "#FFFFFF", stroke: 0 });
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

class MyImage extends draw2d.shape.basic.Image {
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

class MyLabel extends draw2d.shape.basic.Label {
  private parentNode;

  constructor(startNode, text: String) {
    super({ fontSize: 10, text: text, stroke: 0, padding: 0, minWidth: 80 });
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

function drawPorts(canvas: draw2d.Canvas, ports, portType: PortType) {
  let i = 0;
  ports.forEach(function (value, index: number, array: Object[]) {
    paintNodeElement(value.name, canvas, portType, i);
    i++;
  });

  //var rect2 = new draw2d.shape.node.Between({ width: 20, height: 20, opacity: 1, bgColor: "red", cssClass: "btwNode" });
  //var rect3 = new draw2d.shape.node.End({ width: 20, height: 20, opacity: 1, cssClass: "endNode" });

  //canvas.add(rect2, 10, 30);
  //canvas.add(rect3, 10, 55);
}

function paintNodeElement(portName: string, canvas: any, portType: PortType, i: number) {
  var node = createPortNode(canvas, portType);
  var image = createPortImage(node, canvas);
  var label = createPortLabel(node, portName, canvas);

  GroupNodeParts(node, image, label, canvas, portType, i);
}

function createPortNode(canvas: any, portType: PortType) {
  var rect = portType == PortType.Source ? new MyStartNode() : new MyEndNode();
  canvas.add(rect, 0, 0);
  return rect;
}

function createPortImage(rect: MyStartNode, canvas: any) {
  var image = new MyImage(rect);
  canvas.add(image, 0, 0);
  return image;
}

function createPortLabel(rect: MyStartNode, portName: string, canvas: any) {
  var text = new MyLabel(rect, portName);
  canvas.add(text, 25, 5);
  return text;
}

function GroupNodeParts(rect: MyStartNode, image: MyImage, text: MyLabel, canvas: any, portType: PortType, i: number) {
  var group = new draw2d.shape.composite.Group({ resizable: false, cssClass: "selectable" });
  var x_coord = portType == PortType.Source ? 10 : 1000;
  group.assignFigure(rect);
  group.assignFigure(image);
  group.assignFigure(text);
  group.setDraggable(false);
  canvas.add(group, x_coord, 40 * i);
}
