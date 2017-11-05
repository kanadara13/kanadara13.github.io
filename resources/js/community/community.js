/**
 *  
 */

function validateAdd(){
	
	var rst = "";
	
	var name = $("[name=REGISTER]").val();
	var enc	 = $("[name=REGISTER_ENC]").val();
	var re_enc = $("[name=REGISTER_CHECK]").val();
	var comment = $("[name=CONTENTS]").val();
	var TITLE   = $("[name=TITLE]").val();
	
	if (name == ""){
		rst = "이름을 입력하세요";
	}
	if (enc == ""){
		rst = "비밀번호를 입력하세요";
	}
	
	if (enc.length < 4){
		rst = "비밀번호 4 자리 이상 입력하세요";
	}
	
	if (TITLE == ""){
		rst = "제목을 입력하세요";
	}
	if (comment == ""){
		rst = "내용을 입력하세요";
	}
	if (enc != re_enc){
		rst = "비밀번호가 일치 하지 않습니다";
	}
	
	return rst;
}

function addNewProc(){
	
	var rst = validateAdd();
	
	if (rst == ""){
		 $("[name=REGISTER_ENC]").val(SHA256($("[name=REGISTER_ENC]").val()));
		$("#add-form").submit();	
	}else{
		alert(rst);
	}
	
}


function onclickView(){
	  $("[name=REGISTER_ENC]").val(SHA256($("[name=REGISTER_ENC]").val()));
	  $("#next-frm").submit();
}

//댓글 등록 유효성 검사 
function validatePost(){
	
	var rst = "";
	
	var name = $("[name=REGISTER]").val();
	var enc	 = $("[name=REGISTER_ENC]").val();
	var comment = $("[name=COMMENT]").val();
	
	if (name == ""){
		rst = "이름을 입력하세요";
	}
	if (enc == ""){
		rst = "비밀번호를 입력하세요";
	}
	if (enc.length < 4){
		rst = "비밀번호 4 자리 이상 입력하세요";
	}
	if (comment == ""){
		rst = "내용을 입력하세요";
	}
	
	return rst;
}

//댓글 등록
function postComment(BOARD_ID){
	var txt = validatePost();
	if (txt == ""){
		var param = [];
		var name = $("[name=REGISTER]").val();
		var enc	 = $("[name=REGISTER_ENC]").val();
		enc = SHA256(enc);
		var comment = $("[name=COMMENT]").val();
		
		param.push("REGISTER=" + name);
		param.push("REGISTER_ENC=" + enc);
		param.push("COMMENT=" + comment);
		param.push("BOARD_ID=" + BOARD_ID);
		var rst = CommonAjax('/community/post/',param);
		if (rst == ""){
			$(".replay").remove();
			var list = CommonAjax('/community/post/list',param);
			var html = getPostHtml(list);
			$("#reply").html(html);
		}
	}else{
		alert(txt);
	}		
}

function getPostHtml(list){

	var html = [];
	
	for (var i=0; i <list.length; i++){
		html.push('<div class="replay" id="post-text-view-'+list[i].POST_ID+'">');
		html.push('<div class="name">');
		html.push('<strong>'+ list[i].REGISTER+'</strong>'+ list[i].REGISTER_DATE);
		html.push('	</div>');
		html.push('	<div class="btn_replay">');
		html.push('	<ul>');
		html.push('<li><a href="#view" class="link_pop" onclick=postEvent("postMod","'+list[i].POST_ID+'")>수정</a></li>');
		html.push('<li><a href="#view" class="link_pop" onclick=postEvent("postDel","'+list[i].POST_ID+'")>삭제</a></li>');
		html.push('</ul>');
		html.push('	</div>');
		html.push('	<pre>' + list[i].COMMENT +'</pre>');
		html.push('	</div>');
		html.push('	<div class="replay" id="post-text-mod-'+list[i].POST_ID+'" style="display:none">');
		html.push('<div class="name">');
		html.push('<strong>'+ list[i].REGISTER+'</strong>'+ list[i].REGISTER_DATE);
		html.push('	</div>');
		html.push('<textarea class="txt_int" name="POST_CONTENTS_'+list[i].POST_ID+'">'+list[i].COMMENT+'</textarea>');
		html.push('<div class="btn_area02">');		
		html.push('<a href="#" class="btn_c" onclick=postCacnel(\''+list[i].POST_ID+'\');>취소</a>&nbsp;');		
		html.push('<a href="#" class="btn_d" onclick=postModEvent(\''+list[i].POST_ID+'\');>확인</a>');		
		html.push('	</div>');			
		html.push('	</div>');			
	}

	return html.join("");
}


