const router = require('express').Router();
const Product = require('../product.js');

router.get('/items', (req, res) => {
    res.send(Product.items);
});

router.get('/items/:id', (req, res) => {
    let product = Product.items.find(product => product.id === Number(req.params.id));
    if (product) {
        res.send(product);
    } else {
        res.status(404).send({ error: 'Product no found' });
    }
});

router.post('/items', (req, res) => {
    let { title, price, thumbnail } = req.body;
    const product = { title, price, thumbnail };
    product.id = Product.items.length + 1;
    Product.items.push(product);
    res.send(Product.items);
});

router.put('/items/:id', (req, res) => {
    let { title, price, thumbnail } = req.body;
    let index = Product.items.findIndex(item => item.id === Number(req.params.id));
    if (index >= 0) {
        Product.items[index] = { title, price, thumbnail };
        Product.items[index].id = Number(req.params.id);
        res.send(Product.items[index]);
    } else {
        res.status(404).send({ error: 'Product no found' });
    }
});

router.delete('/items/:id', (req, res) => {
    let index = Product.items.findIndex(product => product.id === Number(req.params.id));
    if (index >= 0) {
        Product.items.splice(index, 1);
        res.send({ message: 'Product Deleted' });
    } else {
        res.status(404).send({ error: 'Product no found' });
    }
})

module.exports = router;