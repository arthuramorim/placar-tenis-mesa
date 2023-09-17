const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const os = require('os');
const QRCode = require('qrcode');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Gerar o QR Code com o endereço IP do servidor
async function generateQRCode() {
  const networkInterfaces = os.networkInterfaces();
  let serverIp = '';

  Object.keys(networkInterfaces).forEach((interfaceName) => {
    networkInterfaces[interfaceName].forEach((interfaceData) => {
      if (interfaceData.family === 'IPv4' && !interfaceData.internal) {
        serverIp = interfaceData.address;
      }
    });
  });

  const ip = `http://${serverIp}:${port}/controller.html`;
  const qrCodeURL = await QRCode.toDataURL(ip);
  return qrCodeURL;
}

// Configuração de arquivos estáticos
app.use(express.static(__dirname + '/public'));

// Rota inicial
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/score.html');
});

// Iniciar conexão do Socket.IO
io.on('connection', async (socket) => {
  console.log('Um novo cliente se conectou');

  // Enviar o QR Code para o cliente
  const qrCodeURL = await generateQRCode();
  socket.emit('qrCode', qrCodeURL);

  // Evento para controlar a pontuação
  socket.on('pontuacao', (score) => {
    console.log('Pontuação atualizada:', score);
    io.emit('atualizarPontuacao', score);
  });

  // Evento de desconexão do cliente
  socket.on('disconnect', () => {
    console.log('Um cliente se desconectou');
  });
});

// Iniciar o servidor
const port = 3000;
server.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
