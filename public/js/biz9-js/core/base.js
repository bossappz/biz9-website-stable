Lockr.prefix = 'lockr_';
COOKIE_USER='biz_user';
DEVICE_TYPE_IOS='iOS';
DEVICE_TYPE_ANDROID='Android';
// BIZ PROCCESSING START --
function get_new_item(data_type){
    if(!data_type){
        data_type=DT_BLANK;
    }
    var item={data_type:data_type,tbl_id:0};
    return item;
}
// BIZ PROCCESSING END --
// AUDIO PROCCESSING START --
function file_mp3_select(call){
    if(device.platform==DEVICE_TYPE_IOS){
        window.FilePicker.pickFile(successCallback,errorCallback);
        function successCallback(uri) {
            var fileURL = String(uri);
            upload_mp3(fileURL,function(data){
                call(data);
            });
        }
        function errorCallback(error){
            alert(error);
        }
    }else{
        fileChooser.open({mime: 'audio/mpeg'},function(uri) {
            var fileURL = String(uri);
            upload_mp3(fileURL,function(data){
                call(data);
            });
        });
    }
}
function upload_mp3(fileURI,call) {
    var ft = new FileTransfer();
    cloud_sql_url=get_cloud_url("cloud/file/update_mp3");
    ft.upload(fileURI, encodeURI(cloud_sql_url), uploadMP3Success, fail, {});
    function fail(error) {
        alert("An error has occurred: Code = " + error.code);
        //alert("upload error source " + error.source);
        //alert("upload error target " + error.target);
    }
    function uploadMP3Success(r) {
        res=JSON.parse(r.response);
        if(res.helper.validation_message){
            alert(res.helper.validation_message);
        }else{
            call(res.helper.item);
        }
    }
}
// AUDIO PROCCESSING END --
// PHOTO PROCCESSING START --
function camera_photo_select(call){
    navigator.camera.getPicture(onSuccess, onFail, {
        quality: 100,
        sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY,
        destinationType: Camera.DestinationType.FILE_URI,
        encodingType: Camera.EncodingType.JPEG,
        mediaType: Camera.MediaType.PICTURE,
        correctOrientation: true
    });
    function onSuccess(imageData) {
        plugins.crop(function success (data) {
            upload_photo(data,function(data){
                call(data);
            });
        },
            function fail() {
            }, imageData, {quality:100});
    }
    function onFail(message) {
         alert("An error has occurred: = " + message);
    }
}
function upload_photo(imageURI,call) {
    var ft = new FileTransfer();
    cloud_sql_url=get_cloud_url("cloud/file/update_photo");
    ft.upload(imageURI, encodeURI(cloud_sql_url), uploadSuccess, fail, {});
    function fail(error) {
        alert("An error has occurred: Code = " + error.code);
        //alert("upload error source " + error.source);
        //alert("upload error target " + error.target);
    }
    function uploadSuccess(r) {
        res=JSON.parse(r.response);
        if(res.helper.validation_message){
        }else{
            call(res.helper.item);
        }
    }
}
// PHOTO PROCCESSING END --
// USER PROCCESSING START --
function get_user(){
    new_user=false;
    user=cookie_get(COOKIE_USER);
    if(!user||!user.customer_id){
        user={customer_id:get_id(99999)};
        set_user(user);
    }
    return user;
}
function set_user(item){
    cookie_set(COOKIE_USER,item);
}
// USER PROCCESSING END --
// EDITOR PROCCESSING START --
let editor={};
function init_item_note(_str){
    return editor;
}
function get_item_note(){
    return editor.html.get();
}
// EDITOR PROCCESSING END --
// CLOUD START PROCCESSING START --
function get_cloud_url(url){
    _query='?app_title_id='+APP_TITLE_ID;
    return CLOUD_URL+"/"+url+_query;
}
function cloud_get(data_type,tbl_id,call){
    url='cloud/crud/get/'+data_type+'/'+tbl_id;
    cloud_get_url(url,{},function(data){
        call(data.item);
    });
}
function cloud_update(data_type,tbl_id,params,call){
    url='cloud/crud/update/'+data_type+'/'+tbl_id;
    cloud_post_url(url,params,function(data){
        call(data.item);
    });
}
function cloud_update_biz(data_type,tbl_id,params,call){
    url='cloud/crud/update_biz/'+data_type+'/'+tbl_id;
    cloud_post_url(url,params,function(data){
        call(data.item);
    });
}
function cloud_delete(data_type,tbl_id,call){
    url='cloud/crud/delete/'+data_type+'/'+tbl_id;
    cloud_post_url(url,{},function(data){
        call(data.item);
    });
}
function cloud_post_url(url,params,call){
    $.post(get_cloud_url(url),params,function(data){
        w('biz_cloud_cloud_url',url);
        w('biz_cloud_cloud_data',data);
        call(data.helper);
    }).fail(function() {
        alert('Network connection fail. Cannot connect to server!')
        alert(get_cloud_url(url));
    });
}
function cloud_get_url(url,params,call){
    $.get(get_cloud_url(url),params,function(data){
        w('biz_cloud_url',url);
        w('biz_cloud_data',data);
        call(data.helper);
    }).fail(function() {
        alert('Network connection fail. Cannot connect to server!')
        alert(get_cloud_url(url));
    });
}
//-- OTHER START --
function set_pull_down(){
    PullToRefresh.init({
        mainElement: 'body',
        onRefresh: function(){ window.location.reload(); }
    });
}
//-- OTHER END --
//-- TEST START --
function get_test_sub_note(){
        var str = get_id(9999)+ "Lorem Ipsum is simply dummy text of the printing and "+
            "typesetting industry. Lorem Ipsum has been the industry's standard "+
            "dummy text ever since the 1500s.";
        return str;
    }
