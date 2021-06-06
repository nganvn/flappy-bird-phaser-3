import { GameObjects, Scene } from 'phaser';

export class Score extends GameObjects.Container {
  private scoreValue: number;

  constructor(scene: Scene) {
    super(scene);
    this.setSize(100, 100);

    this.scoreValue = 0;
    this.setY(130);

    this.printScore();

    scene.children.addAt(this, 100);
  }

  public getScore(): number {
    return this.scoreValue;
  }

  public setScore(score: number) {
    this.scoreValue = score;
  }

  public printScore(): void {
    this.getAll().forEach( (ele) => ele.destroy());

    let offset = 0;
    this.scoreValue.toString().split('').forEach((item) => {
      let number = this.scene.add.image(offset, 0, item);
      number.setOrigin(0, 0.5);
      this.addAt(number, 100);
      offset += number.width - 4;
    });
    offset += 4;
    offset *= this.scale;
    this.setX(this.scene.cameras.main.width / 2 - offset / 2);
  }

  public increaseScore(): void {
    this.scene.sound.play('point');
    this.scoreValue += 1;
    this.printScore();

  }
}
