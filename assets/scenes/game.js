export default class Game extends Phaser.Scene {
  constructor() {
      super("game");
      this.score = 0;
      this.collisionCount = 0; // Contador de colisiones
      this.level = 1; // Nivel actual
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
    // Calcular la diferencia entre la posición de la pelota y la posición del centro del jugador
    const offsetX = ball.x - player.x;
    
    // Normalizar la diferencia para obtener un valor entre -1 y 1
    const normalizedOffsetX = offsetX / (player.displayWidth / 2);

    // Establecer la nueva velocidad en X de la pelota en función de la diferencia normalizada
    const newVelocityX = normalizedOffsetX * 500; // Ajusta la velocidad según tus necesidades

    // Establecer la nueva velocidad en X de la pelota
    ball.setVelocityX(newVelocityX);

    ball.setVelocityY(-300); // Ajusta la velocidad en el eje Y según tus necesidades

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