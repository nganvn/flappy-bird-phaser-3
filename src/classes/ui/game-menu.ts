import { on } from "events";
import { GameObjects, Scene } from "phaser";
import GameScene from '../../scenes/game-scene';
import { GameHelper } from './game-helper';
import UIScene from '../../scenes/ui-scene';
import { Bird } from "../bird";
import { Background } from "../background";
import { Ground } from '../ground';

export class GameMenu extends Phaser.GameObjects.Container {  
  public show: () => void;
  

  constructor(scene: Scene, x: number, y: number) {
    super(scene, x, y);
    let camera = scene.cameras.main;

    const playButton = scene.add.image(camera.width / 2 - 65, 175 + 196, 'sprite', 'button/button-playgame');
    const rankButton = scene.add.image(camera.width / 2 + 65, 175 + 196, 'sprite', 'button/button-rank');
    const blank = scene.add.rectangle(0, 0, scene.cameras.main.width, scene.cameras.main.height, 0x000000, 0)
      .setOrigin(0)
      .setDepth(100);
    const introScreen = this.createIntroScreen();

    let onClick = false;
    
    playButton.setInteractive()
      .on(Phaser.Input.Events.POINTER_DOWN, () => {
        onClick = true;
        playButton.y += 2;
      })
      .on(Phaser.Input.Events.POINTER_OUT, () => {
        if (onClick) {
          playButton.y -= 2;
          onClick = false;
        }
      })
      .on(Phaser.Input.Events.POINTER_UP, () => {
        if (onClick) {
          playButton.disableInteractive();
          playButton.y -= 2;
          onClick = false;
          this.scene.tweens.add({
            targets: blank,
            duration: 600,
            yoyo: true,
            fillAlpha: {from: 0, to: 1},
            onStart: () => {
              this.scene.sound.play('swoosh');
            },
            onYoyo: () => {
              this.setVisible(false);
              introScreen.setVisible(false);
              this.scene.scene.get('game-scene').scene.start();
              (this.scene as UIScene).hideGameOverBoard();
            }
          });
        }
      }).disableInteractive();  

    rankButton.setInteractive()
      .on(Phaser.Input.Events.POINTER_DOWN, () => {
        onClick = true;
        rankButton.y += 2;
      })
      .on(Phaser.Input.Events.POINTER_OUT, () => {
        if (onClick) {
          rankButton.y -= 2;
          onClick = false;
        }
      })
      .on(Phaser.Input.Events.POINTER_UP, () => {
        if (onClick) {
          rankButton.y -= 2;
          onClick = false;
        }
      }).disableInteractive(); 

    this.show = () => {
      this.setVisible(true);
      this.scene.time.addEvent({
        delay: 600,
        callback: () => {
          playButton.setInteractive();
          rankButton.setInteractive();
        }
      });
    }

    this
      .add(introScreen)
      .add(playButton)
      .add(rankButton)
      .setVisible(false);

    scene.children.add(this);
  }


  private createIntroScreen(): GameObjects.Container {
    let scene = this.scene;
    let camera = scene.cameras.main;

    let introContainer = this.scene.add.container();

    const flappyBirdMessage = scene.add.image(camera.width / 2, 175, 'sprite', 'message/message-flappy-bird');
    const rateButton = scene.add.image(camera.width / 2, 290, 'sprite', 'button/button-rate');
    const bird = new Bird(scene);
    const background = new Background(scene);
    const ground = new Ground(scene);
    
    const blank = scene.add.rectangle(0, 0, scene.cameras.main.width, scene.cameras.main.height, 0x000000, 1)
      .setOrigin(0).setDepth(200);
    this.scene.tweens.add({
      targets: blank,
      duration: 500,
      fillAlpha: {from: 1, to: 0},
      onComplete: () => {
        blank.setVisible(false);  
      }
    });
    
    introContainer
      .add(background)
      .add(ground)
      .add(flappyBirdMessage)
      .add(rateButton)
      .add(bird);

    let onClick = false;
    
    rateButton.setInteractive()
      .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
        onClick = true;
        rateButton.y += 2;
      })
      .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => {
        if (onClick) {
          rateButton.y -= 2;
          onClick = false;
        }
      })
      .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
        if (onClick) {
          rateButton.y -= 2;
          onClick = false;
        }
      });

    return introContainer;
  }
}