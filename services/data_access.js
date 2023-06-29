const {MongoClient} = require('mongodb');

//database access methods

async function load_data(){
    const uri = process.env.uri;
    const client = new MongoClient(uri);
    let result= null;
    try {
      await client.connect();
  
      result = await findAll(client,{
        db: 'gothicnetRemake',
        collection: 'Users',
      })
  
    } catch (e){
      console.error(e);
    } finally {
      await client.close();
    }
    return result;
  }
  
  
  async function findAll(client,target){
    const result = await client.db(target.db).collection(target.collection).find({}).toArray();
    return result[0];
  }
  
  async function updateOneByName(client,target,newDoc){
    const result = await client.db(target.db).collection(target.collection).updateOne({name: target.name},{$set: newDoc});
    console.log(`${result.matchedCount} document(s) matched the query criteria`);
    console.log(`${result.modifiedCount} were updated`)
  }
  
  module.exports = {
    updateOneByName:updateOneByName,
    findAll: findAll,
    load_data: load_data
  }