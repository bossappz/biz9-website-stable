//9_product_list 9_list
//9_detail //9_product_detail
function set_page_product_detail(data){
    bind_page_id(data);
    bind_detail(data);
    bind_event();
     function bind_detail(data){

         $('#biz_lbl_item_title').html(data.product.title);

         console.log('aaaaa');
         console.log(data);
        if(data.items.length>0){
            $('#biz_lbl_option_list').show();
        for(a=0;a<data.items.length;a++){
            str='';
            $('#biz_lbl_optiondiv'+a).show();
            $('#biz_lbl_optiontitle'+a).html(data.items[a].title);
            str=str+ "<option value='"+data.items[a].tbl_id+"' disabled>"+data.items[a].title+"</option>";
            for(b=0;b<data.items[a].items.length;b++){
                str=str+ "<option value='"+data.items[a].items[b].tbl_id+"'>"+data.items[a].items[b].title + " " + get_money(data.items[a].items[b].price) +"</option>";
            }
            $('#biz_sel_option'+a).html(str);
        }
        }
    }
    function bind_event(){
        //9_cart cart-start cart_add add_cart 9_add_cart-- 9_cart_add
        $("#biz_btn_cart_add").click(function() {
            hide_toast();
            $('#biz_btn_cart_add').addClass("bg-click");
            $('#biz_btn_cart_add').html("Added to Cart!");
            option_item_1_tbl_id=$('#biz_sel_option0').val();
            option_item_2_tbl_id=$('#biz_sel_option1').val();
            option_item_3_tbl_id=$('#biz_sel_option2').val();
            option_item_4_tbl_id=$('#biz_sel_option3').val();
            obj={};
            obj.tbl_id=$('#biz_page_tbl_id').val();
            obj.data_type=$('#biz_page_data_type').val();
            obj.customer_id=get_user().customer_id;
            if(option_item_1_tbl_id){
                obj.option_item_1_tbl_id=option_item_1_tbl_id;
            }
            if(option_item_2_tbl_id){
                obj.option_item_2_tbl_id=option_item_2_tbl_id;
            }if(option_item_3_tbl_id){
                obj.option_item_3_tbl_id=option_item_3_tbl_id;
            }if(option_item_4_tbl_id){
                obj.option_item_4_tbl_id=option_item_4_tbl_id;
            }
            cloud_order_cart_add(DT_PRODUCT,obj.tbl_id,obj,1,function(data){
                return false;
            });
        });
    }
}
// 9_product_edit 9_edit 9_dashboard_product_edit
//-- PRODUCT PROCESSING END --

