function Main () {
  this.stage = new PIXI.Container();
  this.renderer = PIXI.autoDetectRenderer(
    800,
    600,
    { view: document.getElementById('canvas') }
  );

  this.background = new Background();
  this.stage.addChild(this.background);

  this.positionX = 0;

  this.update();
}

Main.prototype.update = function () {
  this.renderer.render(this.stage);

  this.positionX += 10;
  this.background.moveByX(this.positionX);

  requestAnimationFrame(this.update.bind(this));
}
