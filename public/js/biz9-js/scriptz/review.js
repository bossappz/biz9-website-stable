//review_clear();
function bind_review_test(){
    $('#biz_tb_review_name').val(String(get_id())+'_review_name');
    $('#biz_tb_review_comment').val(String(get_id())+'_review_comment');
    $('#biz_tb_review_location').val(String(get_id())+'_review_location');
    $('#biz_tb_review_email').val('myemail'+String(get_id())+'@gmail.com');
}
function review_clear(){
    $('#biz_tb_review_name').val('');
    $('#biz_tb_review_comment').val('');
    $('#biz_tb_review_location').val('');
}
function bind_review_add_event(data_type,tbl_id){
    $("#biz_btn_review_add").click(function(e) {
        e.stopPropagation();
        obj={};
        obj.parent_data_type=data_type;
        obj.parent_tbl_id=tbl_id;
        obj.customer_name=$('#biz_tb_review_name').val();
        obj.customer_email=$('#biz_tb_review_email').val();
        obj.customer_rating=$('#biz_sel_review_rating').val();
        obj.customer_location=$('#biz_tb_review_location').val();
        obj.customer_comment=$('#biz_tb_review_comment').val();
        obj.item_title=$('#biz_tb_title').val();
        obj.customer_id=get_user().customer_id;
        if(!validate_email(obj.customer_email)){
            alert('Please enter a valid email');
        }else if(!obj.customer_name){
            alert('Please enter a name');
        }else if(!obj.customer_rating){
            alert('Please select a rating');
        }else{
            url = "item/review_update/"+obj.parent_data_type+"/"+obj.parent_tbl_id;
                cloud_post_url(url,obj,function(data){
                //window.location.reload();
            });
        }
        return false;
    });
    $(".biz_btn_review_delete").click(function(e) {
        e.stopPropagation();
        var obj={};
        obj.data_type = $(this).attr('data_type');
        obj.tbl_id = $(this).attr('tbl_id');
        obj.parent_tbl_id = $('#biz_page_tbl_id').val()
        if (confirm("Delete?") == true) {
            url = "item/review_delete/"+obj.tbl_id+"/"+ obj.data_type+"/"+ obj.parent_tbl_id;
            cloud_post_url(url,obj,function(data){
                $('#biz_row_'+obj.tbl_id).remove();
                console.log(data);
                $('#biz_page_review_count').html(data.item.review_count);
                return false;
            });
        }
    });
}
const get_review_item = ({
    data_type,
    tbl_id
}) => `<div class="comment-box"><div class="comment"><div class="author-thumb"><img src="images/resource/author-1.jpg" alt=""></div><div class="comment-inner"><div class="comment-info clearfix">Micheal – Mar 17, 2021:</div><div class="rating"><span class="fa fa-star"></span><span class="fa fa-star"></span><span class="fa fa-star"></span><span class="fa fa-star"></span><span class="fa fa-star light"></span></div><div class="text">Duis sed odio sit amet nibh vulputate cursus a sit ame acmsan ipsuy veli Nam nec tellus a odio Duis sed odio sit ai nibh vulputate cursus a sit ame.</div></div></div></div>`;

