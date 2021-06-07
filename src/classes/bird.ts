import { createHistogram } from 'perf_hooks';
import { GameObjects, Scene, Physics, Input, Tweens, Types } from 'phaser';
import { GameProperties } from '../consts';
export class Bird extends Physics.Arcade.Sprite {
  private spriteName: string;
  private rotate!: Tweens.Timeline;
  private idle!: Tweens.Tween;
  private isFly: boolean =  false;

  constructor(scene: Scene) {
    super(scene, 0, 0, '');
    
    scene.physics.add.existing(this);

    let camera = this.scene.cameras.main;

    let allBird = ['blue-bird', 'red-bird', 'yellow-bird'];
    this.spriteName = allBird[Phaser.Math.Between(0, 2)];

    this
      .setTexture('sprite', `bird/${this.spriteName}-1`)
      .setPosition(camera.width / 2, camera.height / 2 - 24)
      .setSize(this.width * 0.8, this.height * 1)
      .setOrigin(0.5, 0.5)
      .setDepth(2);

    this.initAnimation();

    this.anims.play('slow-fly', false);
    this.setIdle();
    scene.children.addAt(this, 5);
  }

  public setIdle(): void {
    this.idle?.stop();
    this.idle = this.scene.tweens.add({
      targets: this,
      y: {from: this.y + 3, to: this.y - 3 },
      duration: 360,
      yoyo: -1,
      repeat: -1
    });
  }

  public setPlayingPosition() {
    let camera = this.scene.cameras.main;
    this.setPosition(camera.width / 3 - 8, camera.height / 2);
    this.setIdle();
  }

  private initAnimation(): void {
    let frames = this.anims.generateFrameNames('sprite', {
      prefix: `bird/${this.spriteName}-`,
      end: 2,
    });
    frames.push({key: 'sprite', frame: `bird/${this.spriteName}-1`});

    this.anims.create({
      key: 'slow-fly',
      frames: frames,
      frameRate: 8,
      repeat: -1
    });

    this.anims.create({
      key: 'quick-fly',
      frames: frames,
      frameRate: 20,
      repeat: 2
    });
  }

  public enableFly(): void {
    var rect = new Phaser.Geom.Rectangle(0, 0, this.scene.cameras.main.width, this.scene.cameras.main.height);
    
    let pointer = this.scene.input.activePointer;

    this.idle.stop();

    this.setInteractive(rect, () => {
        if (!this.isFly && pointer.isDown) {
          this.fly();
        }
     });
    
    this.fly();
  }

  public disableFly(): void {
    this.removeInteractive();
  }

  public fly(): void {

    if (this.y > 20) {
      this.scene.sound.play('wing');

      this.isFly = true;
      this.scene.time.addEvent({
        delay: 100,
        callback: () => {
          this.isFly = false;
        }
      });

      this
        .setVelocityY(-330)
        .setGravity(0, 1200)
        .anims.play('quick-fly', false);

      this.rotate?.stop();
      this.rotate = this.scene.tweens.createTimeline();
      this.rotate.add({
        targets: this,
        rotation: -Math.PI * 20 / 180,
        ease: 'Power2',
        duration: 400
      });  
      this.rotate.add({
        targets: this,
        rotation: Math.PI * 90 / 180,
        ease: 'Power1',
        duration: 600
      });
      this.rotate.play();
    }
  }

  public update(): void {
    if (this.body.velocity.y > 500) {
      this.setGravityY(100); 
    }
  }
  
}