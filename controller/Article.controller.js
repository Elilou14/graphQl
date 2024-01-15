const graphqlFields = require('graphql-fields');
const parseFields = require('graphql-parse-fields');
const getFieldNames = require('graphql-list-fields');
const { executeQuery } = require('../utility');
const { parcourirObjet } = require('../utility/utility');

module.exports.getArticles = async (info)=>{
    try {

        let {champsObjet}= parcourirObjet(parseFields(info))
        console.log("articles",champsObjet)
    console.log("fileds",parseFields(info))
    champsObjet = champsObjet.filter(field=>field!=='__typename')
    const query = `SELECT ${champsObjet.join(",")} FROM  Article`;
    const articles = await executeQuery(query);
    return articles
    } catch (error) {
        console.log(error)
    }
}

module.exports.getOneArticle=async(_,arg,contextValue,info)=>{
    const {champsObjet}= parcourirObjet(parseFields(info))
    const {id} = arg; 
    const query = `SELECT ${champsObjet.join(",")} FROM Article WHERE id = ?`;
    const article = await executeQuery(query,[id])
    console.log(article[0])
    return article[0]

}

module.exports.createArticle=async(parent,args,contextValue,info)=>{
    const {champsObjet}= parcourirObjet(parseFields(info))
    const {article} = args
    const { title, content, author,categoryId } = article
    const query=`INSERT INTO Article(title, content, author, categoryId) VALUES(?,?,?,?) RETURNING ${champsObjet.join(",")}`;
    const newArticle= await executeQuery(query,[title, content, author,categoryId ])
    return newArticle[0];
}

module.exports.removeArticle=async(parent,args,contextValue,info)=>{
    
    try {
        const {champsObjet}= parcourirObjet(parseFields(info))
        const {id} = args
        const query = `DELETE FROM Article WHERE id = ? RETURNING ${champsObjet.join(",")}`
        const deletedArticle = await executeQuery(query,[id]);
        return deletedArticle[0]
    } catch (error) {
        console.log(error)
    }

}
module.exports.putArticle=async(parent,args,contextValue,info)=>{
    try {
        const {champsObjet}= parcourirObjet(parseFields(info))
        const {article,id} = args
        const {title,content,author,categoryId} = article
         const query = `
            UPDATE Article
            SET title=?, content=?, author=?, categoryId=?
            WHERE id=?;
        `;
         await executeQuery(query,[title,content,author,categoryId,id]);
         const articleUpdated = await executeQuery(`SELECT ${champsObjet.join(",")} FROM Article WHERE id=?`,[id]);
        return articleUpdated[0]
    } catch (error) {
        console.log(error)
    }
}

module.exports.getArticleWithComment= async(parent,args,contextValues,infos)=>{
    const {champsObjet}= parcourirObjet(parseFields(infos))
    const parentId = parent && parent.id !== undefined ? parent.id : null;
    const query = `SELECT ${champsObjet.join(",")} FROM Comment WHERE  articleId=?`
    const comments = executeQuery(query,[parentId]);
    return comments
}