import { Scene, Physics, GameObjects } from 'phaser';
import { Background } from '../classes/background';
import { Ground } from '../classes/ground';
import { Bird } from '../classes/bird';
import Pipes from '../classes/pipes';
import { GameProperties } from '../consts';
import { Score } from '../classes/score';
import UIScene from './ui-scene';
import { GameHelper } from '../classes/ui/game-helper';

export default class GameScene extends Scene {
  private background!: Background;
  private ground!: Ground;
  private bird!: Bird;
  private birdCollider!: Physics.Arcade.Collider;
  private score!: Score;

  
  private gameHelper!: GameHelper;


  constructor() {
    super('game-scene');
    
    // this.children.addAt(this.gameHelper, 100);
  }

  public create(): void {
    this.ground = new Ground(this);
    this.background = new Background(this);
    this.bird = new Bird(this);
    this.score = new Score(this);
    this.gameHelper = new GameHelper(this, 0, 0);

    this.children.addAt(this.ground, 25);
    this.children.addAt(this.background, 0);
    this.children.addAt(this.bird, 2);
    this.children.addAt(this.score, 10);
    this.children.addAt(this.gameHelper, 20);

    this.birdCollider = this.physics.add.collider(this.bird, this.ground, this.endGame);
    this.bird.setPlayingPosition();
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
      callback: this.addPipe
    });
  }

  private addPipe = () => {
    let pipes = new Pipes(this);
    let pipeChild = pipes.getAll();

    let overlapPipes = this.physics.add.overlap(this.bird, pipeChild.splice(0, 2), (x, y) => {
      this.endGame();
      var timer = this.time.addEvent({
        delay: 150,
        callback: () => this.sound.play('die'),
       });
      this.physics.world.removeCollider(overlapPipes);
      this.physics.world.removeCollider(overlapScore);
    });

    let overlapScore = this.physics.add.overlap(this.bird, pipeChild, (x, y) => {
      this.score.increaseScore();
      this.physics.world.removeCollider(overlapScore);
    });

    this.children.add(pipes);
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
    ui_scene.showGameOverBoard(this.score.getScore());
  }

}