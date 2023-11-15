load_test();
load_data();
function load_test(){
    clear_fields();
    tbl_id=get_id(999);
    $('#biz_txt_title').val(tbl_id+'_title');
    $('#biz_txt_sub_note').val(get_test_sub_note());
    $('#biz_txt_note').val(get_test_note());
}
function clear_fields(){
    $('#biz_txt_title').val('');
    $('#biz_txt_sub_note').val('');
    $('#biz_txt_photofilename').val('');
    $('#biz_txt_note').val('');
}
function load_data(){
    url = "blog/list/1";
    cloud_get_url(url,{},function(biz_data){
        biz_data.blog_post_list.map((obj_item) => {
            obj_item.full_date_create=obj_item.date_obj.full_date_update + " " + obj_item.date_obj.time_update;
            obj_item.photo_url=obj_item.photo_obj.mid_url;
            const blog_post_item = get_blog_post_item(obj_item);
            document.querySelector('.blog__container').insertAdjacentHTML("beforeend", blog_post_item);
            bind_blog_post_delete_event(obj_item.tbl_id);
            bind_blog_post_detail_event(obj_item.tbl_id,obj_item.title_url);
            bind_blog_post_edit_event(obj_item.tbl_id);
        });
    });
    function bind_blog_post_edit_event(tbl_id){
        $('#biz_btn_blog_post_edit_'+tbl_id).click(function(event){
            obj={};
            obj.tbl_id = tbl_id;
            obj.data_type=DT_BLOG_POST;
            cloud_get(obj.data_type,obj.tbl_id,function(data){
                clear_fields();
                $('#biz_txt_title').val(data.title);
                $('#biz_txt_photofilename').val(data.photofilename);
                $('#biz_txt_sub_note').val(data.sub_note);
                $('#biz_txt_note').val(data.note);
                $('#biz_lbl_photo_img').show();
                $('#biz_lbl_photo_img').attr('src',data.photo_obj.mid_url);
                $('#biz_modal_blog_post_edit').modal('show');
            });
        });
    }
    function bind_blog_post_detail_event(tbl_id,title_url){
        $('#biz_btn_open_blog_'+tbl_id).click(function(event){
            obj={};
            obj.tbl_id = tbl_id;
            obj.data_type=DT_BLOG_POST;
            url='blog/get_biz_item/'+title_url;
            cloud_get_url(url,{},function(biz_data){
                $('#biz_lbl_blog_post_title').html(biz_data.blog_post.title);
                $('#biz_lbl_blog_post_image').attr('src',biz_data.blog_post.photo_obj.mid_url);
                $('#biz_lbl_blog_post_sub_note').html(biz_data.blog_post.sub_note);
                $('#biz_lbl_blog_post_note').html(biz_data.blog_post.note);
                $('#biz_lbl_blog_post_date').html(biz_data.blog_post.date_obj.full_date_update + " " + biz_data.blog_post.date_obj.time_update);
                $('#biz_lbl_review_count').html(biz_data.blog_post.review_obj.review_list.length+" Reviews");
                biz_data.blog_post.review_obj.review_list.map((obj_item) => {
                    const review_item = get_review_item(obj_item);
                    document.querySelector('#comment__container').insertAdjacentHTML("beforeend", review_item);
                });
                $('#biz_modal_blog_post_detail').modal('show');
                bind_review_add_event(biz_data.blog_post.data_type,biz_data.blog_post.tbl_id);
                bind_review_test();
            });
        });
    }
    function bind_blog_post_delete_event(tbl_id){
        $('#biz_btn_blog_post_delete_'+tbl_id).click(function(event){
            obj={};
            obj.tbl_id = tbl_id;
            obj.data_type=DT_BLOG_POST;
            if (confirm("Delete?") == true) {
                cloud_delete(obj.data_type,obj.tbl_id,function(data){
                    $('#biz_blog_post_div_item_'+obj.tbl_id).remove();
                });
            }
        });
    }
    $('#biz_btn_add_blog_post').click(function(event){
        obj={};
        obj.tbl_id = 0;
        obj.data_type = DT_BLOG_POST;
        obj.title = $('#biz_txt_title').val();
        obj.title_url = get_title_url(obj.title);
        obj.sub_note = $('#biz_txt_sub_note').val();
        obj.note = $('#biz_txt_note').val();
        obj.photofilename = $('#biz_txt_photofilename').val();
        obj.visible='true';
        cloud_update(obj.data_type,obj.tbl_id,obj,function(data){
            window.location.reload();
        });
        return false;
    });
    $('.txt_update_product_cart').on('input',function(e){
    });
    $('#btn_pay_checkout').click( function() {
    });
    $('#btn_update_cart').click(function(event){
        window.location.reload();
    });
    const get_blog_post_item = ({
        tbl_id,
        photo_url,
        title,
        sub_note,
        full_date_create,
        note
    }) => `<div class="col-lg-4 col-md-6" id='biz_blog_post_div_item_${tbl_id}'>
<div class="card m-2">
  <div class="card-header d-flex justify-content-end gap-2">
    <button id='biz_btn_blog_post_edit_${tbl_id}' type="button" class="btn btn-outline-success" tbl_id="${tbl_id}"><i class="fas fa-pencil-alt" id="${tbl_id}"></i></button>
    <button id='biz_btn_blog_post_delete_${tbl_id}' type="button" class="btn btn-outline-danger biz_btn_blog_post_delete" tbl_id="${tbl_id}"><i  class="fas fa-trash-alt"></i></button>
  </div>
  <img
    src=${photo_url}
    class="card-img-top" alt="...">
  <div class="card-body">
    <h4 class="card-title">${title}</h4>
    <b  class='card-sub-note'><i>${sub_note}</i></b>
    <span class="badge bg-primary card-date">${full_date_create}</span>
    <p class="card-text">${note}</p>
  </div>
  <div class="card-footer text-muted">
    <button type="button" tbl_id='${tbl_id}' id="biz_btn_open_blog_${tbl_id}" class="btn btn-outline-primary float-end biz_btn_detail_blog_post">Open Blog</button>
  </div>
</div>
</div>`;

}

