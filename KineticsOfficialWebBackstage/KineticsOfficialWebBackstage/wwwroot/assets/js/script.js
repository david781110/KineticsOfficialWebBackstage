/*--另開視窗------------------------------------------------------------------------------------------*/
function MM_openBrWindow(theURL,winName,features) {
window.open(theURL,winName,features);
}
/*--跳出訊息------------------------------------------------------------------------------------------*/
function MM_popupMsg(msg) { //v1.0
  alert(msg);
}
/*--帶參數轉向用------------------------------------------------------------------------------------------*/

function GotoPage(tPage,theForm){
	theForm.Page.value=tPage;
	theForm.submit();
}

function trim(stringToTrim)
{
    if(stringToTrim.length>0){
        return stringToTrim.replace(/^\s+|\s+$/g,"");
    }
}

function left(str, num)
{
    return str.substring(0,num)
}

function right(str, num)
{
    return str.substring(str.length-num,str.length)
}

function leftField(str,delimit)
{
    var returnValue=str;
    var indexNumber=str.indexOf(delimit);
    if(indexNumber>=0){
        returnValue = str.substring(0,str.indexOf(delimit))
    }
    return returnValue;
}

function rightField(str,delimit)
{
    var returnValue=str;
    var indexNumber=str.indexOf(delimit);
    if(indexNumber>=0){
        returnValue = str.substring(indexNumber+delimit.length,str.length)
    }
    return returnValue;
}

//產生3位數的逗號分隔
function addCommas(nStr)
{
	nStr += '';
	x = nStr.split('.');
	x1 = x[0];
	x2 = x.length > 1 ? '.' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + ',' + '$2');
	}
	return x1 + x2;
}

function GetCheckedValue(checkBoxName)
{
   return $('input:checkbox[name=' + checkBoxName + '][checked=true]').map(function ()
   {
	 return $(this).val();
   })
   .get().join(',');
}

//E-Mail驗證
function isEmail(email){
	var reg = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})+$/i;	
	if (reg.test(email)){
		return true;
	}else{
		return false;
	}
}

function Update(strLink,PKey,is_copy){
    document.form1.PKey.value=PKey;
	document.form1.is_copy.value=is_copy;
    document.form1.action= strLink;
    document.form1.submit();
}

function Update2(strLink,PKey){
    document.class_form.Product_PKey.value=PKey;
    document.class_form.action= strLink;
    document.class_form.submit();
}	
/*--------------gotop-------------------*/
$(document).ready(function(){
	//Check to see if the window is top if not then display button
	$(window).scroll(function(){
		if ($(this).scrollTop() > 500) {
			$('#goTop').fadeIn();
		} else {
			$('#goTop').fadeOut();
		}
	});
	//Click event to scroll to top
	$('#goTop').click(function(){
		$('html, body').animate({scrollTop : 0},500);
		return false;
	});
});

//表頭
$(document).ready(function(){
	$(window).scroll(function(){
		if ($(this).scrollTop() > 0) {
			$('.header-top').addClass('change');
		} else {
			$('.header-top.change').removeClass('change');
		}
	});
});

//-------RWD側邊選單--------
 if ($(window).width() < 750 && $('.sidebar .collapse').hasClass('in')) {
	  $('#sidenav').collapse('hide');
  }
  $(window).resize(function () {
	  if ($(window).width() >= 750 && !$('.sidebar .collapse').hasClass('in')) {
		  $('#sidenav').collapse('show');
	  } else if ($(window).width() < 750 && $('.sidebar .collapse').hasClass('in')) {
		  $('#sidenav').collapse('hide');
	  }
  });
  
//-------drapdown-------------------//
$(document).ready(function() {

	$(".search").click(function(e) {          
		e.preventDefault();
		$("#search-form").toggle();
		$(".search").toggleClass("active");
	});
	
	$("#search-form").mouseup(function() {
		return false
	});
	$(document).mouseup(function(e) {
		if($(e.target).parent("a.search").length==0) {
			$(".search").removeClass("active");
			$("#search-form").hide();
		}
	});
});
//-------end drapdown-------------------//

