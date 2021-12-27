const express = require('express');
const app = express();
const connectDB = require('./config/db')

// connect db
connectDB();

// Bring the middle ware for json body
app.use(express.json({exteded:false}));

app.get('/', (req,res) => res.json({'masg':'Hello World'}));

// define the routes of our application
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is runnig at ${PORT} `));
