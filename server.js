const { gerarReferencia } = require('./gerarReferencia.js');
const express = require('express');

const app = express();
app.use(express.json())

app.post('/referencia', (req, res) => {
    const {entidade, subentidade, id, valor} = req.body;
    try {
        const referencia = gerarReferencia(entidade, subentidade, id, valor);
        res.status(200).json({
            referencia: referencia,
            valor: valor
        })
    } catch (error) {
        console.log("Ocorreu um erro ao gerar a referência, verifique os parâmetros enviados.", error.message)
        res.status(400).json({
            "error": "Erro ao gerar a referência, verifique os parâmetros enviados."
        })
    }
})

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor conectado na porta ${PORT}`);
})
