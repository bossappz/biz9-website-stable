var express = require('express');
var router = express.Router();
router.get('/ping',function(req, res, next) {
    res.send({'biz9-web':'ping'});
    res.end();
});
//9_service_all
router.get('/',function(req, res) {
    res.redirect('/service/all/1');
});
//9_service_all
router.get('/all',function(req, res) {
    res.redirect('/service/all/1');
});
//9_service_all
router.get('/all/:page_current',function(req, res) {
    var helper = biz9.get_helper(req);
    helper.render='service_list';
    helper.page_title = APP_TITLE +': ServiceZ';
    helper.item = biz9.get_new_item(DT_BLANK,0);
    helper.render_menu='li_product';
    async.series([
        function(call){
            biz9.get_client_db(function(error,_client_db){
                client_db=_client_db;
                db = client_db.db(helper.app_title_id);
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
            title_url='service';
            biz9.get_page(db,title_url,{},function(error,page){
                helper.service=page;
                call();
            });
        },
        function(call){
            sql={visible:'true'};
            sort={title:1};
            page_current=1;
            page_size=16;
            biz9.get_servicez(db,sql,sort,page_current,page_size,function(error,result_list,total_count,page_count) {
                helper.service_list=result_list;
                helper.total_count=total_count;
                helper.page_count=page_count;
                call();
            });
        },
        function(call){
            biz9.close_client_db(client_db,function(error){
                call();
            });
        },
    ],
        function(err, results){
            res.render(helper.render,{helper:helper});
            res.end();
        });
});
//9_service_detail //9_detail
router.get('/:title_url',function(req, res) {
    var helper = biz9.get_helper(req);
    helper.render='service_detail';
    helper.page_title = APP_TITLE +': ServiceZ ';
    helper.service = biz9.get_new_item(DT_BLANK,0);
    helper.render_menu='li_product';
    async.series([
        function(call){
            biz9.get_client_db(function(error,_client_db){
                client_db=_client_db;
                db = client_db.db(helper.app_title_id);
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
            title_url='service';
            biz9.get_page(db,title_url,{},function(error,page){
                helper.service_page=page;
                call();
            });
        },
        function(call){
            biz9.get_service(db,helper.title_url,function(error,data){
                helper.service=data;
                helper.page_title = APP_TITLE +': Service '+ helper.service.title;
                call();
            });
        },
        function(call){
            if(helper.service.title_url){
                biz9.update_item_view_count(db,DT_SERVICE,helper.service.tbl_id,helper.customer_id,function(error,data) {
                    call();
                });
            }else{
                call();
            }
        },
        function(call){
            biz9.close_client_db(client_db,function(error){
                call();
            });
        },
    ],
        function(err, results){
            res.render(helper.render,{helper:helper});
            res.end();
        });
});
module.exports = router;
