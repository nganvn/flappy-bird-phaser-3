import { Physics, Scene, GameObjects } from 'phaser';
import { GameProperties } from '../consts';
class PipeUp extends Physics.Arcade.Image {
  constructor(scene: Scene) {
    super(scene, 0, 0, 'sprite', 'pipe/green-pipe-up');

    scene.physics.add.existing(this);

    this
      .setOrigin(0.5, 0)
      .setSize(this.width - 4, this.height)
      .setY(GameProperties.PIPE_DIST / 2);

    this.body.immovable = true;
  }
}

class PipeDown extends Physics.Arcade.Image {
  constructor(scene: Scene) {
    super(scene, 0, 0, 'sprite', 'pipe/green-pipe-down');

    scene.physics.add.existing(this);

    this
      .setOrigin(0.5, 1)
      .setSize(this.width - 4, this.height)
      .setY(-GameProperties.PIPE_DIST / 2);
    
    this.body.immovable = true;
  }
}

export default class Pipes extends Phaser.GameObjects.Container {
  
  constructor(scene: Scene) {
    super(scene);

    let pipeUp = new PipeUp(scene);
    let pipeDown = new PipeDown(scene);

    let a = this.scene.physics.add.sprite(0, 0, '')
      .setVisible(false)
      .setSize(2, 100);

    this
      .add(pipeUp)
      .add(pipeDown)
      .add(a)
      .setPosition(scene.cameras.main.width + 80, Phaser.Math.Between(120, 280))
      .setDepth(1);
    
      this.move();
  }

  public move(): void {
    let xPosition = -80;
    let duration = (this.x - xPosition) / GameProperties.SPEED * 1000;

    this.scene.tweens.add({
      targets: this,
      x: xPosition,
      duration: duration,
      loop: 0,
      onComplete: () => {
        this.destroy();
      }
    });
  }
}