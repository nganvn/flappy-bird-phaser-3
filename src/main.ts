import { Game, Scale, Types, WEBGL } from 'phaser';
import GameScene from './scenes/game-scene';
import LoadingScene from './scenes/loading-scene';
import UIScene from './scenes/ui-scene';

type GameConfigExtended = Types.Core.GameConfig & {
  winScore: number;
};

export const gameConfig: GameConfigExtended = {
  title: 'Flappy bird - Phaser3',
  type: Phaser.AUTO,
  parent: 'game',
  backgroundColor: '#ccffff',
  scale: {
    mode: Scale.ScaleModes.NONE,
    width: 288,
    height: 512,
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {y: 0},
      debug: false
    }
    
  },
  render: {
    antialiasGL: false,
    pixelArt: true,
  },
  callbacks: {
    postBoot: () => {
      window.sizeChanged();
    },
  },
  canvasStyle: `display: block; width: 100%; height: 100%;`,
  autoFocus: true,
  audio: {
    disableWebAudio: false,
  },
  scene: [LoadingScene, GameScene, UIScene],
  winScore: 40,
};

window.sizeChanged = () => {
  if (window.game.isBooted) {
    setTimeout(() => {
      window.game.canvas.setAttribute(
        'style', `
          display: block; 
          width: ${window.innerHeight * 288/512}px; 
          height: ${window.innerHeight}px;
          margin-left: auto;
          margin-right: auto;
        `,
      );
    }, 100);
  }
};

window.onresize = () => window.sizeChanged();

window.game = new Game(gameConfig);
