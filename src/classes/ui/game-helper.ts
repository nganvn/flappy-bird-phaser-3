import { Scene } from "phaser";
import GameScene from '../../scenes/game-scene';

export class GameHelper extends Phaser.GameObjects.Container {

  constructor(scene: Scene, x: number, y: number) {
    super(scene, x, y);
    let camera = scene.cameras.main;

    const getReadyMessage = scene.add.image(camera.width / 2, 175, 'sprite', 'message/message-get-ready');
    const helperMessage = scene.add.image(camera.width / 2, 270, 'sprite', 'message/message-helper');
    const blank = scene.add.rectangle(0, 0, scene.cameras.main.width, scene.cameras.main.height, 0x000000, 0)
      .setOrigin(0);
    
    blank.setInteractive()
      .on(Phaser.Input.Events.POINTER_DOWN, () => {
        blank.disableInteractive();
        this.scene.tweens.add({
          targets: this,
          duration: 500,
          alpha: {from: 1, to: 0},
          onStart: () => {
            (this.scene.scene.get('game-scene') as GameScene).playGame();
          },
          onComplete: () => {
            this.setVisible(false);
            this.setAlpha(1);

          }
        });
      }).disableInteractive();
    
    
    this.add(getReadyMessage);
    this.add(helperMessage);
    this.add(blank);
    
    scene.time.addEvent({
      delay: 600,
      callback: () => {
        blank.setInteractive();
      }
    });
    
    scene.children.add(this);
  }





}