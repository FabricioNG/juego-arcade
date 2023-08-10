export default class Game extends Phaser.Scene {
  constructor() {
    super("game");
  }

  Init() {}

  preload() {
    this.load.image("background", "./assets/image/black.jpg");
    this.load.image("paddle", "./assets/image/paddle.png");
   // this.load.image("ball", "./assets/image/ball.png");
  }

  create() {
    //add background
    this.add.image(400, 300, "background").setScale(0.555);

    //add player
    this.player = this.physics.add.sprite(300, 800, "paddle");
    this.player.setCollideWorldBounds(true);

    //create cursor
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update() {
    //Move player
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-250);
    } else {
      if (this.cursors.right.isDown) {
        this.player.setVelocityX(250);
      } else {
        this.player.setVelocityX(0);
      }
    }
  }

 
}