//檢查台式身份證
/*
英文代號 - X 
       A=10  台北市       J=18 新竹縣         S=26  高雄縣
       B=11  台中市       K=19 苗栗縣         T=27  屏東縣
       C=12  基隆市       L=20 台中縣         U=28  花蓮縣
       D=13  台南市       M=21 南投縣         V=29  台東縣
       E=14  高雄市       N=22 彰化縣         W=32  金門縣
       F=15  台北縣       O=35 新竹市         X=30  澎湖縣
       G=16  宜蘭縣       P=23 雲林縣         Y=31  陽明山
       H=17  桃園縣       Q=24 嘉義縣         Z=33  連江縣
       I=34  嘉義市       R=25 台南縣

性別 - D1
1 - 男性 
2 - 女性 

Y = X1 + 9*X2 + 8*D1 + 7*D2 + 6*D3 + 5*D4 + 4*D5 + 3*D6 + 2*D7+ 1*D8 + D9 
如 Y 能被 10 整除，則表示該身分證號碼為正確，否則為錯誤。 
*/
function checkID(PID){
	re = /^[ABCDEFGHJKLMNPQRSTUVXYWZIO]{1}[12]{1}\d{8}$/i;
	
	//開頭字母
	var pattens = new Array("A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z");
	//轉換的對照數字
	var tables = new Array(10,11,12,13,14,15,16,17,34,18,19,20,21,22,35,23,24,25,26,27,28,29,32,30,31,33); 
	//form值
	var formStr = PID;
	//document.write("formStr= " + formStr + "<br>");
	
	//計算開頭字母的值: 十位數字 + 個位數字*9
	var firChar = formStr.substr(0,1);
	var firCharNum = 0;
	var firCharValue = 0;
	//document.write("firChar= " + firChar + "<br>");
	
	for (var i=0;i<=25;i++){
		if (pattens[i] == firChar){
			firCharNum = tables[i];
			break;
		}
	}
	//document.write("firCharNum= " + firCharNum + "<br>");
	
	firCharValue = parseInt(firCharNum.toString().substr(0,1)) + parseInt(firCharNum.toString().substr(1,2))*9;
	
	//document.write(parseInt(firCharNum.toString().substr(0,1)) + "<br>");
	//document.write(parseInt(firCharNum.toString().substr(1,2)) + "<br>");
	
	//document.write("firCharValue= " + firCharValue + "<br>");
	
	//計算性別的值
	var SexValue = parseInt(formStr.substr(1,1))*8;
	//document.write("SexValue= " + SexValue + "<br>");
	
	//計算後七碼的值
	var numCount = 0;
	for (var i=2;i<=8;i++){
		numCount += parseInt(formStr.substr(i,1))*(9-i);
		//document.write(formStr.substr(i,1) + " * " + (9-i) + " = " + (parseInt(formStr.substr(i,1))*(9-i)) + "<br>");
	}
	//document.write("numCount= " + numCount + "<br>");
	
	//計算檢查碼的值
	var lastChar = formStr.substr(formStr.length-1,1);
	//document.write("lastChar= " + lastChar + "<br>");
	var chkNum = 10 - ((firCharValue + SexValue + numCount)%10);
	if (chkNum == 10) chkNum = 0;
	//document.write("chkNum= " + chkNum + "<br>");
	
	//判斷是否正確
	var isTrue = "0";
	var totalValue = firCharValue + SexValue + numCount + parseInt(lastChar);
	//document.write("totalValue= " + totalValue + "<br>");
	if (parseInt(lastChar) == chkNum && totalValue%10 == 0) isTrue = "1";
	//document.write("isTrue= " + isTrue + "<br>");
	//document.write(typeof isTrue + "<br>");
	//document.write(re.test(formStr) + "<br>");
	//document.write(isTrue == 1 + "<br>");
	//document.write(isTrue == '1' + "<br>");

	if (re.test(formStr) && isTrue == "1" && formStr != "A123456789"){
		return true
	}else{
		return false
	}
	
}