//팝업취소
function postCacnel(post){
	$("#post-text-mod-"+post).hide();
	$("#post-text-view-"+post).show();
}

//댓글 수정
function postModEvent(post){
	$("#post-text-mod-"+post).hide();
	$("#post-text-view-"+post).show();
	var  BOARD_ID= $("[name=BOARD_ID]").val();
	var text = $("[name=POST_CONTENTS_"+post+"]").val();
	var paramPost = [];
	paramPost.push("POST_ID=" + post);
	paramPost.push("POST_CONTENTS=" + text);
	paramPost.push("BOARD_ID=" + BOARD_ID);
	var rtn = CommonAjax("/community/post/mod/", paramPost);
	if (rtn == ""){
		$(".replay").remove();
		var list = CommonAjax('/community/post/list',paramPost);
		var html = getPostHtml(list);
		$("#reply").html(html);
	}else{
		alert("댓글 수정에 실패했습니다");
	}
}

//댓글 팝업창 호출
function postEvent(mode,post){
	$("#p_confirm")
	.css("top","15%")
	.css("left","33%")
	.show()
	$("[id=REGISTER_ENC_BOTTOM]").focus();
	$("[name=MODE]").val(mode);
	$("[name=POST_ID]").val(post);
}

//하단팝업 공통 처리
function pageEvent(mode){
	$("#p_confirm")
	.css("top","15%")
	.css("left","33%")
	.show()
	$("[id=REGISTER_ENC_BOTTOM]").focus();
	$("[name=MODE]").val(mode);
}


function nextPage(){
	
	var boardId = $("[name=BOARD_ID]").val();
	
	var mode	= $("[name=MODE]").val();
	
	var BOARD_URL_CODE = $("[name=BOARD_URL_CODE]").val();

	
	$("#bottom-form").prop("action","/community/"+BOARD_URL_CODE+"/"+mode+"/"+boardId);
	$("#bottom-form").submit();
}


function nextPageProc(){
	
	var boardId = $("[name=BOARD_ID]").val();
	
	var page  	= $("[name=currentPage]").val();
	
	var mode	= $("[name=MODE]").val();
	
	var enc		= $("[id=REGISTER_ENC_BOTTOM]").val();
	
	var postId	= $("[name=POST_ID]").val();
	
	var BOARD_URL_CODE = $("[name=BOARD_URL_CODE]").val();
	
	if ((mode != 'postMod')&&(mode != 'postDel')){
		if (enc == ""){
			alert("비밀번호를 입력해 주세요");
			return false;
		}else{
			
			var param = [];
			param.push("REGISTER_ENC=" + SHA256(enc));
			param.push("BOARD_ID=" + boardId);
			var rtn = CommonAjax("/community/view/auth/", param);
			if (rtn == "SUCCESS"){
				$("#bottom-form").prop("action","/community/"+BOARD_URL_CODE+"/"+mode+"/"+boardId);
				$("[id=REGISTER_ENC_BOTTOM]").val(SHA256($("[id=REGISTER_ENC_BOTTOM]").val()));
				return true;
			}else{
				alert("비밀번호가 맞지 않습니다");
				return false;
			}
			
		}
	}else{
		var param = [];
		param.push("REGISTER_ENC=" + SHA256(enc));
		param.push("POST_ID=" + postId);
		var rtn = CommonAjax("/community/post/auth/", param);
		if (rtn == "SUCCESS"){
			$("#p_confirm").hide();
			if (mode == "postMod"){
				$("#post-text-mod-"+postId).show();
				$("#post-text-view-"+postId).hide();
			}else{
				var paramDel = [];
				paramDel.push("POST_ID=" + postId);
				paramDel.push("BOARD_ID=" + boardId);
				var rtn = CommonAjax("/community/post/del/", paramDel);
				if (rtn == ""){
					$(".replay").remove();
					var list = CommonAjax('/community/post/list',paramDel);
					var html = getPostHtml(list);
					$("#reply").html(html);
				}else{
					alert("댓글 삭제에 실패했습니다");
				}				
			}
			return false;
		}else{
			alert("비밀번호가 맞지 않습니다");
			return false;
		}
	}
}


