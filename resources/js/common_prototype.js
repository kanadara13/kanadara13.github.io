/*************************************************************/
/************************ 유효성 검사 ************************/
/** xxx@xxx.com or xxx@xxx.co.kr 등을 전달 받아 유효성 검사한다. **/
String.prototype.EMAIL = function() {
  if( this.trim() == "" )
  {
    alert("이메일 주소를 입력하세요");

    return false;
  }

  /** xxx@xxx.com, @ 없거나 1개 이상이면.. **/
  if( this.trim().match(/@/g) == null && this.trim().match(/@/g).length != 1 )
  {
    alert("정확한 이메일 주소를 입력하세요");

    if( arguments.length >= 1 ) arguments[0].focus();

    return false;
  }

  var email = this.trim().split("@");

  if( email[0].indexOf(".") > 0 )
  {
    alert("이메일 주소에 \.\ 을 사용하실 수 없습니다.");

    if( arguments.length == 1 ) arguments[0].focus();

    return false;
  }

  /** xxx.com, . 없거나 1개 이상이면.. **/
  if( email[1].match(/\./g) == null || email[1].match(/\./g).length == 0 || email[1].match(/\./g).length > 2 )
  {
    alert("이메일 주소를 정확히 입력하시기 바랍니다.");

    if( arguments.length == 1 ) arguments[0].focus();
    else if( arguments.length == 2 ) arguments[1].focus();

    return false;
  }

  if( email[0].trim().indexOf(" ") >= 0 )
  {
    alert("이메일 주소에 공백을 사용하실 수 없습니다.");

    if( arguments.length >= 1 ) arguments[0].focus();

    return false;
  }

  if( email[1].trim().indexOf(" ") >= 0 )
  {
    alert("이메일 주소에 공백을 사용하실 수 없습니다.");

    if( arguments.length == 1 ) arguments[0].focus();
    else if( arguments.length == 2 ) arguments[1].focus();

    return false;
  }

  return true;
};

/** xxx-xxxx-xxxx 를 전달 받아 유효성 검사한다. **/
String.prototype.HP = function() {
  if( this.trim() == "" )
  {
    alert("핸드폰 번호를 입력하세요");

    return false;
  }

  /** xxx-xxx-xxxx, - 없거나 2가 아니면..**/
  if( this.trim().match(/-/g) == null && this.trim().match(/-/g).length != 2 )
  {
    alert("정확한 핸드폰 번호를 입력하세요");

    if( arguments.length >= 1 ) arguments[0].focus();

    return false;
  }

  var hp = this.trim().split("-");

  if( hp[0].isNumber() == false )
  {
    alert("핸드폰 번호는 숫자만 가능합니다.");

    if( arguments.length >= 1 ) arguments[0].focus();

    return false;
  }

  if( hp[0].trim().indexOf(" ") >= 0 )
  {
    alert("핸드폰 번호에 공백을 사용하실 수 없습니다.");

    if( arguments.length >= 1 ) arguments[0].focus();

    return false;
  }

  if( hp[0].trim().length != 3)
  {
    alert("핸드폰 번호를 잘못 입력하셨습니다.");

    if( arguments.length >= 1 ) arguments[0].focus();

    return false;
  }

  if( hp[1].isNumber() == false )
  {
    alert("핸드폰 번호는 숫자만 가능합니다.");

    if( arguments.length == 1 ) arguments[0].focus();
    else if( arguments.length >= 2 ) arguments[1].focus();

    return false;
  }

  if( hp[1].trim().indexOf(" ") >= 0 )
  {
    alert("핸드폰 번호에 공백을 사용하실 수 없습니다.");

    if( arguments.length == 1 ) arguments[0].focus();
    else if( arguments.length >= 2 ) arguments[1].focus();

    return false;
  }

  if( hp[1].trim().length < 3 || hp[1].trim().length > 4 )
  {
    alert("핸드폰 번호를 잘못 입력하셨습니다.");

    if( arguments.length == 1 ) arguments[0].focus();
    else if( arguments.length >= 2 ) arguments[1].focus();

    return false;
  }

  if( hp[2].isNumber() == false )
  {
    alert("핸드폰 번호는 숫자만 가능합니다.");

    if( arguments.length == 1 ) arguments[0].focus();
    else if( arguments.length == 3 ) arguments[2].focus();

    return false;
  }

  if( hp[2].trim().indexOf(" ") >= 0 )
  {
    alert("핸드폰 번호에 공백을 사용하실 수 없습니다.");

    if( arguments.length == 1 ) arguments[0].focus();
    else if( arguments.length == 3 ) arguments[2].focus();

    return false;
  }

  if( hp[2].trim().length != 4)
  {
    alert("핸드폰 번호를 잘못 입력하셨습니다.");

    if( arguments.length == 1 ) arguments[0].focus();
    else if( arguments.length == 3 ) arguments[2].focus();

    return false;
  }

  return true;
};
/*************************************************************/