//檢查居留證
function chkPassport(idNumber)
{
	studIdNumber = idNumber.toUpperCase();
	//驗證填入身分證字號長度及格式
	if(studIdNumber.length != 10){
		return false;
	}
	//格式，用正則表示式比對第一個字母是否為英文字母
	if(isNaN(studIdNumber.substr(2,8)) || 
		(!/^[A-Z]$/.test(studIdNumber.substr(0,1))) || (!/^[A-Z]$/.test(studIdNumber.substr(1,1)))){
		return false;
	}
	
	var idHeader = "ABCDEFGHJKLMNPQRSTUVXYWZIO"; //按照轉換後權數的大小進行排序
	//這邊把身分證字號轉換成準備要對應的
	studIdNumber = (idHeader.indexOf(studIdNumber.substring(0,1))+10) + 
	'' + ((idHeader.indexOf(studIdNumber.substr(1,1))+10) % 10) + '' + studIdNumber.substr(2,8);
	//開始進行身分證數字的相乘與累加，依照順序乘上1987654321

	s = parseInt(studIdNumber.substr(0,1)) + 
	parseInt(studIdNumber.substr(1,1)) * 9 + 
	parseInt(studIdNumber.substr(2,1)) * 8 + 
	parseInt(studIdNumber.substr(3,1)) * 7 + 			
	parseInt(studIdNumber.substr(4,1)) * 6 + 
	parseInt(studIdNumber.substr(5,1)) * 5 + 
	parseInt(studIdNumber.substr(6,1)) * 4 + 
	parseInt(studIdNumber.substr(7,1)) * 3 + 
	parseInt(studIdNumber.substr(8,1)) * 2 + 
	parseInt(studIdNumber.substr(9,1));

	//檢查號碼 = 10 - 相乘後個位數相加總和之尾數。
	checkNum = parseInt(studIdNumber.substr(10,1));
	//模數 - 總和/模數(10)之餘數若等於第九碼的檢查碼，則驗證成功
	///若餘數為0，檢查碼就是0
	if((s % 10) == 0 || (10 - s % 10) == checkNum){
		return true;
	}
	else{
		return false;
	}
}

//文字方塊轉換成大小寫
$(function(){
   $(".upper").keyup(function(evt){
	  var vOri=$(this).val();
	  var vNew=vOri.toUpperCase();
	  $(this).val(vNew);
   });

   $(".lower").keyup(function(evt){
	  var vOri=$(this).val();
	  var vNew=vOri.toLowerCase();
	  $(this).val(vNew);
   });
});
   
function input_strtoupper(inputObj,e)
{
	var keynum,keychar,numcheck ;
	if(window.event) // IE
	{
		keynum = e.keyCode
	}
	else if(e.which) // Netscape/Firefox/Opera
	{
		keynum = e.which
	}
	keychar = String.fromCharCode(keynum)
	//alert(keychar);
	var lowerk=keychar.toLowerCase();

	numcheck = /[a-z]/;
	if(numcheck.test(inputObj.value))
	{
		start=Math.abs(inputObj.value.indexOf(lowerk))+1; //算出字串位置
		//var End=inputObj.selectionEnd;

		inputObj.value=inputObj.value.toUpperCase();
		if(navigator.appName=='Microsoft Internet Explorer')
		{
			var r =inputObj.createTextRange();
			//alert(inputObj);
			r.moveStart("character",start); //IE要游標出現的字串位置
			r.collapse(true);
			r.select();
		}
		else
		{
			inputObj.selectionStart=start; //FF要游標出現的字串位置
				inputObj.selectionEnd=start;
		}
	}
	//alert(e.which);
} 
// 課程收藏
/*$('.collect').on("click",function(){
   $(this).toggleClass('want')
});*/

// 字數點點
$(function(){
    var len = 20; // 超過50個字以"..."取代
    $(".noticText p").each(function(i){
        if($(this).text().length>len){
            $(this).attr("title",$(this).text());
            var text=$(this).text().substring(0,len-1)+"...";
            $(this).text(text);
        }
    });
});
// 頭貼線條

$(document).ready(function(){
	$("img[src*='icon-mem']").parent('.memberBtn_pic').addClass('bornone');
});
// 下拉選單效果
$('.navR-item').on("click",function(){
	$(this).next('.headerdrop').toggleClass('open')
	$(this).parent().siblings().children('.headerdrop').removeClass('open')
	$(this).toggleClass('active')
	$(this).parent().siblings().children('.navR-item').removeClass('active')
});