function validateMod(){
	
	var rst = "";
	
	var name = $("[name=REGISTER]").val();
	var enc	 = $("[name=REGISTER_ENC]").val();
	var re_enc = $("[name=REGISTER_CHECK]").val();
	var comment = $("[name=COMMENT]").val();
	
	if (name == ""){
		rst = "이름을 입력하세요";
	}
	if (enc == ""){
		rst = "비밀번호를 입력하세요";
	}
	if (enc.length < 4){
		rst = "비밀번호 4 자리 이상 입력하세요";
	}
	if (comment == ""){
		rst = "내용을 입력하세요";
	}
	
	if (enc != re_enc){
		rst = "비밀번호가 일치 하지 않습니다";
	}
	
	return rst;
}

function communityModProc(){
	var rtn = validateMod();
	if ("" == rtn){
		$("[name=REGISTER_ENC]").val(SHA256($("[name=REGISTER_ENC]").val()));
		$("#add-form").submit();
	}else{
		alert(rtn);
	}
}

//Partnership ---------------------------------------------------------------------------------------------------------------
function addNewProcPartnership(){

	var REGISTER = $("[name=REGISTER]").val();
	
	var TITLE = $("[name=TITLE]").val();
	
	var CONTENTS =  $("[name=CONTENTS]").val();
	
	var EMAIL1  = $("[name=EMAIL1]").val();
	var EMAIL2  = $("[name=EMAIL2]").val();
	
	var BOARD_URL_CODE = $("[name=BOARD_URL_CODE]").val();
	
	if (REGISTER == ""){
		alert("이름을 입력해주세요");
		return false;
	}
	
	if (EMAIL1 != ""){
		if (EMAIL2 == "") {
			alert("이메일을 입력해주세요");
			return false;
		}
	}
	if (EMAIL2 !=""){
		if (EMAIL1 == ""){
			alert("이메일을 입력해주세요");
			return false;
		}
	}
	
	if (TITLE == ""){
		alert("제목을 입력해주세요");
		return false;
	}if (CONTENTS == ""){
		alert("내용을 입력해주세요");
		return false;
	}
	
	if($("[name=agreePrivate]").is(":checked")){
		$("#modal_pop").modal();
		var next_frm = $("#add-form");
		hidden_add(next_frm,"BOARD_URL_CODE",BOARD_URL_CODE);
		$('#add-form').submit();	
	}else{
		alert("개인정보 수집 및 이용 동의를 하셔야 문의 가능합니다.")
	}
}

function reset(){
	$('#add-form').each(function() {  
         this.reset();  
     });  
}
//Partnership ---------------------------------------------------------------------------------------------------------------

//List ----------------------------------------------------------------------------------------------------------------------

function nextPageProcList(boardId, register){
	$("#p_confirm")
	.css("top","15%")
	.css("left","33%")
	.show()
	$("[name=BOARD_ID]").val(boardId);
	$("[name=REGISTER]").val(register);
	$("[name=REGISTER_ENC]").focus();
}

function nextPageList(){
	
	var BOARD_ID = $("[name=BOARD_ID]").val();
	var PAGE	 = $("[name=currentPage]").val();
	var REGISTER_ENC = $("[name=REGISTER_ENC]").val();
	var BOARD_URL_CODE = $("[name=BOARD_URL_CODE]").val();

	REGISTER_ENC = SHA256(REGISTER_ENC);
	
	var REGISTER	= $("[name=REGISTER]").val();
	var param = [];
	if (REGISTER_ENC == ""){
		alert("비밀번호를 입력해주세요");
		return false;
	}
	param.push("REGISTER_ENC=" + REGISTER_ENC);
	param.push("BOARD_ID=" + BOARD_ID);
	
	var rtn = CommonAjax("/community/view/auth/", param);
	if (rtn == "SUCCESS"){
		var next_frm = $("[name='next_frm']");
		hidden_add(next_frm,"currentPage",PAGE);
		hidden_add(next_frm,"REGISTER_ENC",REGISTER_ENC);
		hidden_add(next_frm,"REGISTER",REGISTER);
		next("/community/"+BOARD_URL_CODE+"/view/"+BOARD_ID);
	}else{
		alert("비밀번호가 틀립니다");
	}
}
//List ----------------------------------------------------------------------------------------------------------------------
$(document).ready(function(){
	

	 $('.file-upload .text').val('');

	 $('.file-upload .file').change(function(){

		 var i = $(this).val();

		 $('.file-upload .text').val(i);

	 });
	 
	$("#btn_close").click(function(){
		
		$("[name=REGISTER_ENC]").val('');
		$("#p_confirm").hide();
	});
	
	$("#REGISTER_ENC_BOTTOM_MAIN").keydown(function(e){
		if (e.keyCode == 13){
			nextPageList();
		}
	});
	
	 $("[name=REGISTER_ENC]").val('');
	 $("[name=REGISTER_CHECK]").val('');
});