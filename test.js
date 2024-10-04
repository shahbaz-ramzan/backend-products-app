const mongoose=require("mongoose")

const connect=()=>{
    return mongoose.connect('mongodb://localhost:27017/whatever')
}

const Student=new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    faveFoods:[{type:String}],
    info:{
        school:{
            type:String
        },
        shoeSize:Number
    }
})

connect()
.then(async(connection) => {
    const student=await Student.create({firstName:"Tim"})
    console.log(student);
    
}).catch((err) => {
    console.error(err)
});