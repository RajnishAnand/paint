function getdata(){
    $('#canvs')[0].getDataURL();
    document.write(dataUrl);
    //document.write('<img src="'+dataUrl+'" width="100%" />');
};

//Text
function teXt(){
    
    ctx.font='50px sans-serif';
    let x1=ctx.measureText('101010').width;
    ctx.strokeText('101010', x-x1/2, y);
    ctx.fillText('101010', x-x1/2, y);
    console.log(ctx.measureText('101010'));
}

