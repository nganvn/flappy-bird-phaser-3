import { Scene, Game } from 'phaser';
import GameScene from './game-scene';
import { Score } from '../classes/score';
import { GameMenu } from '../classes/ui/game-menu';
import { GameHelper } from '../classes/ui/game-helper';
import { GameOverBoard } from '../classes/ui/game-over-board';
import { Background } from '../classes/background';
import { Ground } from '../classes/ground';
import { Bird } from '../classes/bird';

export default class UIScene extends Scene {
  private gameOver!: Phaser.GameObjects.Image;
  private highScore: number = 0;
  
  private gameMenu!: GameMenu;
  private gameOverBoard!: GameOverBoard;

  public playBlackAnimationIn!: (duration: number) => void;
  public playBlackAnimationOut!: (duration: number) => void;

  constructor() {
    super('ui-scene');
  }

  public create(): void {
    this.gameMenu = new GameMenu(this, 0, 0);
    this.gameOverBoard = new GameOverBoard(this, 0, 0);
    this.showGameMenu();
  }

  public showGameOverBoard(score: number) {
    this.gameOverBoard.show(score);
    this.time.addEvent({
      delay: 1200, 
      callback: () => {
        this.showGameMenu();
      }
    });
  }

  public hideGameOverBoard() {
    this.gameOverBoard.hide();
  }

  public showGameMenu(): void {
    this.gameMenu.show();
  }

  private createBlackAnimation(): void {
    const blank = this.add.rectangle(0, 0, this.cameras.main.width, this.cameras.main.height, 0x000000, 0)
      .setOrigin(0);

    this.playBlackAnimationIn = (duration: number): void => {
      this.tweens.add({
        targets: blank,
        duration: duration,
        fillAlpha: {from: 1, to: 0},
        onStart: () => {
          blank.setVisible(true);
          this.sound.play('swoosh');
        },
        onComplete: () => {
          blank.setVisible(false);
        }
      });
    };

    
    this.playBlackAnimationOut = (duration: number): void => {
      this.tweens.add({
        targets: blank,
        duration: duration,
        fillAlpha: {from: 0, to: 1},
        onStart: () => {
          blank.setVisible(true);
          this.sound.play('swoosh');
        },
        onComplete: () => {
          blank.setVisible(false);
        }
      });
    };


    this.children.addAt(blank, 101)
  }
}