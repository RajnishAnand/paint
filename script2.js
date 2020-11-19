/* Under Development */
function generateImg(){
    let el=$('<a id="download"></a>');
        $(el).attr({
            'download':'img_'+Date.now()+'.png',
            'href':$('#canvs')[0].toDataURL(), 
            'target':'_blank'
        });
        $('#sideBar').append(el);
        $('#download')[0].click();
        $('#download').remove();
};
$('#downloadBtn').on('click',generateImg);

/*
//Text
let xT=0,yT=0;
let txtWid;
function teXt(){
    let txt='Your Text';
    let xd, yd, maxWid, maxHeight;
    if (hold[0] && hold[1]) {
        cty.textBaseline='middle';
    }
    else if (hold[0] || hold[1]) {
        xd=(x<dx)?x:dx;
        yd=(y<dy)?y:dy;
        maxWid=Math.abs(dx-x);
        maxHeight=Math.abs(dy-y);
        txtWid=cty.measureText(txt).width;
        txtWid=(txtWid<maxWid)?txtWid:maxWid;
        xT=xd+(maxWid-txtWid)/2;
        yT=yd+(maxHeight)/2;
        
        cty.beginPath();
        stylTemp();
        cty.clearRect(0,0,w,h);
        cty.strokeRect(x,y,dx-x,dy-y);
        cty.restore();
        
        cty.strokeText(txt,xT, yT,maxWid);
        //cty.fillText(txt, xd+5, yd+5);
    }
    else {
        cty.restore();
        cty.beginPath();
       // cty.clearRect(0,0,w,h);
        ctx.beginPath();
        ctx.strokeText(txt, dx/5, dy/5);
        ctx.fillText(txt, dx/5, dy/5);
        //console.log(ctx.font)
    };
}
*/

