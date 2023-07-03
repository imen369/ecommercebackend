var express=require('express');
var router=express.Router();
const SCategorie=require('../models/scategorie');
//liste des sous catégories
router.get('/',async(req,res)=>{
try{
    const scat=await SCategorie.find(); 
    res.status(200).json(scat);
}
catch(error)
{
    res.status(404).json({message:error.message});
}
});

//inserer sous catégorie
router.post('/',async(req,res)=>{
const newScategorie=new SCategorie(req.body);
try{
    await newScategorie.save();
    res.status(200).json(newScategorie);
}
catch(error)
{
    res.status(404).json({message:error.message});
}
});


// chercher une sous catégorie
router.get('/:scategorieId',async(req, res)=>{
    try {
    const scat = await  SCategorie.findById(req.params.scategorieId).populate('categorieID').exec();
    res.status(200).json(scat);
    } 
    catch (error) 
    {
    res.status(404).json({ message: error.message });
    }
    });

//update sous categorie
router.put('/:scategorieId', async (req, res)=> {
        try {
            const scat =await SCategorie.findByIdAndUpdate(req.params.scategorieId,{$set:req.body})
            res.status(200).json(scat);
            }
        catch (error) {
        res.status(404).json({ message: error.message });
        }
        });
//delete sous categorie
router.delete('/:scategorieId', async (req, res)=> {
    const id = req.params.scategorieId;
    await SCategorie.findByIdAndDelete(id);
    
    res.json({ message: "sous categorie deleted successfully." });
    
    });

module.exports = router;