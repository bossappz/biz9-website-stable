var express = require('express');
var router = express.Router();
router.get('/ping',function(req, res) {
    res.send({'biz9-web':'ping'});
    res.end();
});
//9_blog_all
router.get('/',function(req, res) {
    res.redirect('/blog/all/1');
});
//9_blog_all
router.get('/all',function(req, res) {
    res.redirect('/blog/all/1');
});
//9_blog_category_all
router.get('/category/:category',function(req, res) {
    res.redirect('/blog/category/'+helper.category+'/1');
});
router.get('/all/:page_current',function(req, res) {
    var helper = biz9.get_helper(req);
    helper.render='blog_post_list';
    helper.page_title = APP_TITLE +': Blog Posts';
    helper.item = biz9.get_new_item(DT_BLANK,0);
    helper.render_menu='li_about';
    helper.render_list='/blog/all';
    async.series([
        function(call){
            biz9.get_connect_db(helper.app_title_id,function(error,_db){
                db=_db;
                call();
            });
        },
        function(call){
            title_url='blog_post';
            biz9.get_page(db,title_url,{},function(error,page){
                helper.blog_post=page;
                call();
            });
        },
        function(call){
            sql = {visible:'true'};
            sort={date_create:-1};
            page_current=helper.page_current;
            page_size=6;
            biz9.get_blog_postz(db,sql,sort,page_current,page_size,function(error,data_list,total_count,page_page_count) {
                helper.blog_post_list=data_list;
                helper.total_item_count=total_count;
                helper.page_page_count=page_page_count;
                helper.page_size=page_size;
                call();
            });
        },
        function(call){
            title_url='primary';
            biz9.get_page(db,title_url,{},function(error,page){
                helper.primary=page;
                call();
            });
        },
    ],
        function(err, results){
            res.render(helper.render,{helper:helper});
            res.end();
        });
});
router.get('/category/:category_title/:page_current',function(req, res) {
    var helper = biz9.get_helper(req);
    helper.render='blog_post_list';
    helper.page_title = APP_TITLE +': Blog Posts';
    helper.render_menu='li_about';
    helper.item = biz9.get_new_item(DT_BLANK,0);
    async.series([
        function(call){
            biz9.get_connect_db(helper.app_title_id,function(error,_db){
                db=_db;
                call();
            });
        },
        function(call){
            title_url='primary';
            biz9.get_page(db,title_url,{},function(error,page){
                helper.primary=page;
                call();
            });
        },
        function(call){
            title_url='blog_post';
            sub_title_url='category_list';
            biz9.get_sub_page(db,title_url,sub_title_url,{},function(error,page){
                helper.category_list=page.items;
                call();
            });
        },
        function(call){
            title_url='blog_post';
            biz9.get_page(db,title_url,{},function(error,page){
                helper.blog_post=page;
                call();
            });
        },
        function(call){
            sql = {visible:'true',category:helper.category_title};
            sort={date_create:1};
            page_current=helper.page_current;
            page_size=12;
            biz9.get_blog_postz(db,sql,sort,page_current,page_size,function(error,data_list,total_count,page_page_count) {
                helper.blog_post_list=data_list;
                helper.total_item_count=total_count;
                helper.page_page_count=page_page_count;
                call();
            });
        },
    ],
        function(err, results){
            res.render(helper.render,{helper:helper});
            res.end();
        });
});
//9_blog_post_detail//9_detail
router.get('/:title_url',function(req, res) {
    var helper = biz9.get_helper(req);
    helper.render='blog_post_detail';
    helper.item = biz9.get_new_item(DT_BLANK,0);
    helper.render_menu='li_about';
    async.series([
        function(call){
            biz9.get_connect_db(helper.app_title_id,function(error,_db){
                db=_db;
                call();
            });
        },
        function(call){
            title_url='blog_post';
            biz9.get_page(db,title_url,{},function(error,page){
                helper.blog_post=page;
                call();
            });
        },
        function(call){
            title_url='primary';
            biz9.get_page(db,title_url,{},function(error,page){
                helper.primary=page;
                call();
            });
        },
        function(call){
            biz9.get_blog_post(db,helper.title_url,function(error,data){
                helper.item=data;
                helper.page_title = APP_TITLE +': Blog Post '+ helper.item.title;
                call();
            });
        },
        function(call){
            sql = {visible:'true'};
            sort={date_create:1};
            page_current=helper.page_current;
            page_size=5;
            biz9.get_blog_postz(db,sql,sort,page_current,page_size,function(error,data_list,total_count,page_page_count) {
                helper.related_list=data_list;
                call();
            });
        },
    ],
        function(err, results){
            res.render(helper.render,{helper:helper});
            res.end();
        });
});
router.get('/list/:page_current',function(req, res) {
    var helper = biz9.get_helper(req);
    async.series([
        function(call){
            biz9.get_connect_db(helper.app_title_id,function(error,_db){
                db=_db;
                call();
            });
        },
        function(call){
            sql = {};
            sort={date_create:-1};
            page_current=helper.page_current;
            page_size=9;
            biz9.get_blog_postz(db,sql,sort,page_current,page_size,function(error,data_list,total_count,page_page_count) {
                helper.blog_post_list=data_list;
                call();
            });
        },
    ],
        function(err, results){
            res.send({helper:helper});
            res.end();
        });
});
module.exports = router;
