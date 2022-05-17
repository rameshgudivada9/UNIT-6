const express=require("express");
const mongoose=require("mongoose");

const app=express();

app.use(express.json());


const connectDB=()=>{

    return  mongoose.connect("mongodb://127.0.0.1:27017/parkingSlot")
}


const userSchema = new mongoose.Schema(
    {
      floor: { type: Number, required: true },
      vehicle: { type: String, required: false },
      vehicleNo: { type: String, required: true, unique: true },
      wheels: { type: Number, required: true },
    },
    {
      versionKey: false,
      timestamps: true, 
    }
  );
  
  // Step 2 : creating the model
  const User = mongoose.model("parkingDetail", userSchema);



  const parkingSpotSchema= new mongoose.Schema({
    spot:{type:String,required:true},
    block:{type:String,required:true},
    userId:{type:mongoose.Schema.Types.ObjectId,ref:"parkingDetail",require:true},
   
   },{
       timestamps:true,
   });
   
   
   const spot= mongoose.model("spot",parkingSpotSchema);



   const assisantSchema= new mongoose.Schema({
    assistant:{type:String,required:true},
    spotId:{type:mongoose.Schema.Types.ObjectId,ref:"spot",required:true},
    userId:{type:mongoose.Schema.Types.ObjectId,ref:"parkingDetail",require:true},

   },{
       timestamps:true,
   });
   
   
   const parkingAssistant= mongoose.model("assisantdetail",assisantSchema);




  app.get(("/users"),async(req,res)=>{
    try {

        const userdata=await User.find({}).lean().exec();
        return res.status(200).send(userdata);
        
    } catch (error) {

        return res.status(500).send("something went wrong");
    
    }

});




app.post("/users",async(req,res)=>{
    try {

        const user=await User.create(req.body)

        console.log(req.body)
        return res.status(201).send(user);
        
    } catch (error) {

        return res.status(500).send(error.message);
    
    }

});

app.get(("/users/:ID"),async(req,res)=>{
    try {

        const user=await User.findById(req.params.ID).lean().exec()
        return res.status(200).send(user);
        
    } catch (error) {

        return res.status(500).send(error.message);
    
    }

});

app.delete(("/users/:ID"),async(req,res)=>{
    try {

        const user=await User.findByIdAndDelete(req.params.ID).lean().exec();
        return res.status(200).send(user);
        
    } catch (error) {

        return res.status(500).send(error.message);
    
    }

});

// parking sport crud

app.get(("/spots"),async(req,res)=>{
    try {

        const spotdata=await spot.find().populate({path:"userId",select:{floor: 1,vehicle: 1,_id: 0}}).lean().exec();

        return res.status(200).send(spotdata);
        
    } catch (error) {

        return res.status(500).send(error.message);
    
    }

});


app.post(("/spots"),async(req,res)=>{
    try {
        
        const userspot=await spot.create(req.body)
        return res.status(201).send(userspot);
        
    } catch (error) {
        
        return res.status(500).send(error.message);
        
    }
    
});

// crud parking assisant

app.get(("/assistant"),async(req,res)=>{

    try {
        
        const assisants=await parkingAssistant.find({}).populate({path:"spotId",populate:{path:"userId"},})
        .populate({path:"userId"}).lean().exec();

        // const comments=await comment.find({})
        // .lean().exec();
    
        return res.status(200).send(assisants)
    } catch (error) {
        return res.send(error.message)
    }
});


app.post(("/assistant"),async(req,res)=>{

    try {
        
        const assis=await parkingAssistant.create(req.body);
    
        return res.status(200).send(assis)
    } catch (error) {
        return res.send(error.message)
    }
});




app.listen(6010,async()=>{
    try {
    
    await connectDB()
    
    } catch (error) {
        console.log(error)
    }
    console.log("6210")
    
    })