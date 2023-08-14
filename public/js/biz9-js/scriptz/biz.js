DT_BLOG_POST='blog_post_biz';
PAYMENT_TYPE_PAY_NOW='pay_now';
PAYMENT_TYPE_CASHAPP='cashapp';
PAYMENT_TYPE_ON_DELIVERY='pay_on_delivery';
//biz
function get_new_item(data_type){
	if(!data_type){
		data_type=DT_BLANK;
	}
	return {data_type:data_type,tbl_id:0};
}
// CLOUD START PROCCESSING END --
//$('#biz_pager').html(get_pager_str(data.page_current,data.page_count,'gallery_list.html?category=all'));
function get_pager_str(page_current,page_count,url){
	str='';
	if(page_count){
		if(page_current>1){
			str = str+"<li class='prev'>";
			str = str+"<a href='"+url+"&page_current="+(parseInt(page_current)-1)+"'>";
			str = str+"<span class='fa fa-angle-left'></span>";
			str = str+"</a></li>";
		}
		for(var a=1;a<=page_count;a++){
			if(page_current==a){
				str=str+"<li class='active'><a href='"+url+"&page_current="+a+"'>"+a+"</a></li>";
			}else{
				str=str+"<li><a href='"+url+"&page_current="+a+"'>"+a+"</a></li>";
			}
		}
		if(page_current>=page_count-1){
		}else{
			str=str+"<li><a href='"+url+"&page_current="+(parseInt(page_current)+1)+"'><span class='fa fa-angle-right'></span></a></li>";
		}
		str=str+"</li>";
	}
	return str;
}
//$('#biz_pager').html(get_pager_ajax(page_current,page_count));
function get_pager_ajax(page_current,page_count){
	str='';
	if(page_count){
		if(page_current>1){
			str = str+"<li class='page-item'>";
			str = str+"<a page_current='"+(parseInt(page_current)-1)+"' class='page-link color-black bg-transparent border-0 biz_link_page' href='#' tabindex='-1' aria-disabled='true'><i class='fa fa-angle-left'></i></a>";
			str = str+"</li>";
		}
		for(var a=1;a<=page_count;a++){
			if(page_current==a){
				str=str+"<li class='page-item active biz_link_page' page_current='"+a+"'><a class='page-link color-black rounded-s border-0 biz_link_page biz_btn' href='#'  page_current='"+a+"'>"+a+"<span class='sr-only'>(current)</span></a></li>";
			}else{
				str=str+"<li class='page-item biz_link_page'  page_current='"+a+"'><a  page_current='"+a+"' class='page-link color-black border-0 biz_link_page' href='#'>"+a+"</a></li>";
			}
		}
		if(page_current>=page_count){
		}else{
			str=str+"<li   page_current='"+(parseInt(page_current)+1)+"' class='page-item biz_link_page'><a  page_current='"+(parseInt(page_current)+1)+"' class='page-link rounded-xs color-black bg-transparent border-0 biz_link_page' href='#'><i class='fa fa-angle-right'></i></a></li>";
		}
		str=str+"</li>";
	}
	return str;
}

