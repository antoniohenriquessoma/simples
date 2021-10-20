import express from 'express';
import devBundle from './devBundle';
import path from 'path';
import template from './../template';
//const { MongoClient } = require('mongodb');
import { MongoClient } from 'mongodb';




const app = express();
const CURRENT_WORKING_DIR = process.cwd()


devBundle.compile(app);
app.use('/dist', express.static(path.join(CURRENT_WORKING_DIR, 'dist')))


app.get('/', (req, res) => {
    res.status(200).send(template())
})


let port = process.env.PORT || 3000

app.listen(port, function onStart(err){
    if(err){
        console.log(err)
    }
    console.info('Servidor esta rodar na porta %$.', port)
})

const url = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const client = new MongoClient(url);

const dbName = 'simples';

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('documents');

  // the following code examples can be pasted here...

  return 'done.';
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());
/*
const url = process.env.MONGODB_URI || 'mongodb://localhost:27017/simples' MongoClient.connect(url, (err, db)
=>
{
    console.log('CONECTADO COM SUCESSO NO BANCO DE DADOS MONGODB')
    db.close()
})*/




