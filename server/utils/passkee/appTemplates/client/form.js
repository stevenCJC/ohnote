// by Johnson Cheung (http://www.wahon.net/~johnson/)
// Last update : Dec 8, 2009
// checked on
//	IE		: 6.0
//	Mozilla	: 5.0

// based on 'prototype.js'

function EvalForm(sFormName) {
	return $(sFormName);
}
function EvalFormObj(sFormName, sFieldName) {
	return $(sFieldName);
}
function GetFormDblValue(sFormName, sFieldName) {
	return parseFloat($F(sFieldName));
}
function GetFormSelectValue(sFieldName) {
	return $F(sFieldName);
}
function GetRadioValue(sFieldName) {
	/*
	// loop through the ancestors, the first one should be the Form
	for (i=0;i<Element.ancestors(sFieldName).length;i++) {
		alert(Element.ancestors(sFieldName)[i].identify() );
	}
	*/
	return GetRadioValue_V2(Element.ancestors(sFieldName)[0].identify(), sFieldName);
}
function GetRadioValue_V2(sFormName, sFieldName) {
	var sRtv = undefined;
	aryElements = Form.getInputs(sFormName, 'radio', sFieldName);
	for (i=0;i<aryElements.length;i++) {
		if (aryElements[i].checked) sRtv = aryElements[i].value;
	}
	if (sRtv == undefined) return false;
	else return sRtv;
}
function $RF(el, radioGroup) {
	if($(el).type && $(el).type.toLowerCase() == 'radio') {
		var radioGroup = $(el).name;
		var el = $(el).form;
	} else if ($(el).tagName.toLowerCase() != 'form') {
		return false;
	}
	
	var checked = $(el).getInputs('radio', radioGroup).find(
		function(re) {return re.checked;}
	);
	
	return (checked) ? $F(checked) : null;
}

function ValidEmail(sEmail) {
	var sEmailCheA	=	/^[a-zA-Z0-9][\w\.-]*[a-zA-Z0-9_]@[a-zA-Z0-9][\w\.-]*[a-zA-Z0-9]\.[a-zA-Z][a-zA-Z\.]*[a-zA-Z]$/i;
	var sEmailCheB	=	/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
	return (sEmailCheA.test(sEmail) && sEmailCheB.test(sEmail) );
}
function ValidTelephone(sTel) {
	var sTelChe	=	/^[0-9-]{1,}$/i;
	if (sTel.indexOf("999") == 0) return false;
	return sTelChe.test(sTel);
}
function ValidTelephone569(sTel) {
	var sTelChe	=	/^[569][0-9]{7}$/i;
	if (sTel.indexOf("999") == 0) return false;
	return sTelChe.test(sTel);
}
function ValidTelephone69(sTel) {
	var sTelChe	=	/^[569][0-9]{7}$/i;
	if (sTel.indexOf("999") == 0) return false;
	else return sTelChe.test(sTel);
}
function ValidTelephoneNumber(sTel) {
	var sTelChe	=	/^[23569][0-9]{7}$/i;
	if (sTel.indexOf("999") == 0) return false;
	return sTelChe.test(sTel);
}
function ValidNumber(sNum) {
	var sNumChe	=	/^[0-9]{1,}$/i;
	return sNumChe.test(sNum);
}
function ValidDateTimeFormat(sDateTime) {
	var sDTChe	=	/^[0-9][0-9][0-9][0-9]-[0-1][0-9]-[0-3][0-9] [0-2][0-9]:[0-5][0-9]:[0-5][0-9]$/i;
	return sDTChe.test(sDateTime);
}
function ValidDate(iYear, iMonth, iDate) {
	oChkDate = new Date(parseFloat(iYear), parseFloat(iMonth)-1, parseFloat(iDate), 0, 0, 0);
	if (isNaN(oChkDate)) return false;

	if ( (oChkDate.getFullYear() == parseFloat(iYear)) &&
		((oChkDate.getMonth() + 1) == parseFloat(iMonth)) &&
		(oChkDate.getDate() == parseFloat(iDate)) ) {
		return true;
	} else {
		return false;
	}
}