// 三個點點呼叫更多選項
$('.editC').on("click",function(){
	$(this).next().toggleClass('show')
});

$(document).mouseup(function (e) {
    var container =$(".editComment"); // 這邊放你想要排除的區塊
    if (!container.is(e.target) && container.has(e.target).length === 0) {
		container.children('ul').removeClass('show'); 
    }
});


//除指定區域外點擊任何地方隱藏
$(document).mouseup(function (e) {
    var container =$(".jqtarget"); // 這邊放你想要排除的區塊
    if (!container.is(e.target) && container.has(e.target).length === 0) {
       container.children('.searchRule').removeClass('open'); 
	   container.children('.headerdrop').removeClass('open'); 
	   container.children('.navR-item').removeClass('active'); 
	   container.children('.keysearch').slideToggle(); 
	//    container.children('.shareBox').removeClass('showPop'); 
	   //$('#lan').removeClass('open');
    }
});

//header關鍵字
$(document).ready(function(){
	$(".searchBtn").click(function(){
		$(".keysearch").slideToggle();
		// $("body").toggleClass('zindex');
		$("body").toggleClass('searchMask zindex');
	});
});
$(document).ready(function(){
	$(".jqtarget").click(function(){
		$(".keysearch").slideUp();
	});
});	

// 選單響應式切換
$(document).ready(function(){
	$(".navbar-toggler").click(function(){
		$('.unlogin').toggle();
		$(this).toggleClass('open').next(".collapse").toggleClass('show');
		$("body").toggleClass('rwdshowMask');

	});
	
});

//除指定區域外點擊任何地方隱藏
$(document).mouseup(function (e) {
    var container =$(".navbar"); // 這邊放你想要排除的區塊
    if (!container.is(e.target) && container.has(e.target).length === 0) {
	   container.children('.keysearch').slideUp(); 
	   container.parents('body').removeClass('searchMask');
    }
});


// 文章字數點點
$(function(){
    var len = 40; // 超過40個字以"..."取代
    $(".article-content").each(function(i){
        if($(this).text().length>len){
            $(this).attr("title",$(this).text());
            var text=$(this).text().substring(0,len-1)+"...";
            $(this).text(text);
        }
    });
});

// 我的檔案工具點點
$(document).ready(function(){
	$(".memCard-mulp").click(function(){
		$(".memCard-tool-box").toggle();
	
	});
});
//除指定區域外點擊任何地方隱藏
$(document).mouseup(function (e) {
    var container =$(".memCard-tool-page"); 
    if (!container.is(e.target) && container.has(e.target).length === 0) {
	   container.children(".memCard-tool-box").hide(); 
    }
});
//文章頁籤
$(".myclasssee").click(function(){
	$('.menu2').addClass('active').parent().siblings().children().removeClass('active');
	$('#menu2').addClass('active show').siblings('.active.show').removeClass('active show');
	$('html, body').animate({
		scrollTop: $('#menu2').offset().top - 115
	}, 1000);
});
//文章頁籤
$(".myarticlesee").click(function(){
	$('.menu3').addClass('active').parent().siblings().children().removeClass('active');
	$('#menu3').addClass('active show').siblings('.active.show').removeClass('active show');
	$('html, body').animate({
		scrollTop: $('#menu3').offset().top - 115
	}, 1000);
});
//作品頁籤
$(".myworksee").click(function(){
	$('.menu4').addClass('active').parent().siblings().children().removeClass('active');
	$('#menu4').addClass('active show').siblings('.active.show').removeClass('active show');
	$('html, body').animate({
		scrollTop: $('#menu4').offset().top - 115
	}, 1000);
});

// 社群分享鈕pop
$(document).ready(function(){
	$(".shareIcon").click(function(){
		$(".shareBox").toggleClass('showPop');
		$("body").toggleClass('showMask');
	});
	$(".shareBox .bi-x").click(function(){
		$(".shareBox").removeClass('showPop');
		$("body").removeClass('showMask');
	});
});

