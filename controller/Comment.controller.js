const parseFields = require('graphql-parse-fields');
const { executeQuery } = require('../utility');
const { parcourirObjet } = require('../utility/utility');
module.exports.getComments=async(_,args,contextValue,info)=>{
    try {
        let {champsObjet}= parcourirObjet(parseFields(info))
        console.log("comment",champsObjet)
        champsObjet = champsObjet.filter(field=>field!=='__typename')
        const query = `SELECT ${champsObjet.join(",")} FROM  Comment`;
        const comments = await executeQuery(query);
        return comments
    } catch (error) {
        console.log(error)
    }
}