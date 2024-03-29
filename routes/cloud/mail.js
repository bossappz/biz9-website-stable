var express = require('express');
var router = express.Router();
router.get('/ping', function(req, res, next) {
    var helper = biz9.get_helper(req);
    helper.test = 'crud mail ping';
    res.send({helper:helper});
    res.end();
});
router.post('/send_brevo_mail_message',function(req, res) {
    var helper = biz9.get_helper(req);
    helper.brevo_obj = biz9.get_new_item(DT_BLANK,0);
    async.series([
        function(call){
            biz9.get_client_db(function(error,_client_db){
                client_db=_client_db;
                db = client_db.db(helper.app_title_id);
                call();
            });
        },
        function(call){
            form_send={};
            customer=set_customer(helper);
            biz_info = set_biz_info();
            mail_notification=set_mail_message_notification(biz_info,customer);
            helper.brevo_obj=set_mail_message(mail_notification,helper);
            call();
        },
        function(call){
            biz9.send_brevo_mail(BREVO_KEY,helper.brevo_obj,function(error,data) {
                if(error){
                    helper.validation_message=error;
                }
                call();
            });
        },
        function(call){
            biz9.close_client_db(client_db,function(error){
                call();
            });
        }
    ],
        function(err, result){
            res.send({helper:helper});
            res.end();
        });
    set_biz_info=function(){
        info = biz9.get_new_item(DT_BLANK,0);
        info.business_name=biz9_app_config.APP_TITLE;
        info.brevo_form_send_subject=BREVO_FORM_SEND_SUBJECT;
        info.brevo_form_send_template_id=BREVO_FORM_SEND_TEMPLATE_ID;
        info.brevo_sender=EMAIL_SENDER;
        info.brevo_reply=EMAIL_REPLY;
        return info;
    }
    set_customer=function(item){
        customer = biz9.get_new_item(DT_BLANK,0);
        customer.email=item.customer_email ? (item.customer_email) : "email_not_found@gmail.com";
        customer.name=item.customer_name ? (item.customer_name) : "Customer";
        return customer;
    }
    set_mail_message_notification=function(info,customer){
        mail_notification={};
        mail_notification.subject=info.brevo_form_send_subject;
        mail_notification.template_id = info.brevo_form_send_template_id;
        mail_notification.copyright='Copyright @ '+info.business_name;
        mail_notification.sender={name:info.business_name,email:info.brevo_sender};
        mail_notification.replyTo={name:info.business_name,email:info.brevo_reply};
        mail_notification.to_list=[];
        mail_notification.to_list.push({name:customer.name,email:customer.email});
        mail_notification.to_list.push({name:info.business_name,email:info.brevo_sender});
        return mail_notification;
    }
    set_mail_message=function(mail,helper){
        form_send={};
        form_send.business_name=mail.sender.name;
        form_send.copyright=mail.sender.name;
        for(a=1;a<parseInt(helper.field_count)+1;a++){
            form_send['form_title_'+a]=helper['field_title_'+a];
            form_send['form_value_'+a]=helper['field_value_'+a];
        }
        return {
            'templateId':parseInt(mail.template_id),
            'subject':mail.subject,
            'sender' : {'email':mail.sender.email,'name':mail.sender.name},
            'replyTo' : {'email':mail.replyTo.email,'name':mail.replyTo.name},
            'to':mail.to_list,
            'params':form_send
        }
    }
});
router.post('/update_email_list',function(req,res){
    var helper = biz9.get_helper(req);
    helper.item = biz9.set_item_data(DT_EMAIL,0,req.body);
    helper.validation_message =null;
    async.series([
        function(call){
            biz9.get_client_db(function(error,_client_db){
                client_db=_client_db;
                db = client_db.db(helper.app_title_id);
                call();
            });
        },
        function(call){
            helper.email_add='true';
            sql_obj = {email:helper.item.email};
            biz9.get_sql(db,DT_EMAIL, sql_obj,{}, function(data_list) {
                if(data_list.length>0) {
                    helper.email_add='false';
                    helper.validation_message='Email Already Added';
                }
                call();
            });
        },
        function(call){
            if(helper.email_add=='true'){
                biz9.update_item(db,helper.item.data_type,helper.item,function(data) {
                    helper.item=data;
                    call();
                });
            }
            else{
                call();
            }
        },
        function(call){
            mail={};
            mail.subject=APP_TITLE + ' Email List Update';
            mail.sender = EMAIL_SENDER;
            mail.to = EMAIL_TO;
            str='<b>Email:</b> '+helper.email;
            str=str+'<br/><b>Added To List:</b> '+helper.email_add;
            mail.body = str;
            call();
        },
        function(call){
            biz9.send_mail(mail,function(_data) {
                call();
            });
        },
        function(call){
            biz9.close_client_db(client_db,function(error){
                call();
            });
        }
    ],
        function(err, result){
            res.send({helper:helper});
            res.end();
        });
});
module.exports = router;
