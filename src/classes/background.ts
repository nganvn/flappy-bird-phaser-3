import { GameObjects, Scene } from 'phaser';
export class Background extends GameObjects.Image {
  
  constructor(scene: Scene) {
    super(scene, 0, 0, '');
    let backgrounds = ['background-day', 'background-night'];
    
    this.setTexture('sprite', backgrounds[Phaser.Math.Between(0, 1)])
      .setOrigin(0)
      .setDepth(0);
  }
}