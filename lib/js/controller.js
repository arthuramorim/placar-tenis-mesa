// Conectar ao servidor usando Socket.IO
const socket = io();

socket.on('qrCode', (qrCodeURL) => {
  const qrcodeContainer = document.getElementById('qrcode-container');
  const qrCodeImg = document.createElement('img');
  qrCodeImg.src = qrCodeURL;
  qrcodeContainer.appendChild(qrCodeImg);
});

// Enviar atualizações de pontuação
function atualizarPontuacao() {
  const player1 = document.getElementById('player1').value;
  const player2 = document.getElementById('player2').value;
  const score1 = document.getElementById('score1').value;
  const score2 = document.getElementById('score2').value;
  const sets1 = document.getElementById('sets1').value;
  const sets2 = document.getElementById('sets2').value;

  const pontuacao = {
    player1,
    player2,
    score1,
    score2,
    sets1,
    sets2
  };

  socket.emit('pontuacao', pontuacao);
}



// Função para decrementar a pontuação
function decrementScore(inputId) {
  const input = document.getElementById(inputId);
  let value = parseInt(input.value);
  if (!isNaN(value)) {
    value--;
    input.value = value;
  }
  atualizarPontuacao()
}

// Função para incrementar a pontuação
function incrementScore(inputId) {
  const input = document.getElementById(inputId);
  let value = parseInt(input.value);
  if (!isNaN(value)) {
    value++;
    input.value = value;
  }
  atualizarPontuacao()
}
