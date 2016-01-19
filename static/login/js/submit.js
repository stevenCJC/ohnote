var inputs=document.querySelectorAll('input');
for(var i=0;i<inputs.length;i++){
    var item=inputs[i];
    item.addEventListener('keydown',function(e){
        if(e.keyCode===13){
            document.querySelector('form').submit();
        }
    });
};