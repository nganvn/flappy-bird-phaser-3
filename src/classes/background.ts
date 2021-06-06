import { GameObjects, Scene } from 'phaser';
export class Background extends GameObjects.Image {
  
  constructor(scene: Scene) {
    super(scene, 0, 0, '');
    this.setTexture('background');
    this.setOrigin(0);
    scene.children.addAt(this, 1);
  }
}