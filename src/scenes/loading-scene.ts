import { Scene } from 'phaser';
export default class LoadingScene extends Scene {

  constructor() {
    super('loading-scene');
  }

  public preload(): void {
    this.load.baseURL = 'assets/';

    this.load.atlas('sprite', 'sprites/flappy-bird-sprite.png', 'sprites/flappy-bird-sprite.json');

    this.load.audio('wing', 'audio/wing.wav');
    this.load.audio('die', 'audio/die.wav');
    this.load.audio('hit', 'audio/hit.wav'  );
    this.load.audio('point', 'audio/point.wav');
    this.load.audio('swoosh', 'audio/swoosh.wav');
  }

  public create(): void {
    // this.scene.start('game-scene');
    this.scene.start('ui-scene');
  }
}