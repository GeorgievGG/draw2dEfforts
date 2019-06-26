import { AfterViewInit, Component } from '@angular/core';
import { Port } from '../models/Port';
import { DevicesService } from '../services/devices.service';
import { Draw2DService } from '../services/draw2d.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {

  constructor(private devicesService: DevicesService, private draw2DService: Draw2DService) { }
  ngAfterViewInit() {
    var sourcePorts: Port[] = this.devicesService.getSourcePorts();
    var destinationPorts: Port[] = this.devicesService.getDestinationPorts();
    var maxPortsCount = Math.max(sourcePorts.length, destinationPorts.length);
    const canvas = this.draw2DService.drawCanvas(maxPortsCount);

    this.draw2DService.drawJailhouseElement(canvas, 800, maxPortsCount * 40 - 20);
    this.draw2DService.drawPorts(canvas, sourcePorts);
    this.draw2DService.drawPorts(canvas, destinationPorts);
    this.draw2DService.drawDragAndDropMenu(canvas);
  }
}
