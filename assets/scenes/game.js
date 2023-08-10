export default class Game extends Phaser.Scene {
  constructor() {
    super("game");
  }

  Init() {}

  preload() {
    this.load.image("background", "./assets/image/black.jpg");
    this.load.image("paddle", "./assets/image/paddle.png");
    this.load.image("ball", "./assets/image/ball.png");
  }

  create() {
    //add background
    this.add.image(400, 300, "background").setScale(0.555);

    //add player
    this.player = this.physics.add.sprite(300, 800, "paddle");
    this.player.setCollideWorldBounds(true);

    //create cursor
    this.cursors = this.input.keyboard.createCursorKeys();

    // Crear la pelota
    this.ball = this.physics.add.sprite(400, 300, "ball");
    this.ball.setCollideWorldBounds(true);
    this.ball.setBounce(1); 
    this.ball.setVelocity(200, -200); 

    // Configurar colisión entre la pelota y el jugador
    this.physics.add.collider(this.ball, this.player, this.handleBallPlayerCollision, null, this);

  }

  handleBallPlayerCollision(ball, player) {
    // Calcular la diferencia entre la posición de la pelota y la posición del centro del jugador
    const offsetX = ball.x - player.x;
    
    // Normalizar la diferencia para obtener un valor entre -1 y 1
    const normalizedOffsetX = offsetX / (player.displayWidth / 2);

    // Establecer la nueva velocidad en X de la pelota en función de la diferencia normalizada
    const newVelocityX = normalizedOffsetX * 500; // Ajusta la velocidad según tus necesidades

    // Establecer la nueva velocidad en X de la pelota
    ball.setVelocityX(newVelocityX);
}

  update() {
    //Move player
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-400);
    } else {
      if (this.cursors.right.isDown) {
        this.player.setVelocityX(400);
      } else {
        this.player.setVelocityX(0);
      }
    }
  }

 
}