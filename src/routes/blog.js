const express = require('express');
const BlogController = require('../app/controllers/BlogController');
const router = express.Router();
const { verifyCache } = require('../app/middleware/BlogsCacheMiddleware');
const { requireAdmin } = require('../app/middleware/RequireAdminMiddleware');


router.get('/postBlog',requireAdmin, BlogController.postBlog_get);
router.post('/postBlog/uploadSingle', /* upload.single('image-blog'), */ BlogController.postBlog_post);
router.get('/editBlog',requireAdmin ,BlogController.editBlog_get);
router.post('/editBlog', BlogController.editBlog_post);
router.get('/editBlog/:code',requireAdmin ,BlogController.editDetailBlog_get);
router.post('/editBlog/:code', BlogController.editDetailBlog_post);
router.get('/:page', /* verifyCache, */ BlogController.blog_get);
router.post('/:page', /* verifyCache, */ BlogController.blogCategory_post);
router.post('/search/:page', /* verifyCache, */ BlogController.blogSearch_post);
router.get('/detail/:code', BlogController.detailBlog_get);

module.exports = router;