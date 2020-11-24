require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');


const app = express();
const port = 5000;

app.use(cors());

mongoose.connect(process.env.DB, {
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useFindAndModify: false, 
    useCreateIndex: true
})
    .then((res) => {
        console.log('DB Connected')
    }).catch(err => console.log(err));

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))


app.listen(port, () => console.log(`server listening on port: ${port}`));