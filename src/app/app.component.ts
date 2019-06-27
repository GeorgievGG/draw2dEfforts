import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import draw2d from 'draw2d';
import { Port } from '../models/Port';
import { DevicesService } from '../services/devices.service';
import { Draw2DService } from '../services/draw2d.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit, OnInit {
  private canvas: draw2d.Canvas;
  public sourcePortSearch: FormControl;
  public destPortSearch: FormControl;

  private readonly SOURCE_PORT_CSS_CLASS: string = "sourcePort";
  private readonly DESTINATION_PORT_CSS_CLASS: string = "destinationPort";
  private readonly MINIMUM_VIABLE_SEARCH_LENGTH: number = 5;

  constructor(private devicesService: DevicesService, private draw2DService: Draw2DService) { }

  ngOnInit() {
    this.sourcePortSearch = new FormControl();
    this.destPortSearch = new FormControl();
    this.sourcePortSearch.valueChanges.subscribe(newSearchTerm => {
      this.tryFilter(newSearchTerm, this.destPortSearch.value);
    });
    this.destPortSearch.valueChanges.subscribe(newSearchTerm => {
      this.tryFilter(this.sourcePortSearch.value, newSearchTerm);
    });
  }

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

  tryFilter(sourcePortSearchTerm: string, destPortSearchTerm: string) {
    const termsAreEmpty = sourcePortSearchTerm && destPortSearchTerm;
    if (termsAreEmpty || this.areTermsLongEnough) {
      this.executeSearch(sourcePortSearchTerm, destPortSearchTerm);
    }
  };

  private areTermsLongEnough(sourcePortSearchTerm: string, destPortSearchTerm: string): boolean {
    return sourcePortSearchTerm.length >= this.MINIMUM_VIABLE_SEARCH_LENGTH || destPortSearchTerm.length >= this.MINIMUM_VIABLE_SEARCH_LENGTH;
  }

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