String.prototype.replaceAll = function(from, to)
{
  if( arguments.length != 2 ) return "";

    var returnStr = this;
    var tempStr = this.toLowerCase();
    var fromStr = from.toLowerCase();
    var count = fromStr.length;

    while( tempStr.indexOf( fromStr ) >= 0) {
        var word = returnStr.substr( tempStr.indexOf( fromStr), count);

        tempStr = tempStr.replace( from, to);
        returnStr = returnStr.replace( word, to);
    }

    return returnStr;
};

String.prototype.isNumber = function()
{
  if( this == undefined || this == "" ) return;

  var num = this;

  return !isNaN(parseFloat(num)) && isFinite(num);
};

String.prototype.ipos = function(needle, offset)
{
  if( arguments.length != 2 ) return "";

    var offset = (typeof offset == "number") ? offset : 0;

    return this.toLowerCase().indexOf(needle.toLowerCase(), offset);
};

String.prototype.timeObject = function()
{
  if( this == undefined || this == "" ) return;

    var time = this;

    if(time.ipos("-", 0) >= 0) { time = time.replace(eval("/\\"+"-"+"/g"), ""); }   /** yyyy-mm-dd hh:nn:ss 에서 - 제거 **/
    if(time.ipos(":", 0) >= 0) { time = time.replace(eval("/\\"+":"+"/g"), ""); }   /** yyyy-mm-dd hh:nn:ss 에서 : 제거 **/
    if(time.ipos(" ", 0) >= 0) { time = time.replace(eval("/\\"+" "+"/g"), ""); }   /** yyyy-mm-dd hh:nn:ss 에서 blank 제거 **/

    /** yyyymmddhhnnss **/
    var year  = time.substr(0, 4);
    var month = time.substr(4, 2);
    var day   = time.substr(6, 2);

    var hour  = 0;
    var minute = 0;
    var second = 0;

    if(time.length >= 10) hour = time.substr(8, 2);
    if(time.length >= 12) minute = time.substr(10, 2);
    if(time.length >= 14) second = time.substr(12, 2);

    return new Date(year, month - 1, day, hour, minute, second);
};

String.prototype.formatNumber = function()
{
  if( this == undefined || this == "" ) return 0;

    var num = this;

    if(!num) return num;

    if (parseInt(num, 10) <= 0) return num;

    num = parseInt(num, 10).formatNumber();

    return (((sign)?'':'-') + num);
};


/**
 * xxxx-xx-xx 포맷의 날짜 두개를 가지고 차이를 비교한다.
 * @param toDate    비교 대상 날짜
 * @param diffType d[일], h[시간], s[초]
 * @returns {Number}
 */
String.prototype.datediff = function(toDate, diffType)
{
  if( arguments.length != 2 ) return "";

  var fromDate = this;
  var diffValue = (toDate.timeObject() - fromDate.timeObject());

  if( diffType == "s" )
  {
      diffValue = diffValue / 1000;
  }
  else if( diffType == "h" )
  {
      diffValue = (diffValue / 1000) / 3600;
  }
  else if( diffType == "d" )
  {
      diffValue = (diffValue / 1000) / 86400;
  }

  return diffValue;
};

String.prototype.trim = function()
{
    return this.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
};


String.prototype.second2DateString = function()
{
  return parseInt(this, 10).second2DateString();
}

String.prototype.pad = function(length, padValue)
{
    if( arguments.length != 2 ) return "";

    var str = "" + this;

    while (str.length < length)
    {
      str = padValue + str;
    }

    return str;
}

/**
 * 주문 상태에 따른 명칭 변환(0:주문시도, 1:주문완료, 2:예약대기, 3:예약완료, 4:취소대기, 5:취소완료)
 */
String.prototype.toName = function() {
    if( this == "" ) return this;

    return parseInt(this, 10).toName();
}


/** Number **/
/**
 * 주문 상태에 따른 명칭 변환(0:주문시도, 1:주문완료, 2:예약대기, 3:예약완료, 4:취소대기, 5:취소완료)
 */
