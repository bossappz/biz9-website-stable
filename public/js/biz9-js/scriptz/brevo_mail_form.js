$(document).ready(function() {
    $('#biz_btn_submit').click(function(e){
        e.preventDefault();
        var obj_form={};
        obj_form.form_title= 'Brevo Email Form Test';
        obj_form.field_count=3;
        obj_form.field_title_1='First Name';
        obj_form.field_value_1=$('#biz_txt_first_name').val();
        obj_form.field_title_2='Last Name';
        obj_form.field_value_2=$('#biz_txt_last_name').val();
        obj_form.field_title_3='Email';
        obj_form.field_value_3=$('#biz_txt_email').val();
        obj_form.field_title_4='Message';
        obj_form.field_value_4=$('#biz_txt_message').val();
        obj_form.customer_name=$('#biz_txt_first_name').val() + " " + $('#biz_txt_last_name').val();
        obj_form.customer_email=$('#biz_txt_email').val();
        //obj_form.customer_id=get_user().customer_id;
        if(!obj_form.field_value_1){
            alert('First name required.');
        }
        if(!validate_email(obj_form.field_value_3)){
            alert('Please use a valid email address.');
        }
        else{
            $.ajax({
                type: "POST",
                url: "/cloud/mail/send_brevo_mail_message",
                enctype: 'multipart/form-data',
                data: {
                    form_title:obj_form.form_title,
                    field_count:4,
                    field_title_1:obj_form.field_title_1,
                    field_value_1:obj_form.field_value_1,
                    field_title_2:obj_form.field_title_2,
                    field_value_2:obj_form.field_value_2,
                    field_title_3:obj_form.field_title_3,
                    field_value_3:obj_form.field_value_3,
                    field_title_4:obj_form.field_title_4,
                    field_value_4:obj_form.field_value_4,
                    customer_email:obj_form.customer_email,
                    customer_name:obj_form.customer_name
                },
                success: function(data){
                    if(data.helper.validation_message){
                        alert(data.helper.validation_message);
                    }else{
                        alert('Thanks for contacting us! We will get in touch with you shortly.');
                    }
                }
            });
        }
        return false;
    });
});
