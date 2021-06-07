import { GameObjects, Scene } from 'phaser';

export class SmallScore extends GameObjects.Container {
  private scoreValue: number;

  constructor(scene: Scene, x: number, y: number) {
    super(scene, x, y);

    this.scoreValue = 0;

    scene.children.addAt(this, 100);
  }

  public getScore(): number {
    return this.scoreValue;
  }

  public setScore(score: number): SmallScore {
    this.scoreValue = score;
    this.printScore();
    return this;
  }

  public printScore(): void {
    this.getAll().forEach((ele) => ele.destroy());

    let offset = 0;
    this.scoreValue.toString().split('').reverse().forEach((item) => {
      let digit = this.scene.add.image(offset, 0, 'sprite', `digit/digit-20-${item}`);

      digit.setOrigin(1, 0.5);
      this.add(digit);
      offset -= digit.width + 2;
    });
  }

  public increaseScore(): void {
    this.scene.sound.play('point');
    this.scoreValue += 1;
    this.printScore();
  }
}
