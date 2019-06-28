import draw2d from 'draw2d';

/**
* Overrides BoundingboxSelectionPolicy funcionality to allow for starting a 
* drag selection from inside a Figure, which is listed as an expection (and 
  * should not be selectable or draggable).
  * The code has been copied from the source code and only the 
  * canvas.getBestFigure() line has been modified.
  */
  export class BoundingboxSelectionPolicy extends draw2d.policy.canvas.BoundingboxSelectionPolicy {
    constructor(private readonly exceptions: draw2d.Figure[] = []) {
      super();
    }
    
    onMouseDown(canvas: draw2d.Canvas, x: number, y: number, shiftKey: boolean, ctrlKey: boolean) {
      let _oldGetBestFigure = canvas.getBestFigure.bind(canvas); 
      let _exceptions = this.exceptions;
      canvas.getBestFigure = function(x, y, blacklist, whitelist) {
        let result = _oldGetBestFigure(x, y, blacklist, whitelist);
        if (_exceptions.indexOf(result) >= 0) return null;
        return result;
      }.bind(canvas);
      super.onMouseDown(canvas, x, y, shiftKey, ctrlKey);
      canvas.getBestFigure = _oldGetBestFigure;
    }
  }