Number.prototype.toName = function() {
    var rtn = "";

    if( this == 0 ) rtn = "주문시도";
    else if( this == 1 ) rtn = "주문완료";
    else if( this == 2 ) rtn = "예약대기";
    else if( this == 3 ) rtn = "예약완료";
    else if( this == 4 ) rtn = "취소대기";
    else if( this == 5 ) rtn = "취소완료";

    return rtn;
}

Number.prototype.second2DateString = function()
{
  var v = this;
  var d = 0;
  var h = 0;
  var m = 0;
  var s = 0;
  var rtnValue = "";

  if ( v > (60*60*24) )
  {
    d = parseInt(v / (60*60*24), 10);
    v = v % (60*60*24);
  }

  h = parseInt((v / 3600), 10);
  temp = v % 3600;
  m = parseInt((temp / 60), 10);
  s = temp % 60;

  if( h > 0 )
  {
    rtnValue += padString(h) + ":";
  }
  else
  {
    rtnValue += "00:";
  }

  rtnValue += padString(m) + ":";
  rtnValue += padString(s) + "";

  return rtnValue;
}

Number.prototype.isNumber = function() {
  var num = this;

  return !isNaN(parseFloat(num)) && isFinite(num);
}

Number.prototype.pad = function(length, padValue) {
  var str = "" + this;

  return str.pad(length, padValue);

  return str;
}

Number.prototype.formatNumber = function() {
    var num = this;

    if( num == undefined || num == "" ) return 0;
    if(!num) return num;

    num = num.toString().replace(/\$|\,/g,'');

    if(isNaN(num)) num = "0";

    sign = (num == (num = Math.abs(num)));
    num = Math.floor(num*100+0.50000000001);
    cents = num%100;
    num = Math.floor(num/100).toString();
    if(cents<10) cents = "0" + cents;

    for (var i = 0; i < Math.floor((num.length-(1+i))/3); i++) {
        num = num.substring(0,num.length-(4*i+3))+','+ num.substring(num.length-(4*i+3));
    }

    return (((sign)?'':'-') + num);
}

Date.prototype.todayTimestamp = function() {
    var year = this.getFullYear();
    var month = this.getMonth() + 1;
    var day = this.getDate();
    var hour = "00";
    var minute = "00";
    var second = "00";

    month = month.pad(2, "0");
    day = day.pad(2, "0");

    return (year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second).timeObject().getTime();
};

Date.prototype.datediff = function(toDate, diffType)
{
  if( arguments.length != 2 ) return "";

  var year = this.getFullYear();
  var month = this.getMonth() + 1;
  var day = this.getDate();
  var hour = "00";
  var minute = "00";
  var second = "00";

  month = month.pad(2, "0");
  day = day.pad(2, "0");

  var fromDate = (year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second);
  var diffValue = (toDate.timeObject() - fromDate);

  if( diffType == "s" )
  {
      diffValue = diffValue / 1000;
  }
  else if( diffType == "h" )
  {
      diffValue = (diffValue / 1000) / 3600;
  }
  else if( diffType == "d" )
  {
      diffValue = (diffValue / 1000) / 86400;
  }

  return diffValue;
};



String.prototype.replaceExp = function(from, to) {
    if(this != "")
        return this.replace(new RegExp(from, "g"), to);
    else
        return this;
};

String.prototype.cut = function(len) {
    var str = (this + "");
    var l = 0;

    if(str.length <= 1) return str;

    for (var i=0; i<str.length; i++) {
        l += (str.charCodeAt(i) > 128) ? 2 : 1;
        if (l > len) return str.substring(0,i);
    }
    return str;
};

String.prototype.len = function() {
    var val = this;

    if (val == "") return 0;

    /** 입력받은 문자열을 escape() 를 이용하여 변환한다. **/
    /** 변환한 문자열 중 유니코드(한글 등)는 공통적으로 %uxxxx로 변환된다. **/
    var temp_estr = escape(val);
    var s_index   = 0;
    var e_index   = 0;
    var temp_str  = "";
    var cnt       = 0;

    /** 문자열 중에서 유니코드를 찾아 제거하면서 갯수를 센다. **/
    while ((e_index = temp_estr.indexOf("%u", s_index)) >= 0) {  /** 제거할 문자열이 존재한다면 **/
        temp_str += temp_estr.substring(s_index, e_index);
        s_index = e_index + 6;
        cnt ++;
    }

    temp_str += temp_estr.substring(s_index);
    temp_str = unescape(temp_str);  /** 원래 문자열로 바꾼다. **/

    /** 유니코드는 2바이트 씩 계산하고 나머지는 1바이트씩 계산한다. **/
    return ((cnt * 2) + temp_str.length) + "";
};

