import { Customer, DeliveryPartner } from "../../models/index.js";


export const updateUser = async (req,reply)=>{
   try {
    
    const {userId}=req.user;
    const updateDate = req.body;

    let user = await Customer.findById(userId) || await DeliveryPartner.findById(userId);

    if (!user) {
        
        return reply.status(400).send({message:'User Not Found'});
    }

    let UserModal;

    if (user.role === 'Customer') {
        UserModal = Customer;
    }else if (user.role === "DeliveryPartner") {
        UserModal = DeliveryPartner;
    }else {
        return reply.status(400).send({message:"Invalid User Role"})
    }

    const updatedUser = await UserModal.findByIdAndDelete(
        userId,
        {$set: updateDate},
        {new:true, runValidators: true}
    )

    if (!updatedUser) {
        return reply.status(404).send({message:"User Not Found"})
    }

    return reply.send({
        message:"User Update successfully",
        user:updatedUser,
    })


   } catch (error) {

    return reply.send(500).send({message:'Failed To Update User',error});
    
   } 
}