// 錯誤回報鈕pop
$(document).ready(function(){
	$(".errorIcon").click(function(){
		$(".errorBox").toggleClass('showPop');
		$("body").toggleClass('showMask');
	});
	$(".errorBox .bi-x").click(function(){
		$(".errorBox").removeClass('showPop');
		$("body").removeClass('showMask');
	});
	$(".errorBox .nostyle").click(function(){
		$(".errorBox").removeClass('showPop');
		$("body").removeClass('showMask');
	});
});

// 檢舉鈕pop
$(document).ready(function(){
	$(".talkflag").click(function(){
		$(".reportBox").toggleClass('showPop');
		$("body").toggleClass('showMask');
	});
	$(".reportBox .bi-x").click(function(){
		$(".reportBox").removeClass('showPop');
		$("body").removeClass('showMask');
	});
	$(".reportBox .nostyle").click(function(){
		$(".reportBox").removeClass('showPop');
		$("body").removeClass('showMask');
	});
});

// 我關注的用戶pop
$(document).ready(function(){
	$(".myfallow").click(function(){
		$(".fallowing_box").addClass('showPop');
		$("body").toggleClass('showMask');
	});
	$(".fallowing_box .bi-x").click(function(){
		$(".fallowing_box").removeClass('showPop');
		$("body").removeClass('showMask');

	});
});

//我的粉絲pop
$(document).ready(function(){
	$(".myfans").click(function(){
		$(".fallower_box").addClass('showPop');
		$("body").toggleClass('showMask');
	});
	$(".fallower_box .bi-x").click(function(){
		$(".fallower_box").removeClass('showPop');
		$("body").removeClass('showMask');

	});
});

//除指定區域外點擊任何地方隱藏
$(document).mouseup(function (e) {
    var container =$(".popBox"); // 這邊放你想要排除的區塊
    if (!container.is(e.target) && container.has(e.target).length === 0) {
	   container.removeClass('showPop'); 
	   container.parents('body').removeClass('showMask');
	   
    }
});


//成為講師pop
// $(document).ready(function(){
// 	$(".memberBar-be-teacher").click(function(){
// 		$(".teacherBox").addClass('showPop');
// 		$("body").toggleClass('showMask');
// 	});
// 	$(".teacherBox .bi-x").click(function(){
// 		$(".teacherBox").removeClass('showPop');
// 		$("body").removeClass('showMask');

// 	});
// });

//文章圖文顯示切換
$(document).ready(function(){
	$(".textShow").click(function(){
		$(this).hide().siblings().show();
		$(this).parent().parent().next('.my-class').children('.article-item').removeClass('onlyText');
	});
	$(".picShow").click(function(){
		$(this).hide().siblings().show();
		$(this).parent().parent().next('.my-class').children('.article-item').toggleClass('onlyText');
	});
});

//文章圖文顯示切換
function launch_toast() {
    var x = document.getElementById("toast")
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 2000);
}


//隱私權政策pop
$(document).ready(function(){
	$(".privacyBtn").click(function(){
		$(".privacyBox").addClass('showPop');
		$("body").toggleClass('showMask');
	});
	$(".privacyBox .bi-x").click(function(){
		$(".privacyBox").removeClass('showPop');
		$("body").removeClass('showMask');
	});
	$('.privacyBox .sureBtn').click(function(){
		$(".privacyBox").removeClass('showPop');
		$("body").removeClass('showMask')
	});
});

//會員權益pop
$(document).ready(function(){
	$(".memrightBtn").click(function(){
		$(".memrightBox").addClass('showPop');
		$("body").toggleClass('showMask');
	});
	$(".memrightBox .bi-x").click(function(){
		$(".memrightBox").removeClass('showPop');
		$("body").removeClass('showMask')
	});
	$('.memrightBox .sureBtn').click(function(){
		$(".memrightBox").removeClass('showPop');
		$("body").removeClass('showMask')
	});
});

