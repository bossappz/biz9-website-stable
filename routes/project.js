var express = require('express');
var router = express.Router();
router.get('/ping',function(req, res) {
    res.send({'biz9-web':'ping'});
    res.end();
});
//9_projectz_all
router.get('/',function(req, res) {
    res.redirect('/project/all/1');
});
//9_projectz_all
router.get('/all',function(req, res) {
    res.redirect('/project/all/1');
});
//9_projectz_category_all
router.get('/category/:category',function(req, res) {
    res.redirect('/blog/category/'+helper.category+'/1');
});
router.get('/all/:page_current',function(req, res) {
    var helper = biz9.get_helper(req);
    helper.render='project_list';
    helper.page_title = APP_TITLE +': Projectz';
    helper.item = biz9.get_new_item(DT_BLANK,0);
    helper.render_menu='li_app';
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
            title_url='project';
            biz9.get_page(db,title_url,{},function(error,page){
                helper.project=page;
                call();
            });
        },
        function(call){
            sql = {};
            sort={};
            page_current=1
            page_size=20;
            biz9.get_categoryz(db,DT_PROJECT,sort,page_current,page_size,function(error,data_list,total_item_count,page_page_count){
                helper.category_list=data_list;
                call();
            });
        },
        function(call){
            sql = {visible:'true'};
            sort={date_create:1};
            page_current=helper.page_current;
            page_size=20;
            biz9.get_projectz(db,sql,sort,page_current,page_size,function(error,data_list,total_count,page_page_count) {
                helper.project_list=data_list;
                helper.total_count=total_count;
                helper.page_page_count=page_page_count;
                call();
            });
        },
        function(call){
            biz9.close_connect_db(function(error){
                call();
            });
        }
    ],
        function(err, result){
            res.render(helper.render,{helper:helper});
            res.end();
        });
});
router.get('/category/:category_title/:page_current',function(req, res) {
    var helper = biz9.get_helper(req);
    helper.render='project_list';
    helper.page_title = APP_TITLE +': Blog Posts';
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
            title_url='project';
            sub_title_url='category_list';
            biz9.get_sub_page(db,title_url,sub_title_url,{},function(error,page){
                helper.category_list=page.items;
                call();
            });
        },
        function(call){
            title_url='project';
            biz9.get_page(db,title_url,{},function(error,page){
                helper.project=page;
                call();
            });
        },
        function(call){
            sql = {visible:'true',category:helper.category_title};
            sort={date_create:1};
            page_current=helper.page_current;
            page_size=12;
            biz9.get_projectz(db,sql,sort,page_current,page_size,function(error,data_list,total_count,page_page_count) {
                helper.project_list=data_list;
                helper.total_item_count=total_count;
                helper.page_page_count=page_page_count;
                call();
            });
        },
        function(call){
            biz9.close_connect_db(function(error){
                call();
            });
        }
    ],
        function(err, result){
            res.render(helper.render,{helper:helper});
            res.end();
        });
});
//9_project_detail//9_detail
router.get('/:title_url',function(req, res) {
    var helper = biz9.get_helper(req);
    helper.render='project_detail';
    helper.page_title = APP_TITLE +': Project ';
    helper.item = biz9.get_new_item(DT_BLANK,0);
    helper.render_menu='li_app';
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
            title_url='project';
            biz9.get_page(db,title_url,{},function(error,page){
                helper.project=page;
                call();
            });
        },
        function(call){
            biz9.get_project(db,helper.title_url,function(error,data) {
                helper.item=data;
                call();
            });
        },
        function(call){
            sql = {visible:'true'};
            sort={date_create:1};
            page_current=1;
            page_size=50;
            biz9.get_projectz(db,sql,sort,page_current,page_size,function(error,data_list,total_count,page_page_count) {
                helper.project_list=data_list;
                call();
            });
        },
        function(call){
            biz9.close_connect_db(function(error){
                call();
            });
        }
    ],
        function(err, result){
            res.render(helper.render,{helper:helper});
            res.end();
        });
});
//9_project_detail//9_detail
router.get('/:title_url',function(req, res) {
    var helper = biz9.get_helper(req);
    helper.render='project_detail';
    helper.page_title = APP_TITLE +': Project ';
    helper.item = biz9.get_new_item(DT_BLANK,0);
    helper.render_menu='li_app';
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
            title_url='project';
            biz9.get_page(db,title_url,{},function(error,page){
                helper.project=page;
                call();
            });
        },
        function(call){
            title_url='project';
            sub_title_url='category_list';
            biz9.get_sub_page(db,title_url,sub_title_url,{},function(page){
                helper.category_list=page.items;
                call();
            });
        },
        function(call){
            biz9.get_project(db,helper.title_url,function(error,data) {
                helper.item=data;
                helper.page_title = APP_TITLE +': Blog Post '+ helper.item.title;
                call();
            });
        },
        function(call){
            sql={visible:'true'};
            sort={date_create:1};
            page_current=helper.page_current;
            page_size=12;
            biz9.get_projectz(db,sql,sort,page_current,page_size,function(error,data_list,total_count,page_page_count) {
                helper.project_list=data_list;
                helper.total_item_count=total_count;
                helper.page_page_count=page_page_count;
                call();
            });
        },
        function(call){
            biz9.close_connect_db(function(error){
                call();
            });
        }
    ],
        function(err, result){
            res.render(helper.render,{helper:helper});
            res.end();
        });
});
module.exports = router;
