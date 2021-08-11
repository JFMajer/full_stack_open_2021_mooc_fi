require('dotenv').config()
const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

//database connection
const COSMOS_URI = process.env.NODE_ENV ==='test' 
  ? "mongodb://" + process.env.COSMOSDB_HOST + ":" + process.env.COSMOSDB_PORT + "/" + process.env.COSMOSDB_DBNAME_TEST + "?ssl=true&replicaSet=globaldb" 
  : "mongodb://" + process.env.COSMOSDB_HOST + ":" + process.env.COSMOSDB_PORT + "/" + process.env.COSMOSDB_DBNAME + "?ssl=true&replicaSet=globaldb"
mongoose.connect(COSMOS_URI, {
    retryWrites: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    auth: {
        user: process.env.COSMODDB_USER,
        password: process.env.COSMOSDB_PASSWORD
    }
})
    .then(() => console.log('Connection to CosmosDB successful, ENV is: ',process.env.NODE_ENV))
    .catch((err) => console.error(err));


const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  url: String,
  likes: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})
blogSchema.plugin(uniqueValidator)

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Blog = mongoose.model('Blog', blogSchema)

module.exports = mongoose.model('Blog', blogSchema)