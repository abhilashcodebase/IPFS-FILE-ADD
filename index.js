const express = require('express');
//const JSON = require('json');
const Hash = require('ipfs-only-hash')
//const { CID } = require('ipfs-http-client')
const { create } = require('ipfs-http-client');
//const client = create();
const client = create('http://127.0.0.1:5001');
//const ipfsClient = require('ipfs-http-client');
//const ipfs = ipfsClient('http://localhost:5001',{protocol:'http'});
const app = express();

app.use(express.json());
app.get('/',(req,res)=>{
    return res.send('welcome');
})
app.post('/upload',async(req,res)=>{
    const data = req.body;
    console.log(data);
    const filehash = await addFile(data);
    return res.send(`https://gateway.ipfs.io/ipfs/${filehash}`);

})

const addFile = async({path,content})=>{
    const file = {path:path,content:Buffer.from(content)};
    const fileAdded = await client.add(file);
    const result = fileAdded.cid.string;
    console.log(result);
    return result;
    
}

app.listen(3000,()=>{
    console.log('server listening on port 3000')
})
