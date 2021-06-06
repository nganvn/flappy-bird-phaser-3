import { Physics, Scene, GameObjects } from 'phaser';
import { GameProperties } from '../consts';
class PipeUp extends Physics.Arcade.Image {
  constructor(scene: Scene) {
    super(scene, 0, 0, 'pipe-green-up');

    scene.physics.add.existing(this);

    this.setOrigin(0.5, 0);
    this.setSize(this.width - 4, this.height);
    this.setY(GameProperties.PIPE_DIST / 2);

    this.body.immovable = true;
  }
}

class PipeDown extends Physics.Arcade.Image {
  constructor(scene: Scene) {
    super(scene, 0, 0, 'pipe-green-down');

    scene.physics.add.existing(this);

    this.setOrigin(0.5, 1);
    this.setSize(this.width - 4, this.height);
    this.setY(-GameProperties.PIPE_DIST / 2);
    
    this.body.immovable = true;
  }
}

export default class Pipes extends Phaser.GameObjects.Container {
  
  constructor(scene: Scene) {
    super(scene);

    let pipeUp = new PipeUp(scene);
    this.add(pipeUp);
    let pipeDown = new PipeDown(scene);
    this.add(pipeDown);
    let a = this.scene.physics.add.sprite(0, 0, '');
    a.setVisible(false);
    a.setSize(2, 100);
    this.add(a);
    this.setPosition(scene.cameras.main.width + 80, Phaser.Math.Between(120, 280));


    scene.children.addAt(this, 1);
  }

  public getAllPipe(): GameObjects.GameObject[] {
    return this.getAll();
  }

  public move() {
    let duration = (this.x) / GameProperties.SPEED * 1000;
    let xPosition = -80;
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