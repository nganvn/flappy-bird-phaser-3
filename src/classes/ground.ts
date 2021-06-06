import { Scene, Physics } from 'phaser';
import { GameProperties } from '../consts';
export class Ground extends Physics.Arcade.Image {
  
  constructor(scene: Scene) {
    super(scene, 0, 0, 'ground');

    scene.physics.add.existing(this);

    let camera = this.scene.cameras.main;

    this.setOrigin(0, 1);
    this.setPosition(0, camera.height);
    this.setSize(this.width, this.height);
    this.move();
    this.body.immovable = true;
    scene.children.addAt(this, 5);
  }
  public resetPosition() {
    let camera = this.scene.cameras.main;
    this.setPosition(0, camera.height);
  }

  public move() {
    let duration = (this.width / 2) / GameProperties.SPEED * 1000;
    let xPosition = - this.width / 2

    let tween = this.scene.tweens.add({
      targets: this,
      x: xPosition,
      duration: duration,
      loop: -1
    });
  }
  
}