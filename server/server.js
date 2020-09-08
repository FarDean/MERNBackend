import config from './../config/config'
import app from './express'
import mongoose from 'mongoose'

mongoose.connect(config.mongoUri, {useNewUrlParser: true,useCreateIndex:true, useUnifiedTopology:true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connected to mongoose...')
});


app.listen(config.port,err=>{
    if(err){
        console.error(err)
    }
    console.info(`Server started on port ${config.port}`)
})