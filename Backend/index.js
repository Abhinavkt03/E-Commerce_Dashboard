const express = require('express');
const config = require('./database/config');
const User = require('./database/users');
const Products = require('./database/products');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const app = express();

const jwtKey = 'e-comm';

app.use(express.json());
app.use(cors());

// app.get("/",(req,res)=>{
//     res.send("Successfull");
// });

app.post('/register', async (req, res) => {
    let user = new User(req.body);
    let result = await user.save();
    // console.log(result);
    result = result.toObject();
    delete result.password;
    // res.send(result);
    if(result){
        jwt.sign({ result }, jwtKey, { expiresIn: '2h' }, (err, token) => {
            res.send({ result, auth: token });
        });
    } else {
        res.send({ result: 'No result Found' })
    }
});

app.post('/login', async (req, res) => {
    if (req.body.email && req.body.password) {
        const result = await User.findOne(req.body).select('-password');
        if (result) {
            jwt.sign({ result }, jwtKey, { expiresIn: '2h' }, (err, token) => {
                res.send({ result, auth: token });
            });
        } else {
            res.send({ result: 'No result Found' });
        }
    } else {
        res.send({ result: 'No result Found' });
    }
});


app.post('/add-products', async (req, res) => {
    const product = new Products(req.body);
    const result = await product.save();
    res.send(result);
});

app.get('/products', async (req, res) => {
    const products = await Products.find();
    res.send(products);
});

app.delete('/product/:id', async (req, res) => {
    const result = await Products.deleteOne({ _id: req.params.id });
    res.send(result);
});

app.get('/product/:id', async (req, res) => {
    const result = await Products.findById({ _id: req.params.id });
    if (result) {
        res.send(result);
    } else {
        res.send({ result: "No Record Found" });
    };
});

app.put('/product/:id', async (req, res) => {
    const result = await Products.updateOne(
        { _id: req.params.id },
        { $set: req.body }
    );
    res.send(result);
});

app.get('/search/:key', async (req, res) => {
    const result = await Products.find({
        $or: [
            { name: { $regex: new RegExp(req.params.key, 'i') } },
            { category: { $regex: new RegExp(req.params.key, 'i') } },
            { company: { $regex: new RegExp(req.params.key, 'i') } }
        ]
    });
    res.send(result);
});

app.listen(5000, () => {
    console.log('http://localhost:5000/');
});