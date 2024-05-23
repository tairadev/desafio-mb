const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');
const port = 3000;

(async () => {
  const { default: ValidationHelper } = await import('../client/src/helpers/ValidationHelper.js');

  app.use(cors());

  app.use(express.json());

  app.use('/registration', express.static(path.join(__dirname, '../client/dist')));

  app.get('/registration/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
  });

  app.post('/registration', (req, res) => {
    const { isPJ, email, name, document, date, phone, password } = req.body;

    if (!ValidationHelper.isEmailValid(email)) {
      return res.status(400).json({
        status: 'error',
        message: 'Por favor, preencha o campo e-mail corretamente.'
      });
    }

    if (!ValidationHelper.isNameValid(name)) {
      return res.status(400).json({
        status: 'error',
        message: 'Por favor, insira um nome válido.'
      });
    }

    if (!ValidationHelper.isDocumentValid(document, isPJ)) {
      return res.status(400).json({
        status: 'error',
        message: `Por favor, insira um ${isPJ ? 'CNPJ' : 'CPF'} válido.`
      });
    }

    if (!ValidationHelper.isDateValid(date, isPJ)) {
      return res.status(400).json({
        status: 'error',
        message: `Por favor, insira uma data ${isPJ ? 'de abertura' : 'de nascimento'} válida.`
      });
    }

    if (!ValidationHelper.isPhoneValid(phone)) {
      return res.status(400).json({
        status: 'error',
        message: `Por favor, insira um telefone válido.`
      });
    }

    const verifyPass = {};
    verifyPass.isNumber = /\d/.test(password);
    verifyPass.isMin = password.length >= 8;
    verifyPass.isUpper = /[A-Z]/.test(password);
    verifyPass.isLower = /[a-z]/.test(password);
    verifyPass.isSpecial = /[^A-Za-z0-9]/.test(password);
    const isPasswordValid = Object.values(verifyPass).every(value => value === true);

    if (!isPasswordValid) {
      return res.status(400).json({
        status: 'error',
        message: `A senha não atende a todos os requisitos`
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Usuário cadastrado com sucesso!'
    });
  });

  app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
  });

})();