// 優惠券使用規則
$(document).ready(function(){
	$(".coupon-rule").click(function(){
		$(this).next('.coupon-rule-box').toggleClass('showPop');
		$("body").toggleClass('showMask');
	});
	$(".coupon-rule-box .bi-x").click(function(){
		$(".coupon-rule-box").removeClass('showPop');
		$("body").removeClass('showMask');
	});
});

//課程輪播
$('.cart-likeClass').owlCarousel({
	autoplay:false,
	loop:false,
	margin: 12,
	nav:true,
	dots:false,
	responsive:{
		320:{
			center: true,
			items:1,
			stagePadding: 50,
			// loop:false,
		},
		575:{
			items:2,
		},
		768:{
			items:2,
		},
		991:{
			items:3,
		},
		1200:{
			items:4,
		}
	}
})

//首頁給客戶輪播
$('.index-admin-owl').owlCarousel({
	autoplay:false,
	loop:true,
	margin: 12,
	items:1,
	nav:true,
	dots:false
});

//操作備註
$(document).ready(function(){
	$(".manage-note").hover(function(){
		$(this).next('.manage-note-txt').toggleClass('show');
	});
});

//manage-課程異動pop
$(document).ready(function(){
	$(".classchangebtn").click(function(){
		$(".classchange").addClass('showPop');
		$("body").toggleClass('showMask');
	});
	$(".classchange .bi-x").click(function(){
		$(".classchange").removeClass('showPop');
		$("body").removeClass('showMask');
		$("#apply_msg_PKey").val('');
	});
	$(".classchange .nostyle").click(function(){
		$(".classchange").removeClass('showPop');
		$("body").removeClass('showMask');
		$("#apply_msg_PKey").val('');
	});
});

//教材上傳
$(document).ready(function(){
	$(".updateBtn").click(function(){
		$(".updateBox").addClass('showPop');
		$("body").toggleClass('showMask');
	});
	$(".updateBox .bi-x").click(function(){
		$(".updateBox").removeClass('showPop');
		$("body").removeClass('showMask');
		$("#unit_PKey").val('');
		$("#prefile1").text("選擇檔案");
		$("#Send").val("");
	});
	$(".updateBox .nostyle").click(function(){
		$(".updateBox").removeClass('showPop');
		$("body").removeClass('showMask');
		$("#unit_PKey").val('');
		$("#prefile1").text("選擇檔案");
		$("#Send").val("");
	});
});

//991px手機板會員專區選單
var mbSize = innerWidth;
if (mbSize <= 991) {
	$(".memberBar-nav").addClass('memberNav');
	$(".memberBar-nav li").filter(".active").children('a').attr("href","javascript:void(0)");
	$(".memberBar-nav li.active").click(function(){
		$(".memberBar-nav").toggleClass("memberNav");
	});
}

//manage-課程頁籤字數點點

$(function(){
    var len = 25;
    $(".class-manage-tcount").each(function(i){
        if($(this).text().length>len){
            $(this).attr("title",$(this).text());
            var text=$(this).text().substring(0,len-1)+"...";
            $(this).text(text);
        }
    });
});

//網上move效果
$('.moveUp').css({'opacity':'0', 'transform': 'translateY(' + 2 + 'em)'});

// Trigger fade in as window scrolls
$(window).on('scroll load', function(){
  $('.moveUp').each( function(i){
    var bottom_of_object = $(this).offset().top + $(this).outerHeight()/8;
    var bottom_of_window = $(window).scrollTop() + $(window).height();
    if( bottom_of_window > bottom_of_object ){  
      $(this).css({'opacity':'1', 'transform': 'translateY(' + 0 + 'em)'});        
    } else {
      $(this).css({'opacity':'0', 'transform': 'translateY(' + 2 + 'em)'});
    }
  });
});

//影片撥放狀態確認
$(".chapter-inner").find('.watching').removeClass('watched');

function setCheckedValue(radioObj, newValue) {
	if(!radioObj)
		return;
	var radioLength = radioObj.length;
	if(radioLength == undefined) {
		radioObj.checked = (radioObj.value == newValue.toString());
		return;
	}
	for(var i = 0; i < radioLength; i++) {
		radioObj[i].checked = false;
		if(radioObj[i].value == newValue.toString()) {
			radioObj[i].checked = true;
		}
	}
}



