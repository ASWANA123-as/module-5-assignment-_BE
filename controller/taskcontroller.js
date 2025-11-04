const task=require('../Model/taskModel')
//createTask
exports.createTask=async (req,res)=>{
    const{title,description,completed}=req.body
    if(!title||!description){
        return res.status(400).json({message:"All fields required"})

    }
    try{
        const newtask=new task({title,description,completed,owner:req.user.id})
        await newtask.save()
   return res.status(200).json({message:"success",task:newtask})
}
catch(err){
     console.error("Error creating task:", err);
    return res.status(500).json({message:"server error"})
}
}
//getalltask
exports.getAlltask=async(req,res)=>{
    try{
        const tasks=await task.find().populate('owner','email')
        return res.status(200).json({message:"success",data:tasks})
    }
    catch(err){
         return res.status(500).json({message:"server error"})
    }

}
//getUserspecefictask
exports.getUserTask = async (req, res) => {
  try {
    // req.user.id is set by your JWT auth middleware
    const tasks = await task.find({ owner: req.user.id })
      .populate("owner", "email") // optional if you want to show email
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: "success",
      tasks
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
//updatetask
exports.updatetask=async(req,res)=>{
    try{
        const{id}=req.params
        const{title,description,completed,owner}=req.body
        const updatedtask=await task.findByIdAndUpdate(id,{title,description,completed} ,{ new: true }
    ).populate('owner', 'title,description')
        if(!updatedtask){
            return res.status(400).json({message:"failed",error:"data not found"})

        }
        return res.status(200).json({message:"success",data:updatedtask})
    }
    catch(error){
       
        return res.status(500).json({message:"server error",error:error.message})
    }
}
//deletetask
exports.deletetask=async(req,res)=>{
    try{
        const{id}=req.params
        
        const updatedtask=await task.findByIdAndDelete(id)
        if(!updatedtask){
            return res.status(400).json({message:"failed",error:"data not found"})

        }
        return res.status(200).json({message:"success",data:updatedtask})
    }
    catch(error){
       
        return res.status(500).json({message:"server error",error:error.message})
    }
}