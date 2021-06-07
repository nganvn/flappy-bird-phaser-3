import { GameObjects, Scene } from 'phaser';

export class Score extends GameObjects.Container {
  private scoreValue: number;

  constructor(scene: Scene) {
    super(scene);

    this.scoreValue = 0;
    this
      .setY(80)
      .setVisible(false)
      .setDepth(15);

    this.printScore();
  }

  public getScore(): number {
    return this.scoreValue;
  }

  public setScore(score: number) {
    this.scoreValue = score;
  }

  public printScore(): void {
    this.getAll().forEach((ele) => ele.destroy());

    let offset = 0;
    this.scoreValue.toString().split('').forEach((item) => {
      let digit = this.scene.add.image(offset, 0, 'sprite', `digit/digit-36-${item}`);

      digit.setOrigin(0, 0.5);
      this.add(digit);
      offset += digit.width - 4;
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
