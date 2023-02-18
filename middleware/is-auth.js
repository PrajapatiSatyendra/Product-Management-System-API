const jwt = require('jsonwebtoken');

/**
 * @openapi
 * components:
 *    schemas:
 *       Error401:
 *          type: object
 *          properties:
 *             message:
 *                type: string
 *             data:
 *                type: object
 *
 *
 */
module.exports=(req,res,next)=>{
    const authHeader=req.get('Authorization');
    if (!authHeader) {
        const error=new Error ('Not authenticated');
        error.statusCode=401;
        throw error;
    }
    const token=authHeader.split(' ')[1];
    let decodedToken;
    try{
        decodedToken=jwt.verify(token,'Sun');
    }
    catch(err){
      err.statusCode=500;
     
      throw err;
    }
    if (!decodedToken) {
        const error=new Error('Not authorized');
        error.statusCode=403;
        throw error;
    }
    req.userId=decodedToken.userId;
    next();
};