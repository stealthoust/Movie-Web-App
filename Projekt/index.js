const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const cors = require('cors')


const filmyRouter = require('./routes/filmy');

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors())

app.get("/", (req, res) => {
    res.json({message: "ok"});
});

app.use("/filmy", filmyRouter);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})