const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000;
const router = express.Router();
const portfolioRouter = require('./router/portfolioRouter');

app.use(cors());

app.use(bodyparser.urlencoded({extends: true}));
app.use(bodyparser.json());

router.get("/",(req,res) => res.json({
    mensagem: 'App está online!'
}));

app.use('/', router);

app.use('/portfolio', portfolioRouter);

app.listen(port);
console.log('App está rodando!');