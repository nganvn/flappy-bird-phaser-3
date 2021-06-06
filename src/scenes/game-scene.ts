import { Scene, Physics, GameObjects } from 'phaser';
import { Background } from '../classes/background';
import { Ground } from '../classes/ground';
import { Bird } from '../classes/bird';
import Pipes from '../classes/pipes';
import { GameProperties } from '../consts';
import { Score } from '../classes/score';
import UIScene from './ui-scene';

export default class GameScene extends Scene {
  private background!: Background;
  private ground!: Ground;
  private bird!: Bird;
  private birdCollider!: Physics.Arcade.Collider;
  private pipes!: Pipes;
  private score!: Score;

  constructor() {
    super('game-scene');
  }

  public create(): void {
    this.background = new Background(this);
    this.bird = new Bird(this);
    this.ground = new Ground(this);
    // let text = this.add.text(100, 100, 'Hello, world');
    // this.children.addAt(text, 20);
    this.score = new Score(this);
    this.score.setVisible(false);
    this.birdCollider = this.physics.add.collider(this.bird, this.ground, this.endGame);
    // this.playGame();
  }

  public update(): void {
    this.bird.update();
  }

  public playGame = (): void => {
    this.bird.enableFly();
    this.score.setVisible(true);
    this.time.addEvent({
      delay: GameProperties.PIPE_DELAY,
      loop: true,
      callback: () => {
        let pipes = new Pipes(this);
        pipes.move();
        this.children.add(pipes);
        let pipeChild = (pipes as Pipes).getAll();
        let overlapPipes: Physics.Arcade.Collider;
        let overlapScore = this.physics.add.overlap(this.bird, pipeChild, (x, y) => {
          this.score.increaseScore();
          this.physics.world.removeCollider(overlapScore);
        });
        overlapPipes = this.physics.add.overlap(this.bird, pipeChild.splice(0, 2), (x, y) => {
          this.endGame();
          var timer = this.time.addEvent({
            delay: 150,
            callback: () => this.sound.play('die'),
           });
          this.physics.world.removeCollider(overlapPipes);
          this.physics.world.removeCollider(overlapScore);
        });
      }
    });
  }

  private endGame = (): void => {
    this.sound.play('hit');
    this.tweens.getAllTweens().forEach( (tween) => {
      if (tween.targets) {
        tween.stop();
      }
      
    });
    this.time.removeAllEvents();
    this.bird.disableFly();
    this.birdCollider.collideCallback = () => {};
    let ui_scene = this.scene.get('ui-scene') as UIScene;
    ui_scene.showEndGameBoard(this.score.getScore());
  }


}