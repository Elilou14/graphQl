const getFieldNames = require('graphql-list-fields');
const parseFields = require('graphql-parse-fields');
const { executeQuery } = require('../utility');
const { parcourirObjet } = require('../utility/utility');

module.exports.getCategories= async (info)=>{
    // console.log("fileds",parseFields(info))
    try {
        //récupérer les champs de retour spécifiés par le client
        let {champsObjet}= parcourirObjet(parseFields(info))
        console.log("catégorie",champsObjet)
        champsObjet = champsObjet.filter(field=>field!=='__typename')
        const query = `SELECT ${champsObjet.join(",")} FROM  Category`;
        const categories = await executeQuery(query);
        return categories
    } catch (error) {
        console.log(error)
    }
}


module.exports.getOneCategory=async(_,args,contextValue,info)=>{
    const {champsObjet}= parcourirObjet(parseFields(info))
    const {id} = args;
    console.log("id",id,champsObjet) 
    const query = `SELECT ${champsObjet.join(",")} FROM Category WHERE id = ?`;
    const category = await executeQuery(query,[id])
    console.log(category[0])
    return category[0]
}
module.exports.getCategoryWithArticles=async(parent,args,contextValues,infos)=>{
    const {champsObjet}= parcourirObjet(parseFields(infos))
    console.log("getCategoryWithArticles",champsObjet)
    const query = `SELECT ${champsObjet.join(",")} FROM Article WHERE categoryId=?`
    const articles = await executeQuery(query,[parent.id])
    console.log("rentre ici")
    return articles
}
module.exports.createCategory=async(parent,args,contextValue,info)=>{
    const fields = getFieldNames(info) || ['id'];
    const {category} = args
    const { name } = category
    const query=`INSERT INTO Category(name) VALUES(?) RETURNING ${fields.join(",")}`;
    const newCategory= await executeQuery(query,[name])
    return newCategory[0];
}