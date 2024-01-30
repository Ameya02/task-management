const express = require('express');

const app = express();
const port = 3001;
const morgan = require('morgan');
const connectDB = require('./config/db');

app.use(express.json({extended: true}));
app.use(morgan("dev"))
app.use("/api/tasks", require("./routes/taskRoutes"));
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

connectDB();

module.exports = app;