import Product from "../../models/products.js"

export const getProductsByCategoryId = async (req,reply)=>{

        const {categoryId} = req.params;
        try {
            const products = await Product.find({category:categoryId})
            .select('-category')
            .exac();
           return reply.send(products);
        } catch (error) {
            return reply.statu(500).send({message:"An error Accoured",error})
        }
};