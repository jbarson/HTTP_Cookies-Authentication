const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const PORT = 3030;

const app = express();

app.use(morgan('dev'));
app.set("view engine", "ejs");
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

const users = {
    1: {
        email: 'yakko@example.com',
        password: 'password'
    },
    2: {
        email: 'wakko@example.com',
        password: 'password'
    },
    3: {
        email: 'dot@example.com',
        password: 'password'
    },
}

app.get('/', (req, res) => {
    res.cookie("hello", "nurse")
    res.render('index');
});

app.get('/profile', (req, res) => {
    const userObject = users[req.cookies.userId]
    if(!userObject){
        res.redirect('/login')
    }
    console.log(req.cookies.userId)
    const templateVars = {userObject: userObject}

    res.render('profile', templateVars);
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login', (req, res) => {
    console.log(req.body);
    const email = req.body.email;
    const password = req.body.password;
    for(let userID in users){
        console.log(users[userID])
        if(users[userID].email === email){
            // console.log("found it")
            if(users[userID].password === password){
                // console.log("password matches");
                res.cookie("userId", userID)
                res.redirect('/profile');
            }else{
                console.log("hacking attempt!!!");
                
            };
        }else{
            console.log( "not here")
        }
    }
    res.redirect('/');
})

app.post('/logout', (req, res) => {
    res.clearCookie("userId");
    res.redirect("/login")
})


app.listen(PORT, () => console.log(`running up that hill on port ${PORT}`))