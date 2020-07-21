let commentService = require("../service/commentService");
let postService = require("../service/postService");

/**
 * Get method for health check of API
 */
let healthCheck = (req, res, next) => {
    res.status(200).send({ messsage: 'Api Running Successfully' });
}

/**
 * Get method to Return a list of top posts ordered by the number of comments
 */
let getTopPostList = async (req, res, next) => {
    try{
        let [posts, comments] = await Promise.all([postService.getPostList(), commentService.getCommentList()]);
        let topPosts = getTopPosts(posts, comments);
        let filtedTopPost = filterByComments(topPosts);
        res.status(200).send(filtedTopPost);
    } catch (error){
        res.status(500).send({ messsage: error});
    }  
}

let filterByComments = (topPosts) => {
    return topPosts.sort((a, b) => b.total_number_of_comments - a.total_number_of_comments);
}

let getTopPosts = (posts, comments) => {
    let allPostsWithCommentsCount = [];
    posts.forEach(post => {
        let postWithComments = comments.filter((comment) => comment.postId == post.id);

        let postInfo = {};
        postInfo.post_id = post.id;
        postInfo.post_title = post.title;
        postInfo.post_body = post.body;
        postInfo.total_number_of_comments = postWithComments.length;

        allPostsWithCommentsCount.push(postInfo);
    });
    return allPostsWithCommentsCount;
}

/**
 * Method to Return filtered comments
 */
let searchComment = async (req, res, next) => {
    try{
        let searchCriteria = req.body;
        let comments = await commentService.getCommentList();
        let filteredComment = filterComment(searchCriteria,comments);
        res.status(200).send(filteredComment);
    } catch (error){
        res.status(500).send({ error});
    }  
}

let filterComment = (criteria, comments) => {
    return comments.filter((comment) => {
        if(criteria.name && criteria.name!="" && comment.name.indexOf(criteria.name) > -1){
            return comment;
        }
        if(criteria.email && criteria.email!="" && comment.email.indexOf(criteria.email) > -1){
            return comment;
        }
        if(criteria.body && criteria.body!="" && comment.body.indexOf(criteria.body) > -1){
            return comment;
        }
    });
}

module.exports = {
    healthCheck: healthCheck,
    getTopPostList:getTopPostList,
    searchComment:searchComment
}