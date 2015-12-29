export default{
	
	wrap : (start,end) => {

		var z = window.getSelection().getRangeAt(0);
		var t = 'start'+z.toString()+'end';
		
		var temp = document.createElement("div");
		temp.innerHTML = t;
		z.deleteContents();
		z.insertNode(temp.childNodes.item(0));
		
	},
	
	replace : (content) => {
		if(content&&typeof content ==='function')
			content=content(window.getSelection().toString());
		var z = window.getSelection().getRangeAt(0);
		var t = content;
		
		var temp = document.createElement("div");
		temp.innerHTML = t;
		z.deleteContents();
		z.insertNode(temp.childNodes.item(0));
		
	},
	
	getText : () => {
		return document.getSelection().toString() ;
	},
	setSelect:()=>(obj,start,end) {
		obj.setSelectionRange(start, end);
		obj.focus();
	},
	
};
