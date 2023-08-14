hide_photo();
function hide_photo(){
    $('#biz_btn_photo_upload').hide();
    $('#biz_lbl_photo_img').hide();
}
function show_photo(data){
    $('#biz_lbl_photo_img').show();
    $('#biz_lbl_photo_img').attr('src',data.photo_obj.thumb_url);
}
//9_upload_photo_form
$('#biz_file_photo_upload').change(function(){
    var fileInput = document.getElementById('biz_file_photo_upload');
    var filePath = fileInput.value;
    var allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif|\.avif|\.webp|\.svg)$/i;
    if (!allowedExtensions.exec(filePath)) {
        alert('Invalid file type');
        fileInput.value = '';
        return false;
    }else{
        $('#biz_btn_photo_upload').show();
        $('#biz_lbl_photo_img').hide();
        $('#biz_btn_add_blog_post').hide();
    }
});
//9_upload
//biz_form_photo_upload
$('#biz_form_photo_upload').submit(function(e){
    e.preventDefault();
    $.ajax({
        type: 'POST',
        url: $('#biz_form_photo_upload').attr('action'),
        data: new FormData( this ),
        processData: false,
        contentType: false,
        success: function(data){
            if(data.helper.error){
                alert(data.helper.error);
                $('#biz_file_photo_upload').show();
            }else{
                $('#biz_btn_add_blog_post').show();
                $('#biz_txt_photofilename').val(data.helper.item.photofilename);
                $('#biz_lbl_photo_img').attr('src',data.helper.item.photo_obj.thumb_url);
                $('#biz_lbl_photo_img').show();
                $('#biz_file_photo_upload').show();
                $('#biz_btn_photo_upload').hide();
                bind_photo_setting(data.helper.item);
            }
        },
        error: function(data){
            alert('UPLOAD ERROR');
            alert(data.helper.error);
            console.log(data);
        }
    });
    return false;
});
function bind_photo_setting(data){
    if(data.photofilename){
        show_photo(data);
    }else{
        hide_photo();
    }
}
