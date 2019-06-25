import { Injectable } from '@angular/core';
import { ElementType } from '../models/ElementType';
import { Port } from '../models/Port';

@Injectable({
  providedIn: 'root'
})
export class DevicesService {

  constructor() { }

  getSourcePorts(): Array<Port> {
    var ports = new Array<Port>();
    for (var i = 0; i < 12; i++) {
      let elType = new ElementType("sourcePort", 20, 20);
      ports[i] = new Port("Port " + i, elType);
    };

    return ports;
  }

  getDestinationPorts(): Array<Port> {
    var ports = Array<Port>();
    for (var i = 0; i < 12; i++) {
      let elType = new ElementType("destinationPort", 1000, 20);
      ports[i] = new Port("Port " + i, elType);
    };

    return ports;
  }
}
