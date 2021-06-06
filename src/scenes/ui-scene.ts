import { Scene, Game } from 'phaser';
import GameScene from './game-scene';
import { Score } from '../classes/score';
enum GameState {
  AWAIT = 0,
  PLAYING,
  DIE,
  ENDGAME
}

export default class UIScene extends Scene {
  private helper!: Phaser.GameObjects.Image;
  private gameOver!: Phaser.GameObjects.Image;
  private highScore: number = 0;
  private gameState: GameState;
  private _highScore!: Score;

  private playGame = () => {
    let gameScene = this.scene.get('game-scene') as GameScene;
    this.helper.setVisible(false);
    gameScene.playGame();
  }

  constructor() {
    super('ui-scene');
    this.gameState = GameState.AWAIT;
  }

  public create(): void {   
    
    var rect = new Phaser.Geom.Rectangle(0, 0, this.cameras.main.width, this.cameras.main.height);

    let pointer = this.input.activePointer;
    this.helper = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 3 + 16, 'helper')
      .setInteractive(rect, () => {
        if (pointer.isDown) {
          this.playGame();
        }
    });

    this.gameOver = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 3 + 16, 'game-over')
    .setInteractive(rect, () => {
      if(pointer.isDown && this.gameState == GameState.ENDGAME) {
        this.scene.get('game-scene').scene.restart();
        this.helper.setVisible(true);
        this.gameOver.setVisible(false);
        this._highScore.setVisible(false);
        this.gameState = GameState.AWAIT;
      }
    });
    this._highScore = new Score(this);
    this._highScore.setVisible(false);
    this._highScore.setScale(1.5);
    this._highScore.setY(260);

    this.gameOver.setVisible(false);
  }

  public showEndGameBoard(score: number) {
    this.gameOver.setAlpha(0);
    this.gameOver.setVisible(true);
    this.tweens.add({
      targets: this.gameOver,
      delay: 500,
      duration: 600,
      alpha: {from: 0, to: 1 },
      onStart: () => {
        this.sound.play('swoosh');
      },
      onComplete: () => {
        this.gameOver.setAlpha(1);
      } 
    });
    
    this._highScore.setAlpha(0);
    this._highScore.setVisible(true);
    if (score > this.highScore) {
      this.highScore = score;
      this._highScore.setScore(this.highScore);
      this._highScore.printScore();
    }
    this.tweens.add({
      targets: this._highScore,
      delay: 1100,
      duration: 600,
      alpha: {from: 0, to: 1 },
      onStart: () => {
        this.sound.play('swoosh');
      },
      onComplete: () => {
        this._highScore.setAlpha(1);
      } 
    });
    
    var timer = this.time.addEvent({
      delay: 2000,
      callback: () => {
        this.gameState = GameState.ENDGAME;
      }
     });
  }


}