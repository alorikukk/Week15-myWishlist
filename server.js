const express = require('express');
const Wish = require('./model/wish')

const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));

app.get('/', (req, res) => {
    Wish.fetchAllWishes(wishesFromFile => {
        console.log(wishesFromFile);
        res.render('index', {myWishes: wishesFromFile});
    });

});

app.post('/wish', (req, res) => {
    let userData = req.body.userWish;
    let clearCommand = req.body.userWish.toLowerCase();
    let newWish = new Wish(userData);
    if (!clearCommand.includes("clear wishlist")){
        console.log(userData);
        newWish.saveWish();
    } else {
        newWish.clearWishes()
    }

    res.redirect('/');

});





const port = 5000;

app.listen(port, () => {
    console.log(`Server is running ${port}.`);
})