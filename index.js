const express=require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors=require('cors')
require('dotenv').config()
const app=express();

const port=process.env.PORT || 5000;

//midleware
app.use(cors());
app.use(express.json());

// carDoctor
// NfXyK0suA1ZyGdCQ

// console.log(process.env.DB_USER)
// console.log(process.env.BD_PASS)

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.BD_PASS}@cluster0.7auoehb.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri)
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const serViceCollection=client.db('CarsDoctors').collection('services')

    const bookingCollection=client.db('CarsDoctors').collection('bookings')
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

    app.get('/services',async(req,res)=>{
        const cursor=serViceCollection.find()
        const result=await cursor.toArray()
        res.send(result)
    })

    app.get('/services/:id',async(req,res)=>{
        const id=req.params.id;
        const query={_id:new ObjectId(id)}
        const options = {
            // Sort matched documents in descending order by rating
           
            // Include only the `title` and `imdb` fields in the returned document
            projection: {title: 1, price: 1,service_id:1,img:1 },
          };
        const result=await serViceCollection.findOne(query,options)
        res.send(result)
    })

    //booking related

    app.get('/bookings',async(req,res)=>{
        console.log(req.query.email)
        let query={};
        if(req.query?.email){
            query={email:req.query.email}

        }

        const result=await bookingCollection.find(query).toArray()
        res.send(result)
    })

    app.post('/bookings',async(req,res)=>{
        const booking=req.body;
       console.log(booking)
       const result=await bookingCollection.insertOne(booking)
       res.send(result)
    })

    app.patch('/bookings/:id',async(req,res)=>{
     const id=req.params.id;
     const filter={_id: new ObjectId(id)}
     const upDateBooking=req.body
     console.log(upDateBooking)
     const updateDoc={
      $set:{
        status:upDateBooking.status
      },
     }
     const result=await bookingCollection.updateOne(filter,updateDoc)
     res.send(result)
    })

    app.delete('/bookings/:id',async(req,res)=>{
      const id=req.params.id;
      const query={_id: new ObjectId(id)}
      const result=await bookingCollection.deleteOne(query)
      res.send(result)
    })
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir); 


app.get('/', (req, res) => {
    res.send('Doctor is Running')
  })
  
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })