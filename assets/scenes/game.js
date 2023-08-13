export default class Game extends Phaser.Scene {
  constructor() {
      super("game");
      this.score = 0;
      this.collisionCount = 0; // Contador de colisiones
      this.level = 1; // Nivel actual
      this.ballSpeed = 200; // Velocidad inicial de la pelota

  }

  Init() {}

  preload() {
    this.load.image("background", "./assets/image/grey.png");
    this.load.image("paddle", "./assets/image/paddle.png");
    this.load.image("ball", "./assets/image/ball.png");
    this.load.image("red", "./assets/image/red.png");
    this.load.image("blue", "./assets/image/blue.png");
    this.load.image("obstacle", "./assets/image/obstacle.png");
  }

  create() {
    this.backgroundImage = this.add.image(400, 300, "background");
    this.backgroundImage.setScale(0.555);

    // Crear variable para el obstáculo
    this.obstacle = null;

    //add player
    this.player = this.physics.add.sprite(300, 800, "paddle");
    this.player.setCollideWorldBounds(true);

    //create cursor
    this.cursors = this.input.keyboard.createCursorKeys();

    // Crear la pelota
    this.ball = this.physics.add.sprite(400, 300, "ball");
    this.ball.setCollideWorldBounds(true);
    this.ball.setBounce(1); 
    this.ball.setVelocity(this.ballSpeed, -this.ballSpeed); // Usar la velocidad inicial almacenada

    // Configurar colisión entre la pelota y el jugador
    this.physics.add.collider(this.ball, this.player, this.handleBallPlayerCollision, null, this);

  // Crear un texto para mostrar la puntuación
  this.scoreText = this.add.text(16, 16, 'Score: 0', {
    fontSize: '24px',
    fill: '#fff'
});

// Crear un texto para mostrar el nivel en la esquina superior derecha
this.levelText = this.add.text(this.game.config.width - 16, 16, `Level: ${this.level}`, {
    fontSize: '24px',
    fill: '#fff',
    align: 'right'
});
this.levelText.setOrigin(1, 0);


  }

  handleBallPlayerCollision(ball, player) {

    ball.setVelocityY(-300); // Ajusta la velocidad en el eje Y

    // Aumentar los puntos y actualizar la puntuación en la pantalla
    this.score += 10; // Ajusta la cantidad de puntos ganados
    this.scoreText.setText(`Score: ${this.score}`);

    // Aumentar el contador de colisiones
    this.collisionCount++;

    // Verificar si se debe pasar de nivel
    if (this.collisionCount >= 10) {
      this.level++; // Aumentar el nivel
      this.levelText.setText(`Level: ${this.level}`); // Actualizar el texto del nivel
      this.collisionCount = 0; // Reiniciar el contador de colisiones

      // Cambiar el fondo a una imagen aleatoria
      const randomImage = Phaser.Math.RND.pick(["red", "blue", "background"]);
      this.backgroundImage.setTexture(randomImage);

      // Aumentar la velocidad de la pelota en un 10%
      this.ballSpeed *= 1.1;

      // Restablecer la velocidad de la pelota con el nuevo valor
      this.ball.setVelocity(this.ballSpeed, -this.ballSpeed);

      // Crear un obstáculo con tamaño y posición aleatorios
    const obstacle = this.add.image(
      Phaser.Math.Between(100, this.game.config.width - 100),
      Phaser.Math.Between(100, this.game.config.height - 100),
      "obstacle"
  );
  obstacle.setScale(Phaser.Math.FloatBetween(0.5, 1.5));

  // Agregar físicas al obstáculo
  this.physics.add.existing(obstacle);
  obstacle.body.setAllowGravity(false); // Desactivar la gravedad para el obstáculo
  obstacle.body.setImmovable(true); // Hacer que el obstáculo sea inamovible


  // Configurar colisión entre la pelota y el obstáculo
  this.physics.add.collider(this.ball, obstacle);
  
  // Configurar colisión entre el jugador y el obstáculo
  this.physics.add.collider(this.player, obstacle);
    }
}

update() {
  // Move player
  if (this.cursors.up.isDown) {
      this.player.setVelocityY(-400); // Mover hacia arriba
  } else if (this.cursors.down.isDown) {
      this.player.setVelocityY(400); // Mover hacia abajo
  } else {
      this.player.setVelocityY(0);
  }

  if (this.cursors.left.isDown) {
      this.player.setVelocityX(-400); // Mover hacia la izquierda
  } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(400); // Mover hacia la derecha
  } else {
      this.player.setVelocityX(0);
  }
}
}