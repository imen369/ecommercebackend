const express = require('express');
const router = express.Router();
const Article=require("../models/article")
const {verifyToken} =require("../middleware/verifytoken")
const {authorizeRoles} = require("../middleware/authorizeRoles")
// afficher la liste des articles.
{/*router.get('/', async (req, res, )=> {
try {
const articles = await Article.find().populate('scategorieID').exec();
res.status(200).json(articles);
} catch (error) {
res.status(404).json({ message: error.message });
}
});*/}
// créer un nouvel article
router.post('/', async (req, res) => {
    
const nouvarticle = new Article(req.body)
try {
await nouvarticle.save();
res.status(200).json(nouvarticle );
} catch (error) {
res.status(404).json({ message: error.message });
}

});

// afficher la liste des articles.
router.get('/',verifyToken,authorizeRoles("user","admin"),async (req, res )=> {
try {
const articles = await Article.find();
res.status(200).json(articles);
} catch (error) {
res.status(404).json({ message: error.message });
}
});
// chercher un article
router.get('/:articleId',async(req, res)=>{
try {
const art = await Article.findById(req.params.articleId).populate('scategorieID').exec();
res.status(200).json(art);
} 
catch (error) {
res.status(404).json({ message: error.message });
}
});
// modifier un article

router.put('/:articleId', async (req, res)=> {
    try {
     const art = await Article.findByIdAndUpdate(
         req.params.articleId,
         { $set: req.body },
       { new: true }
     );
     const articles = await Article.findById(art._id).populate("scategorieID").exec();
     
     res.status(200).json(articles);
     } catch (error) {
     res.status(404).json({ message: error.message });
     }
 });
// Supprimer un article
router.delete('/:articleId', async (req, res)=> {
const id = req.params.articleId;
await Article.findByIdAndDelete(id);
res.json({ message: "article deleted successfully." });
});
module.exports = router;