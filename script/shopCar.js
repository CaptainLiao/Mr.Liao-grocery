$(document).ready(function(){
	function checkedEle() {
		if(this.checked){
			$(this).parent().siblings('.count').find('.count-input').val(1);
			$(this).parent().siblings('.subTotal').text($(this).parent().siblings('.price').text());
		}else{
			$(this).parent().siblings('.count').find('.count-input').val(0);
			$(this).parent().siblings('.subTotal').text(0);
		}
		if($(".check").length==$(".check").filter(":checked").length){
			$(".check-all").prop("checked",true);
		}else if($("tr:not(.hide)").find(".checkbox").find('.check-one').length==$(".check-one").filter(":checked").length){
			$(".check-all").prop("checked",true);
		}else{
			$(".check-all").prop("checked",false);
		}
	}
	//点击全选，选中所有选项
	var selectAll=$(".check-all");
	selectAll.click(function(){
		$(".check").prop("checked",this.checked);
		if(this.checked){
			$("tr:not(.hide)").find('.count').find('.count-input').val(1);
			// $(".count-input").val(1);
			$("tr:not(.hide)").find('.count').find('.count-input').each(function(){
				$(this).parent().siblings('.subTotal').text($(this).parent().siblings('.price').text());
				});
			}else{
			$(".count-input").val(0);
			$(".subTotal").text(0);
			}
		selectTotal();
		priceTotal();
	});
	$(".check").click(function(){
		if(this.checked){
			$(this).parent().siblings('.count').find('.count-input').val(1);
			$(this).parent().siblings('.subTotal').text($(this).parent().siblings('.price').text());
		}else{
			$(this).parent().siblings('.count').find('.count-input').val(0);
			$(this).parent().siblings('.subTotal').text(0);
		}
		if($(".check").length==$(".check").filter(":checked").length){
			$(".check-all").prop("checked",true);
		}else if($("tr:not(.hide)").find(".checkbox").find('.check-one').length==$(".check-one").filter(":checked").length){
			$(".check-all").prop("checked",true);
		}else{
			$(".check-all").prop("checked",false);
		}
		selectTotal();
		priceTotal();
	});
	//点击删除，删除相应选项
	$(".delete").click(function() {
		$(this).parent().parent().addClass('hide');
		$(this).parent().siblings(".checkbox").find('.check-one').prop("checked",false);
		if($("tr:not(.hide)").find(".checkbox").find('.check-one').length==$(".check-one").filter(":checked").length){
			$(".check-all").prop("checked",true);
		}
		selectTotal();
		priceTotal();
	});
	//全部删除
	$(".deleteAll").click(function() {
		$("tbody tr").addClass('hide');
		$("#selectTotal").text(0);
		$(".priceTotal").text(0);
		$(".check-all").prop("checked",false).attr("disabled","true");

	});
	//点击加减，增加或减少对应的数量及价格
/*	$("tr").on("click","span",function(){
		if($(this).attr("class")=="add"){
			var $inputVal=$(this).prev().val();
			$(this).prev().val(++$inputVal);
			$inputVal=$inputVal;
			var $price=$(this).parent().prev().text()*$inputVal;
			$(this).parent().next().text($price);
			selectTotal();
			priceTotal();
		}else if($(this).attr("class")=="reduce"){
			var $inputVal=$(this).next().val();
			if($inputVal>1){
				$(this).next().val(--$inputVal);
				$inputVal=$inputVal;
				var $price=$(this).parent().prev().text()*$inputVal;
				$(this).parent().next().text($price);
			}
			selectTotal();	
			priceTotal();
		}
	})*/
	$(".add").click(function(){
		var $inputVal=$(this).prev().val();
		$(this).prev().val(++$inputVal);
		$inputVal=$inputVal;
		var $price=$(this).parent().prev().text()*$inputVal;
		$(this).parent().next().text($price);
		selectTotal();
		priceTotal();
	});
	$(".reduce").click(function(){
		var $inputVal=$(this).next().val();
		if($inputVal>1){
			$(this).next().val(--$inputVal);
			$inputVal=$inputVal;
			var $price=$(this).parent().prev().text()*$inputVal;
			$(this).parent().next().text($price);
		}
		selectTotal();	
		priceTotal();
	});
	//手动输入，自动算价格
	$(".count-input").keyup(function(){
		var $inputVal=$(this).val();
		var $price=$(this).parent().prev().text()*$inputVal;
		if($inputVal>0){
			$(this).parent().siblings(".checkbox").find(".check-one").prop("checked",true);
			$(this).parent().next().text($price);
			checkedEle();
		}else{
			$(this).parent().siblings(".checkbox").find(".check-one").prop("checked",false);
			$(this).parent().next().text(0);
			checkedEle();
		}
		
		selectTotal();
		priceTotal();
	});
	//已选商品件数
	function selectTotal(){
		var sum=0;
		$(".check-one").each(function(){
			if(this.checked){
				var subTotal=$(this).parent().siblings('.count').find('.count-input').val();
				sum=sum+parseInt(subTotal);
				$("#selectTotal").text(sum);
			}else{
				sum=sum;
				$("#selectTotal").text(sum);
			}
		})
	}
	selectTotal();	
	//总计价格
	function priceTotal(){
		var sum=0;
		$(".check-one").each(function(){
			if(this.checked){
				var subPrice=$(this).parent().siblings('.subTotal').text();
				sum=sum+parseInt(subPrice);
				$(".priceTotal").text(sum);
			}else{
				sum=sum;
				$(".priceTotal").text(sum);
			}
		})
	}
	priceTotal();	
});
