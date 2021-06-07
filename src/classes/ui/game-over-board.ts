import { Scene } from "phaser";
import GameScene from '../../scenes/game-scene';
import { SmallScore } from '../small-score';

export class GameOverBoard extends Phaser.GameObjects.Container {
  private highScoreValue: number = 0;
  public show: (curScore: number) => void;
  public hide: () => void;

  constructor(scene: Scene, x: number, y: number) {
    super(scene, x, y);
    let camera = scene.cameras.main;

    const gameOverMessage = scene.add.image(camera.width / 2, 150, 'sprite', 'message/message-game-over')
      .setAlpha(0);
    const boardContainer = scene.add.container(camera.width / 2, 250).setVisible(false);

    const board = scene.add.image(0, 0, 'sprite', 'message/board');
    const medal = scene.add.image(-65, 8, 'sprite', 'medal/silver-medal');
    const newMessage = scene.add.image(38, 8, 'sprite', 'message/message-new');

    const currentScore = new SmallScore(scene, 90, -15);
    const highScore = new SmallScore(scene, 90, 28);

    let dist = 6;
    this.setVisible(false);

    this.show = (curScore: number) => {
      if (curScore > this.highScoreValue) {
        this.highScoreValue = curScore;
        newMessage.setVisible(true);
      } else {
        newMessage.setVisible(false);
      }
      if (curScore >= 50) {
        medal.setTexture('sprite', 'medal/gold-medal-1');
      } else if (curScore >= 20) {
        medal.setTexture('sprite', 'medal/gold-medal-0');
      } else if (curScore >= 10) {
        medal.setTexture('sprite', 'medal/silver-medal-1');
      } else if (curScore >= 5) {
        medal.setTexture('sprite', 'medal/silver-medal');
      } else {
        medal.setAlpha(0);
      }
      if (curScore >= 5) {
        medal.setAlpha(1);
      }

      currentScore.setScore(curScore);
      highScore.setScore(this.highScoreValue);

      this.scene.tweens.add({
        targets: gameOverMessage,
        duration: 250,
        delay: 800,
        alpha: {from: 0, to: 1},
        onStart: () => {
          this.scene.sound.play('swoosh');
        }
      });
      this.scene.tweens.add({
        targets: gameOverMessage,
        duration: 150,
        delay: 800,
        repeat: 1,
        y: {
          getStart: () => {
            return gameOverMessage.y;
          },
          getEnd: () => {
            dist = - dist;
            return gameOverMessage.y + dist;
          }
        }, 
        onStart: () => {
          this.scene.sound.play('swoosh');
        }
      });

      this.scene.tweens.add({
        targets: boardContainer,
        delay: 1300,
        duration: 250,
        y: {from: camera.width + 300, to: 250},
        onStart: () => {
          boardContainer.setY(camera.width + 300);
          boardContainer.setVisible(true);
        }
      });
      this.setVisible(true);
    };

    this.hide = () => {
      this.setVisible(false);
      gameOverMessage.setAlpha(0);
      boardContainer.setVisible(false);
    };
    
    boardContainer
      .add(board)
      .add(medal)
      .add(currentScore)
      .add(highScore)
      .add(newMessage);
    
    this
      .add(gameOverMessage)
      .add(boardContainer);

    scene.children.add(this);
  }





}