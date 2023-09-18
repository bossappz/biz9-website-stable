var express = require('express');
var router = express.Router();
router.get('/ping',function(req, res, next) {
    res.send({'biz9-web':'ping'});
    res.end();
});
//9_shop_all
router.get('/',function(req, res) {
    res.redirect('/shop/all/1');
});
//9_shop_all
router.get('/all',function(req, res) {
    res.redirect('/shop/all/1');
});

//9_shop 9_product_list
router.get('/all/:page_current',function(req, res) {
    var helper = biz9.get_helper_user(req);
    helper.render='product_list';
    helper.page_title = APP_TITLE +': Shop';
    helper.item = biz9.get_new_item(DT_BLANK,0);
    helper.render_list='/shop/all';
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
            title_url='shop';
            biz9.get_page(db,title_url,{},function(error,page){
                helper.shop=page;
                call();
            });
        },
        function(call){
            sql={};
            sort={date_create:1};
            page_current=0;
            page_size=9;
            biz9.get_productz(db,sql,sort,page_current,page_size,function(error,data_list,total_count,page_count) {
                helper.product_list=data_list;
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
//9_shop_category_all 9_category
router.get('/category/:category_title/',function(req, res) {
    var helper = biz9.get_helper_user(req);
    res.redirect("/shop/category/"+helper.category_title+"/1");
});
//9_shop 9_product_category_list
router.get('/category/:category_title/:page_current',function(req, res) {
    var helper = biz9.get_helper_user(req);
    helper.render='product_list';
    helper.page_title = APP_TITLE +': Shop: '+helper.category_title;
    helper.item = biz9.get_new_item(DT_BLANK,0);
    helper.render_list='/category/category_title';
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
            title_url='shop';
            biz9.get_page(db,title_url,{},function(error,page){
                helper.shop=page;
                call();
            });
        },
        function(call){
            sql={category:helper.category_title};
            sort={date_create:1};
            page_current=1;
            page_size=9;
            biz9.get_productz(db,sql,sort,page_current,page_size,function(error,data_list,total_count,page_count) {
                helper.product_list=data_list;
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
//9_checkout //9_product_checkout
router.get('/checkout/success/',function(req, res) {
    var helper = biz9.get_user_helper(req);
    helper.render='product_checkout_success';
    helper.page_title = APP_TITLE +': Shopping Checkout Success';
    helper.item = biz9.get_new_item(DT_BLANK,0);
    helper.product_order_list=[];
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
            title_url='product';
            biz9.get_page(db,title_url,{},function(error,page){
                helper.product=page;
                call();
            });
        },
        function(call){
            helper.product_cart_list=[];
            if(helper.user.tbl_id!=0){
                sql={customer_tbl_id:helper.user.tbl_id};
                sort={};
                page_current=1;
                page_size=10;
                biz9.get_cart_productz(db,sql,sort,page_current,page_size,function(error,data_list,total_count,page_count) {
                    helper.product_cart_list=data_list;
                    call();
                });
            }else{
                call();
            }
        },
        function(call){
            helper.cart_price_total=0;
            for(a=0;a<helper.product_cart_list.length;a++){
                helper.product_cart_list[a].item_group_price=biz9.get_money((parseFloat(helper.product_cart_list[a].item_price)*parseFloat(helper.product_cart_list[a].item_quantity)));
                helper.cart_price_total= parseFloat(helper.cart_price_total)+ (parseFloat(helper.product_cart_list[a].item_price)*parseFloat(helper.product_cart_list[a].item_quantity));
                biz9.o('group_price',helper.product_cart_list[a].item_group_price);
                biz9.o('cart_price_total',helper.cart_price_total);
            }
            //helper.cart_price_total=biz9.get_money(helper.cart_price_total+parseFloat(helper.primary.shipping_cost));//if shipping
            helper.cart_price_total=biz9.get_money(helper.cart_price_total);
            call();
        }],
        function(err, result){
            res.render(helper.render,{helper:helper});
            res.end();
        });
});
//9_retail_cart //9_cart 9_product_cart
router.get('/cart',function(req, res) {
    var helper = biz9.get_helper_user(req);
    helper.render='product_cart_list';
    helper.page_title = APP_TITLE +': Shopping Cart';
    helper.item = biz9.get_new_item(DT_BLANK,0);
    helper.render_list='/shop/all';
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
            helper.product_list=[];
            if(helper.user.tbl_id!=0){
                sql={customer_tbl_id:helper.user.tbl_id};
                sort={};
                page_current=1;
                page_size=10;
                biz9.get_cart_productz(db,sql,sort,page_current,page_size,function(error,data_list,total_count,page_count) {
                    helper.product_cart_list=data_list;
                    call();
                });
            }else{
                call();
            }
        },
        function(call){
            helper.cart_price_total=0;
            for(a=0;a<helper.product_cart_list.length;a++){
                helper.product_cart_list[a].item_group_price=biz9.get_money((parseFloat(helper.product_cart_list[a].item_price)*parseFloat(helper.product_cart_list[a].item_quantity)));
                helper.cart_price_total= parseFloat(helper.cart_price_total)+ (parseFloat(helper.product_cart_list[a].item_price)*parseFloat(helper.product_cart_list[a].item_quantity));
            }
            //helper.cart_price_total=biz9.get_money(helper.cart_price_total+parseFloat(helper.primary.shipping_cost));//if shipping
            helper.cart_price_total=biz9.get_money(helper.cart_price_total);
            call();
        }
    ],
        function(err, result){
            res.render(helper.render,{helper:helper});
            res.end();
        });
});
//9_cart 9_product_cart
router.get('/get_cart_view',function(req, res) {
    var helper = biz9.get_helper_user(req);
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
            helper.product_cart_list=[];
            if(helper.user.tbl_id!=0){
                sql={customer_tbl_id:helper.user.tbl_id};
                sort={};
                page_current=1;
                page_size=10;
                biz9.get_cart_productz(db,sql,sort,page_current,page_size,function(error,data_list,total_count,page_count) {
                    helper.product_cart_list=data_list;
                    call();
                });
            }else{
                call();
            }
        },
        function(call){
            helper.cart_price_total=0;
            for(a=0;a<helper.product_cart_list.length;a++){
                helper.product_cart_list[a].item_group_price=biz9.get_money((parseFloat(helper.product_cart_list[a].item_price)*parseFloat(helper.product_cart_list[a].item_quantity)));
                helper.cart_price_total= parseFloat(helper.cart_price_total)+ (parseFloat(helper.product_cart_list[a].item_price)*parseFloat(helper.product_cart_list[a].item_quantity));
            }
            //helper.cart_price_total=biz9.get_money(helper.cart_price_total+parseFloat(helper.primary.shipping_cost));
            call();
        }
    ],
        function(err, result){
            res.send({helper:helper});
            res.end();
        });
});
//9_remove_cart 9_cart remove 9_cart_remove
router.post("/remove_cart/:tbl_id",function(req,res){
    var helper = biz9.get_helper_user(req);
    helper.item = biz9.set_item_data(DT_PRODUCT_CART,0,req.body);
    async.series([
        function(call){
            biz9.get_connect_db(helper.app_title_id,function(error,_db){
                db=_db;
                call();
            });
        },
        function(call){
            biz9.delete_item(db,DT_PRODUCT_CART,helper.tbl_id,function(error,data) {
                helper.item.data;
                call();
            });
        },
    ],
        function(err, result){
            res.send({helper:helper});
            res.end();
        });
});
//9_update_cart 9_cart_update
router.post("/update_cart/:data_type/:tbl_id",function(req,res){
    var helper = biz9.get_helper_user(req);
    helper.item = biz9.set_item_data(DT_PRODUCT_CART,0,req.body);
    async.series([
        function(call){
            biz9.get_connect_db(helper.app_title_id,function(error,_db){
                db=_db;
                call();
            });
        },
        function(call){
            if(helper.user.tbl_id==0){
                helper.user.is_guest='true';
                helper.user.tbl_id=biz9.get_id();
                biz9.save_user(req,helper.user);
                call();
            }else{
                call();
            }
        },
        function(call){
            if(helper.product_cart_tbl_id){
                helper.item.tbl_id = helper.product_cart_tbl_id;
                helper.item.quantity = helper.quantity;
            }else{
                helper.item.tbl_id = 0;
                helper.item.quantity=1;
            }
            call();
        },
        function(call){
            helper.item.customer_tbl_id=helper.user.tbl_id;
            helper.item.customer_is_guest=helper.user.is_guest;
            biz9.get_item(db,helper.data_type,helper.tbl_id,function(error,data) {
                helper.item.item_tbl_id=data.tbl_id;
                helper.item.item_data_type=data.data_type;
                helper.item.item_price=data.price;
                helper.item.item_money_price=biz9.get_money(data.price);
                helper.item.item_title=data.title;
                helper.item.item_quantity=helper.item.quantity;
                helper.item.item_category=data.category;
                helper.item.item_title_url=data.title_url;
                helper.item.photofilename=data.photofilename;
                call();
            });
        },
        function(call){
            biz9.update_item(db,DT_PRODUCT_CART,helper.item,function(error,data) {
                helper.item=data;
                call();
            });
        },
    ],
        function(err, result){
            res.send({helper:helper});
            res.end();
        });
});
//9_update_cart_list 9_cart_list
router.post("/update_cart_list",function(req,res){
    var helper = biz9.get_helper_user(req);
    helper.item = biz9.set_item_data(DT_PRODUCT_CART,0,req.body);
    helper.product_list=[];
    async.series([
        function(call){
            biz9.get_connect_db(helper.app_title_id,function(error,_db){
                db=_db;
                call();
            });
        },
        function(call){
            if(helper.user.tbl_id==0){
                helper.user.is_guest='true';
                helper.user.tbl_id=biz9.get_id();
                biz9.save_user(req,helper.user);
                call();
            }else{
                call();
            }
        },
        function(call){
            if(helper.id_list){
                _id_list = helper.id_list.split(',');
            }

            if(helper.quantity_list){
                _quantity_list = helper.quantity_list.split(',');
            }

            for(a=0;a<_id_list.length;a++){
                if(_id_list[a]){
                    helper.product_list.push({tbl_id:_id_list[a],quantity:_quantity_list[a],data_type:DT_PRODUCT_CART});
                }
            }
            call();
        },
        function(call){
            biz9.update_list(db,helper.product_list,function(error,data) {
                call();
            });
        },
    ],
        function(err, result){
            res.send({helper:helper});
            res.end();
        });
});
//9_checkout 9_product_checkout 9_session
router.post("/create-checkout-session",async (req, res) => {
    var helper = biz9.get_helper_user(req);
    helper.retail_line_items=[];
    helper.cart_price_total=0;
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
            helper.item_list=[];
            if(helper.user.tbl_id!=0){
                sql={customer_tbl_id:helper.user.tbl_id};
                sort={};
                page_current=1;
                page_size=10;
                biz9.get_cart_productz(db,sql,sort,page_current,page_size,function(error,data_list,total_count,page_count) {
                    helper.product_cart_list=data_list;
                    call();
                });
            }else{
                call();
            }
        },
        function(call){
            helper.cart_price_total=0;
            for(a=0;a<helper.product_cart_list.length;a++){
                helper.product_cart_list[a].item_group_price=biz9.get_money((parseFloat(helper.product_cart_list[a].item_price)*parseFloat(helper.product_cart_list[a].item_quantity)));
                helper.cart_price_total=parseFloat(helper.cart_price_total)+(parseFloat(helper.product_cart_list[a].item_price)*parseFloat(helper.product_cart_list[a].item_quantity));
            }
            //helper.cart_price_total=biz9.get_money(helper.cart_price_total+parseFloat(helper.primary.shipping_cost));//if shipping
            helper.cart_price_total=biz9.get_money(helper.cart_price_total);
            call();
        },
        function(call){
            for(a=0;a<helper.product_cart_list.length;a++){
                helper.cart_price_total=biz9.get_money((parseFloat(helper.cart_price_total)+parseFloat(helper.product_cart_list[a].item_price)));
                helper.retail_line_items.push({
                    name:helper.product_cart_list[a].item_title,
                    quantity:helper.product_cart_list[a].item_quantity,
                    description:helper.product_cart_list[a].item_sub_note,
                    price:biz9.get_currency(helper.product_cart_list[a].item_price),
                    images:[helper.product_cart_list[a].thumb_photo_url],
                });
            }
            call();
        },
        function(call){
            helper.form_url='?customer_tbl_id='+helper.user.tbl_id+
                '&first_name='+helper.first_name+
            call();
        },
        function(call){
            const run = async function(a, b) {
                const stripe = require('stripe')(helper.primary.api.stripe_key);
                const items = helper.retail_line_items.map((item, a) => {
                    return {
                        price_data: {
                            currency: 'usd',
                            unit_amount: helper.retail_line_items[a].price,
                            product_data: {
                                name: helper.retail_line_items[a].name,
                                description: helper.retail_line_items[a].description,
                                images:helper.retail_line_items[a].images,
                            },
                        },
                        quantity: helper.retail_line_items[a].quantity,
                    };
                });
                const session = await stripe.checkout.sessions.create({
                    payment_method_types: ['card'],
                    line_items: items,
                    mode:'payment',
                    success_url:G_URL+"/shop/checkout/success"+helper.form_url,
                    cancel_url:G_URL
                });
                helper.checkout_url = session.url;
                call();
            }
            run();
        },
     ],
        function(err, result){
            if(helper.validation_message){
                res.redirect('/shop/checkout/'+helper.form_url+"&validation_message="+helper.validation_message);
            }else{
                res.redirect(303,helper.checkout_redirect_url);
            }
            res.end();
        });
});
//9_product_detail 9_detail
router.get('/:title_url',function(req, res) {
    var helper = biz9.get_helper_user(req);
    helper.render='product_detail';
    helper.page_title = APP_TITLE +': Shop ';
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
            title_url='shop';
            biz9.get_page(db,title_url,{},function(error,page){
                helper.shop=page;
                call();
            });
        },
        function(call){
            biz9.get_product(db,helper.title_url,function(error,data) {
                helper.item=data;
                helper.page_title = APP_TITLE +': Shop '+ helper.item.title;
                call();
            });
        },
        function(call){
            sql={};
            sort={date_create:1};
            page_current=1;
            page_size=9;
            biz9.get_productz(db,sql,sort,page_current,page_size,function(error,data_list) {
                helper.product_list=data_list;
                call();
            });
        },
    ],
        function(err, result){
            res.render(helper.render,{helper:helper});
            res.end();
        });
});
module.exports = router;
