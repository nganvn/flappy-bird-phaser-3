import { createHistogram } from 'perf_hooks';
import { GameObjects, Scene, Physics, Input, Tweens } from 'phaser';
import { GameProperties } from '../consts';
export class Bird extends Physics.Arcade.Sprite {
  private space!: Input.Keyboard.Key;
  private _isSpaceDown: boolean;
  private rotate!: Tweens.Timeline;
  private idle!: Tweens.Tween;

  constructor(scene: Scene) {
    super(scene, 0, 0, 'blue-bird');

    scene.physics.add.existing(this);

    let camera = this.scene.cameras.main;
    this.setPosition(camera.width / 3 - 8, camera.height / 2 - 16);
    this.setSize(this.width * 0.8, this.height * 1);
    this.setOrigin(0.5, 0.5);
    this._isSpaceDown = false;

    this.anims.create({
      key: 'fly',
      frames: this.scene.anims.generateFrameNames('bird', {
        prefix: 'redbird_', suffix: '.png',
        end: 3,
      }),
      frameRate: 8,
      repeat: -1
    })
    this.anims.play('fly');

    this.idle = this.scene.tweens.add({
      targets: this,
      y: {from: this.y + 3, to: this.y -3 },
      duration: 380,
      yoyo: -1,
      repeat: -1
    });

    scene.children.addAt(this, 4);
  }

  public enableFly(): void {

    var rect = new Phaser.Geom.Rectangle(0, 0, this.scene.cameras.main.width, this.scene.cameras.main.height);
    
    let pointer = this.scene.input.activePointer;

    this.anims.stop();
    this.anims.get('fly').frameRate = 20;
    this.anims.get('fly').repeat = 2;
    this.idle.stop();

    this.setInteractive(rect, () => {
        if (pointer.isDown) {
          this.fly();
        }
     });

    // this.space = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.fly();
  }

  public disableFly(): void {
    // this.scene.input.keyboard.removeKey(this.space);
    this.removeInteractive();
  }

  public fly(): void {

    if (this.y > 20) {
      this.scene.sound.play('wing');
      this.setVelocityY(-330);
      this.setGravity(0, 1200);

      this.anims.play('fly');

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
        duration: 300
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

    if (this.space?.isDown && ! this._isSpaceDown && this.y > 30) {
      this.fly();
      this._isSpaceDown = true;
    }
    if (this.space?.isUp) {
      this._isSpaceDown = false;
    }
  }
  
}