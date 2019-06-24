import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DevicesService {

  constructor() { }

  getSourcePorts() {
    var ports = [
      { name: "Port 1" },
      { name: "Port 2" },
      { name: "Port 3" },
      { name: "Port 4" },
      { name: "Port 5" },
      { name: "Port 6" },
      { name: "Port 7" },
      { name: "Port 8" },
      { name: "Port 9" },
      { name: "Port 10" },
      { name: "Port 11" },
      { name: "Port 12" }
    ]

    return ports;
  }

  getDestinationPorts() {
    var ports = [
      { name: "Port 1" },
      { name: "Port 2" },
      { name: "Port 3" },
      { name: "Port 4" },
      { name: "Port 5" },
      { name: "Port 6" },
      { name: "Port 7" },
      { name: "Port 8" },
      { name: "Port 9" },
      { name: "Port 10" },
      { name: "Port 11" },
      { name: "Port 12" }
    ]

    return ports;
  }
}
