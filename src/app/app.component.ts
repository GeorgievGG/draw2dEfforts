import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import draw2d from 'draw2d';
import { Port } from '../models/Port';
import { DevicesService } from '../services/devices.service';
import { Draw2DService } from '../services/draw2d.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  private canvas: draw2d.Canvas;
  @ViewChild('sourcePortSearch', null) sourcePortSearch: ElementRef;
  @ViewChild('destPortSearch', null) destPortSearch: ElementRef;

  private readonly SOURCE_PORT_CSS_CLASS: string = "sourcePort";
  private readonly DESTINATION_PORT_CSS_CLASS: string = "destinationPort";
  private readonly MINIMUM_VIABLE_SEARCH_LENGTH: number = 5;

  constructor(private devicesService: DevicesService, private draw2DService: Draw2DService) { }
  ngAfterViewInit() {
    var sourcePorts: Port[] = this.devicesService.getSourcePorts();
    var destinationPorts: Port[] = this.devicesService.getDestinationPorts();
    var maxPortsCount = Math.max(sourcePorts.length, destinationPorts.length);
    this.canvas = this.draw2DService.drawCanvas(maxPortsCount);

    this.draw2DService.drawJailhouseElement(this.canvas, 800, maxPortsCount * 40 - 20);
    this.draw2DService.drawPorts(this.canvas, sourcePorts);
    this.draw2DService.drawPorts(this.canvas, destinationPorts);
    this.draw2DService.drawDragAndDropMenu(this.canvas);
  }

  tryFilter() {
    let sourceSearchTerm = this.sourcePortSearch.nativeElement.value;
    let destSearchTerm = this.destPortSearch.nativeElement.value;
    const isTermLongEnough = sourceSearchTerm.length >= this.MINIMUM_VIABLE_SEARCH_LENGTH || destSearchTerm.length >= this.MINIMUM_VIABLE_SEARCH_LENGTH;
    const termsAreEmpty = sourceSearchTerm == "" && destSearchTerm.length == "";
    if (isTermLongEnough || termsAreEmpty) {
      this.executeSearch(sourceSearchTerm, destSearchTerm);
    }
  };

  private executeSearch(sourceSearchTerm: string, destSearchTerm: string) {
    let sourceFigure = this.draw2DService.getFigure(this.canvas, this.SOURCE_PORT_CSS_CLASS, sourceSearchTerm);
    let destFigure = this.draw2DService.getFigure(this.canvas, this.DESTINATION_PORT_CSS_CLASS, destSearchTerm);
    if (sourceFigure || destFigure) {
      this.draw2DService.hideAllElements(this.canvas);
      if (sourceFigure) {
        this.draw2DService.filter(sourceFigure, this.canvas, this.SOURCE_PORT_CSS_CLASS);
      }
      if (destFigure) {
        this.draw2DService.filter(destFigure, this.canvas, this.DESTINATION_PORT_CSS_CLASS);
      }
    }
    else {
      this.draw2DService.showAllElements(this.canvas);
    }
  }
}
