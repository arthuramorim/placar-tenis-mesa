
// Conectar ao servidor usando Socket.IO
const socket = io();

// Receber atualizações de pontuação
socket.on('atualizarPontuacao', (pontuacao) => {
  document.getElementById('player1').textContent = pontuacao.player1;
  document.getElementById('player2').textContent = pontuacao.player2;
  document.getElementById('score1').textContent = pontuacao.score1;
  document.getElementById('score2').textContent = pontuacao.score2;
  document.getElementById('sets1').textContent = pontuacao.sets1;
  document.getElementById('sets2').textContent = pontuacao.sets2;
});