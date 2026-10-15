const express = require('express');
const router = express.Router();

router.get('/', (req,res) => {
    res.render('teste', {
        titulo: 'Página de Testes 2'
    })
});

module.exports = router;