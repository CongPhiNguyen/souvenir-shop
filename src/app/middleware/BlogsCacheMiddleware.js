const NodeCache = require("node-cache");
const mongoose = require ('mongoose');

const blogListcache = new NodeCache({ stdTTL: 120 });

const verifyCache = (req, res, next) => {
    try {
        console.log("bloglist cache have");
        //console.log(blogListcache);
        if (blogListcache.has("blogList")) {
            console.log("cache have");
            //return res.status(200).json(blogListcache.get("blogList"));
            return  res.render('blog', { blogs: blogListcache.get("blogList") ,  active: {Blog: true}});
        }
      return next();
    } catch (err) {
      throw new Error(err);
    }
  };
  
module.exports = { verifyCache, blogListcache};