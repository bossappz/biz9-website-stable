var express = require('express');
var router = express.Router();
router.get('/ping',function(req, res, next) {
    res.send({'biz9-web':'ping'});
    res.end();
});
//9_shop_all
router.get('/',function(req, res) {
    res.redirect('/event/all/1');
});
//9_shop_all
router.get('/all',function(req, res) {
    res.redirect('/event/all/1');
});
//9_shop 9_event_list
router.get('/all/:page_current',function(req, res) {
    var helper = biz9.get_helper(req);
    helper.render='event_list';
    helper.page_title = APP_TITLE +': EventZ';
    helper.item = biz9.get_new_item(DT_BLANK,0);
    helper.render_list='/event/all';
    helper.render_menu='li_product';
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
            title_url='event';
            biz9.get_page(db,title_url,{},function(error,page){
                helper.event_page=page;
                call();
            });
        },
        function(call){
            sort={title:1};
            biz9.get_categoryz(db,DT_PRODUCT,sort,1,12,function(error,data_list,total_count,page_count) {
                helper.category_product_list=data_list;
                call();
            });
        },
        function(call){
            sort={title:1};
            biz9.get_categoryz(db,DT_EVENT,sort,1,12,function(error,data_list,total_count,page_count) {
                helper.category_event_list=data_list;
                call();
            });
        },

        function(call){
            sql={visible:'true'};
            sort={date_create:1};
            page_current=0;
            page_size=9;
            biz9.get_eventz(db,sql,sort,page_current,page_size,function(error,data_list,total_count,page_count) {
                helper.event_list=data_list;
                helper.total_count=total_count;
                helper.page_count=page_count;
                call();
            });
        },
    ],
        function(err, result){
            res.render(helper.render,{helper:helper});
            res.end();
        });
});
//9_event_category_list//9_category
router.get('/category/:category/:page_current',function(req, res) {
    var helper = biz9.get_helper(req);
    helper.render='event_list';
    helper.page_title = APP_TITLE +': Event: '+helper.category;
    helper.item = biz9.get_new_item(DT_BLANK,0);
    helper.render_list='/category/category';
    helper.render_menu='li_product';
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
            title_url='event';
            biz9.get_page(db,title_url,{},function(error,page){
                helper.event_page=page;
                call();
            });
        },
        function(call){
            sort={title:1};
            biz9.get_categoryz(db,DT_PRODUCT,sort,1,12,function(error,data_list,total_count,page_count) {
                helper.category_product_list=data_list;
                call();
            });
        },
        function(call){
            sort={title:1};
            biz9.get_categoryz(db,DT_EVENT,sort,1,12,function(error,data_list,total_count,page_count) {
                helper.category_event_list=data_list;
                call();
            });
        },
        function(call){
            sql = {category:helper.category};
            sort={date_create:1};
            page_current=helper.page_current;
            page_size=12;
            biz9.get_eventz(db,sql,sort,page_current,page_size,function(error,data_list,total_count,page_count) {
                helper.event_list=data_list;
                helper.total_count=total_count;
                helper.page_count=page_count;
                call();
            });
        },


    ],
        function(err, result){
            res.render(helper.render,{helper:helper});
            res.end();
        });
});
//9_event_detail 9_detail
router.get('/:title_url',function(req, res) {
    /*--default_start */
    var helper = biz9.get_helper_user(req);
    helper.page_title = APP_TITLE +': Shop ';
    helper.render='event_detail';
    helper.info = biz9.get_new_item(DT_BLANK,0);
    helper.primary = biz9.get_new_item(DT_BLANK,0);
    helper.render_menu='li_product';
    /*--default_end */
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
            title_url='event';
            biz9.get_page(db,title_url,{},function(error,page){
                helper.event_page=page;
                call();
            });
        },
        function(call){
            biz9.get_event(db,helper.title_url,function(error,data){
                console.log(data);
                helper.event=data;
                helper.page_title = APP_TITLE +': Shop ' +helper.event.title;
                call();
            });
        },
        function(call){
            if(helper.event.title_url){
                biz9.update_item_view_count(db,DT_EVENT,helper.event.tbl_id,helper.user.customer_id,function(error,data) {
                    call();
                });
            }else{
                call();
            }
        },
    ],
        function(err, result){
            res.render(helper.render,{helper:helper});
            res.end();
        });
});
module.exports = router;
