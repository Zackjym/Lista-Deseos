const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

let wishlist = [];

app.get('/', (req, res) => {
    res.render('pages/index', { wishlist: wishlist });
});

app.post('/add', (req, res) => {
    const { name, price, description } = req.body;
    const newItem = { name, price: parseFloat(price), description };
    wishlist.push(newItem);
    res.redirect('/');
});

app.get('/edit/:index', (req, res) => {
    let index = req.params.index;
    let item = wishlist[index];
    res.render('pages/edit', { index: index, item: item });
});

app.post('/edit/:index', (req, res) => {
    let index = req.params.index;
    wishlist[index].name = req.body.name;
    wishlist[index].price = parseFloat(req.body.price);
    wishlist[index].description = req.body.description;
    res.redirect('/');
});

app.post('/delete/:index', (req, res) => {
    let index = req.params.index;
    wishlist.splice(index, 1);
    res.redirect('/');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});