/** @ 입력 금지(eventCode 를 Object 로 정의하면 jquery select box option:selected 가 동작하지 않는다.) **/
Number.prototype.KeyDownAtSign = function(event)
{
  if( event == undefined ) return;

  if( event.which == 13 ) return;                       /** 엔터 **/
  if( event.which == 8 ) return;                       /** BACK SPACE **/

  if( event.shiftKey && event.which == 50 )
  {
    event.preventDefault();
  }
};


/** . 입력 금지(eventCode 를 Object 로 정의하면 jquery select box option:selected 가 동작하지 않는다.) **/
Number.prototype.KeyDownPeriodSign = function(event)
{
  if( event == undefined ) return;

  if( event.which == 13 ) return;                       /** 엔터 **/
  if( event.which == 8 ) return;                       /** BACK SPACE **/

  if( event.which == 190 || event.which == 110 )
  {
    /** . 입력 금지 **/
    event.preventDefault();
  }
};

/** 숫자만 가능(eventCode 를 Object 로 정의하면 jquery select box option:selected 가 동작하지 않는다.) **/
Number.prototype.KeyDownNumberSign = function(event)
{
  if( event == undefined ) return;

  /** Allow Keydown Event **/
  if( event.which >= 48 && event.which <= 57 ) return;  /** 키보드 상단 숫자키 **/
  if( event.which >= 96 && event.which <= 105 ) return; /** 키보드 우축 숫자키 **/
  if( event.which == 13 ) return;                       /** 엔터 **/
  if( event.which == 9 ) return;                        /** TAB **/
  if( event.which >= 37 && event.which <= 40 ) return;  /** 커서이동(←, ↓, ↑, →)(키보드 우측 커서 이동키일때도 동일) **/
  if( event.which >= 35 && event.which <= 36 ) return;  /** HOME, END **/
  if( event.which == 46 ) return;                       /** DELETE **/
  if( event.which == 8 ) return;                        /** BACK SPACE **/

  /** Not Allow Keydown Event **/
  event.preventDefault();
};

/**
 * String 자르기
 * @param {Object} len
 */
Number.prototype.cut = function(len) {
    var str = (this + "");

    return str.cut(len);
};

Array.prototype.clear = function()
{
  this.length = 0;
}

/**
 * 숫자 콤마 처리
 */
String.prototype.comma = function() {
   var tmp = this.split('.');

   var minus = false;
   var str = new Array();

   if(tmp[0].indexOf('-') >= 0) {
    minus = true;
    tmp[0] = tmp[0].substring(1, tmp[0].length);
   }

   var v = tmp[0].replace(/,/gi,'');
   for(var i=0; i<=v.length; i++) {
    str[str.length] = v.charAt(v.length-i);
    if(i%3==0 && i!=0 && i!=v.length) {
     str[str.length] = '.';
    }
   }
  str = str.reverse().join('').replace(/\./gi,',');
   if(minus) str = '-' + str;
return (tmp.length==2) ? str + '.' + tmp[1] : str;
}

/*
 *	Dateformat
 */

Date.prototype.format = function(f) {
    if (!this.valueOf()) return " ";
 
    var weekName = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
    var d = this;
     
    return f.replace(/(yyyy|yy|MM|dd|E|hh|mm|ss|a\/p)/gi, function($1) {
        switch ($1) {
            case "yyyy": return d.getFullYear();
            case "yy": return (d.getFullYear() % 1000).zf(2);
            case "MM": return (d.getMonth() + 1).zf(2);
            case "dd": return d.getDate().zf(2);
            case "E": return weekName[d.getDay()];
            case "HH": return d.getHours().zf(2);
            case "hh": return ((h = d.getHours() % 12) ? h : 12).zf(2);
            case "mm": return d.getMinutes().zf(2);
            case "ss": return d.getSeconds().zf(2);
            case "a/p": return d.getHours() < 12 ? "오전" : "오후";
            default: return $1;
        }
    });
};
 
String.prototype.string = function(len){var s = '', i = 0; while (i++ < len) { s += this; } return s;};
String.prototype.zf = function(len){return "0".string(len - this.length) + this;};
Number.prototype.zf = function(len){return this.toString().zf(len);};
