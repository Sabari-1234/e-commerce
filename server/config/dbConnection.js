const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log('success')
}).catch((err)=>{
    console.log('error',err)
})