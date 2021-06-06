import { Scene } from 'phaser';
export default class LoadingScene extends Scene {

  constructor() {
    super('loading-scene');
  }

  public preload(): void {
    this.load.baseURL = 'assets/';

    this.load.image('background', 'sprites/background-day.png');
    this.load.image('ground', 'sprites/base.png');
    this.load.image('blue-bird', 'sprites/bluebird-midflap.png');
    this.load.image('pipe-green-down', 'sprites/pipe-green-down.png');
    this.load.image('pipe-green-up', 'sprites/pipe-green-up.png');

    this.load.image('helper', 'sprites/message.png');
    this.load.image('game-over', 'sprites/gameover.png');
    this.load.atlas('bird', 'sprites/bird.png', 'sprites/bird.json');
    this.load.atlas('sprite', 'sprites/flappy-bird-sprite.png', 'sprites/flappy-bird-sprite.json');

    Array(10).fill(null).map((ele, index) => {
      this.load.image(`${index}`, `sprites/${index}.png`);
    });

    this.load.audio('wing', 'audio/wing.wav');
    this.load.audio('die', 'audio/die.wav');
    this.load.audio('hit', 'audio/hit.wav'  );
    this.load.audio('point', 'audio/point.wav');
    this.load.audio('swoosh', 'audio/swoosh.wav');
  }

  public create(): void {
    this.scene.start('game-scene');
    this.scene.start('ui-scene');
  }
}