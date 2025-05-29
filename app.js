const express = require('express');
const dbConnect = require("./config/dbConnect");
const methodOverride = require("method-override")
const errorhandler = require("./middlewares/errorhandler");
const app =express();
app.set("view engine", "ejs")
app.set("views","./views")

app.use(express.static("./public"))
app.use(methodOverride("_method"))

const port = 3000;

dbConnect();

app.use(express.json());
app.use(express.urlencoded({ exended:true}))

const requestTime = (req, res, next) => {
    let today = new Date();
    let now = today.toLocaleString();
    req.requestTime = now;
    next();
}

app.use(requestTime);

app.get("/", (req, res) => {
    const responseText = `Hello Node! \n요청 시간 : ${req.requestTime}`;
    res.set("Content-type", "text/plain");
    res.send(responseText);
});

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use("/contacts", require("./routes/contactRoutes"))
app.use(errorhandler);


app.listen(port, () => {
    console.log(`${port}번 포트에서 서버 실행 중`);
})