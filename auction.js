const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Auction = require('./models/auctions');


const app = express();

//connect to mongodb
const db = 'mongodb://localhost:27017/NodejsDB';
mongoose.connect(db)
    .then((result) => console.log('connected database...'))
    .catch((err) => console.log(err));

app.set('view engine', 'ejs');

app.use(express.static('styles'));
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));

//homepage
app.get('/', (req, res) => {
    // Auction.find()
    //     .then((result) => {
    //         res.send(result);
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //     })
    res.render('home', {title: 'blahblah'});
});


app.get('/profile', (req, res) => {
    res.render('profile', {title: 'profile'});
});


app.get('/profile/post', (req, res) => {
    
    res.render('post', {title: 'profile-post'});
});

app.get('/profile/ongoing', (req, res) => {
    Auction.findById()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        })
    res.render('ongoing', {title: 'home'});
});


app.post('/profile/post', (req, res) => {
    console.log(req.body)
    const auction = new Auction({
        name: req.body.name, 
        item: req.body.item,
         price: req.body.price
    });
    console.log(auction)

    auction.save()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        })
        res.redirect('/')
    // const auction = new Auction(req.body);

    // auction.save()
    //     .then((result) => {
    //         res.redirect('/home');
    //     })
    //     .catch((err) => console.log(err));
})

app.get('/profile/:id', (req, res) => {
    const id = req.params.id;
    Auction.findById(id)
        .then(result => {
            render('details', {auction, result, item: 'Auction details ' })
        })
        .catch((err) => console.log(err));
})

// app.delete('/auctions/:id', (req, res) => {
//     const id = req.params.id;
//     Auction.findByIdAndDelete(id)
//     .then((result) => {
//         res.json({ redirect: 'auctions' })
//     })
//     .catch((err) => console.log(err));
// })

app.get('/about', (req, res) => {
    res.render('about', {title: 'about'});
});

app.use((req, res) => {
    res.status(404).render('404');
});

app.listen(3000);

console.log('http://localhost:3000');