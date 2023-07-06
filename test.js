/**
 * Test file to illustrate CRUD Operations with Mongoose Models
 */
const mongoose = require('mongoose');
const BlogPost = require('./models/BlogPost');

mongoose.connect('mongodb://127.0.0.1/blogpost_db', {useNewUrlParser: true,useUnifiedTopology: true})
.then(()=>{console.log('Connected to MongoDB')})
.catch(e=>{console.log('Connection error', e)});

data = {
    title:'The Mythbuster Guide to Saving Money on Energy Bills',
    body:'If you have been here a long time, you might remember when I '+
    'went on ITV Tonight to dispense a masterclass in saving money on energy '+
    'bills. Energy-saving is one of my favourite money topics, because once '+
    'you get past the boring bullet-point lists, a whole new world of thrifty '+
    'nerdery opens up. You know those bullet-point lists. You start spotting '+
    'them everything at this time of year. They go like this: '
};

// Create
/*
BlogPost.create(data)
.then(result=>{
    console.log('created:\n',result)
})
.catch(e=>{
    console.log('create error:',e)
});

// Read
BlogPost.find({})
.then(result=>{
    console.log('find:\n',result)
})
.catch(e=>{
    console.log('find error:',e)
});

// Update
var id='649de7a70d9456127d6fda13';
BlogPost.findByIdAndUpdate(id, {
    title:"Updated Title"
}).then(result=>{
    console.log('Updated title to')
}).catch(e=>{
    console.log('Update error', e)
}); 

// Delete
var id='649de7a70d9456127d6fda13';
BlogPost.findByIdAndDelete(id)
.then(result=>{
    console.log("Deleted record with id",id)
})
.catch(e=>{
    console.log("Delete error", e)
})*/