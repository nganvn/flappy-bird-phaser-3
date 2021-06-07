import { Scene, Physics } from 'phaser';
import { GameProperties } from '../consts';
export class Ground extends Physics.Arcade.Image {
  
  constructor(scene: Scene) {
    super(scene, 0, 0, 'sprite', 'ground');

    scene.physics.add.existing(this);

    let camera = this.scene.cameras.main;

    this.setOrigin(0, 1)
      .setPosition(0, camera.height)
      .setSize(this.width, this.height)
      .setDepth(10);
    this.move();
    this.body.immovable = true;
  }
  
  public move() {
    let xPosition = - this.width / 2;
    let duration = (this.x - xPosition) / GameProperties.SPEED * 1000;

    let tween = this.scene.tweens.add({
      targets: this,
      x: xPosition,
      duration: duration,
      loop: -1
    });
  }
  
}