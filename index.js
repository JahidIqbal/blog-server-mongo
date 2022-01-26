const express = require('express')
const cors = require('cors')
const { MongoClient } = require('mongodb');
require('dotenv').config();


const app = express();
const port = process.env.PORT || 5000;

app.use(cors())
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.sbyjk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });



console.log(uri);

async function run() {
    try {
        await client.connect();
        const database = client.db("blogServer");
        const servicesCollection = database.collection("services");
        console.log('database connected')

        // all api are here let's solve it
        // get services
        app.get('/services', async (req, res) => {
            const cursor = servicesCollection.find({});
            const services = await cursor.toArray();
            res.send(services);
        })
    }

    finally {
        //   await client.close();
    }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send('Travel agency');
})

app.get('/hello', (req, res) => {
    res.send('Hello updated here')
})

app.listen(port, () => {
    console.log('Travel Server running on port', port)
})