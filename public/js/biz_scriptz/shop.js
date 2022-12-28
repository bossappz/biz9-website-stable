get_cart_view();
function get_cart_view(){
    $('#sp_cart_total').html('0');
    $.ajax({
        type: "GET",
        url: "/shop/get_cart_view",
        enctype: 'multipart/form-data',
        data: {},
        success: function(data){
            $('#sp_cart_total').html(data.helper.product_cart_list.length);
        }
    });
    return false;
}
$('.btn_remove_product_cart').click(function(event){
    var result = confirm("Want to delete?");
    if (result) {
        //Logic to delete the item
        tbl_id = $(this).attr('tbl_id');
        $.ajax({
            type: "POST",
            url: "/shop/remove_cart/"+tbl_id,
            enctype: 'multipart/form-data',
            data: {},
            success: function(data){
                window.location.reload();
            }
        });
        return false;
    }
});
$('.btn_add_product_cart').click(function(event){
    tbl_id = $(this).attr('tbl_id');
    data_type = $(this).attr('data_type');
    quantity = $('#txt_quantity').val();
    if(!quantity){
        if($(this).attr('quantity')){
            quantity=$(this).attr('quantity');
        }else{
            quantity=1;
        }
    }
    $.ajax({
        type: "POST",
        url: "/shop/update_cart/"+data_type+"/"+tbl_id,
        enctype: 'multipart/form-data',
        data: {tbl_id:tbl_id,data_type:data_type,quantity:quantity},
        success: function(data){
            get_cart_view();
            //window.location='/shop/cart';
        }
    });
    return false;
});
$('.txt_update_product_cart').on('input',function(e){
    tbl_id = $(this).attr('tbl_id');
    data_type = $(this).attr('data_type');
    new_quantity = $(this).val();
    if(!new_quantity){
        new_quantity=1;
    }
    $.ajax({
        type: "POST",
        url: "/shop/update_cart/"+data_type+"/"+tbl_id,
        enctype: 'multipart/form-data',
        data: {tbl_id:tbl_id,data_type:data_type,new_quantity:new_quantity},
        success: function(data){
            get_cart_view();
        }
    });
    return false;
});
$('#btn_pay_checkout').click( function() {
    event.preventDefault();
	/*
    first_name = $('#tb_item_first_name').val();
    last_name = $('#tb_item_last_name').val();
    company = $('#tb_item_company').val();
    street_address = $('#tb_item_street_address_1').val() +" " +  $('#tb_item_street_address_2').val();
    zip = $('#tb_item_zip').val();
    state = $('#tb_item_state').val();
    phone = $('#tb_item_phone').val();
    email = $('#tb_item_email').val();
    note = $('#tb_item_note').val();
    if(!first_name){
        alert('Please enter a valid first name.');
    }else if(!street_address){
        alert('Please enter a valid street address.');
    }else if(!email ||!validate_email(email)){
        alert('Please enter a valid email.');
    }else if(!email ||!validate_email(email)){
        alert('Please enter a valid email.');
    }else{
	*/
        $.ajax({
            url: '/shop/create-checkout-session',
            type: 'POST',
            dataType: 'json',
            //data: {first_name:first_name,last_name:last_name,company:company,street_address:street_address,zip:zip,phone:phone,email:email,note:note,state:state},
            data: {},
            success: function(data) {
                if(data.helper.validation_message){
                    alert(data.helper.validation_message);
                }else{
						alert(data.helper.checkout_url);
                    	window.location=data.helper.checkout_url;
                }
            }
        });
    //}
});
$('#btn_update_cart').click(function(event){
    window.location.reload();
});