function get_test_note(){
        var str = get_id(9999)+  " What is Lorem Ipsum? "+
            "Lorem Ipsum is simply dummy text of the printing and "+
            "typesetting industry. Lorem Ipsum has been the industry's standard "+
            "dummy text ever since the 1500s, when an unknown printer took a galley "+
            "including versions of Lorem Ipsum. "+
            "It is a long established fact that a reader will be distracted by the "+
            "readable content of a page when looking at its layout. The point of  "+
            " injected humour, or non-characteristic words etc.";
        return str;
    }
function get_test_rich_note(){
        var str = "<div>"+
            "<h2> note " + get_id(9999)+  " What is Lorem Ipsum?</h2>"+
            "<p><strong>Lorem Ipsum</strong> is simply dummy text of the printing and"+
            "typesetting industry. Lorem Ipsum has been the industry's standard "+
            "dummy text ever since the 1500s, when an unknown printer took a galley "+
            "of type and scrambled it to make a type specimen book. It has survived"+
            "not only five centuries, but also the leap into electronic typesetting, "+
            "remaining essentially unchanged. It was popularised in the 1960s with  "+
            "the release of Letraset sheets containing Lorem Ipsum passages, and more "+
            "recently with desktop publishing software like Aldus PageMaker "+
            "including versions of Lorem Ipsum.</p> "+
            "</div><div> "+
            "<h2>Why do we use it?</h2> "+
            "<p>It is a long established fact that a reader will be distracted by the "+
            "readable content of a page when looking at its layout. The point of  "+
            "using Lorem Ipsum is that it has a more-or-less normal distribution of  "+
            "letters, as opposed to using 'Content here, content here', making it  "+
            "look like readable English. Many desktop publishing packages and web  "+
            "page editors now use Lorem Ipsum as their default model text, and a  "+
            "search for 'lorem ipsum' will uncover many web sites still in their  "+
            "infancy. Various versions have evolved over the years, sometimes by  "+
            "accident, sometimes on purpose (injected humour and the like).</p> "+
            "</div><br><div> "+
            "	injected humour, or non-characteristic words etc.</p>";
        return str;
    }
//-- TEST END --
