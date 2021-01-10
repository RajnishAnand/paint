//alert("Please comment if you find a 🐛.bug");

let hdFx=w=h=`👀/\u5965 `;
$(()=>{
let ctx = $('#canvs')[0].getContext("2d");
let cty = $('#canvH')[0].getContext("2d");
let ctz = $('#canvI')[0].getContext("2d");


//onload function
$(document).ready(()=>{ 
    autoAdj(2);
    stylCanv();
    
    $($('.colOp')[1]).hide();
    $('#sideBar').hide();
    $('#ersrT').hide();
    setTimeout(()=>{
        $('#loadingScrn').fadeToggle(500);
        setTimeout(()=>{
            $('#loadingScrn').remove();
        }, 500); 
    },500);
});
//-------------------------------------------



//-------------------------------------------
//To auto adjust 
function autoAdj(e){ 
    hdFx=e;
    w = innerWidth*hdFx;
    h = (innerHeight-38)*hdFx;
    
    $('#canvs')[0].height = h;
    $('#canvs')[0].width = w;
    $('#canvH')[0].height = h;
    $('#canvH')[0].width = w;
    $('#canvI')[0].height = h;
    $('#canvI')[0].width = w;
    stylCanv();
    for(let each of [cty, ctx]){
        each.globalAlpha=$('#experimentalInp2').val()/100;
    };
};
//-------------------------------------------



//-------------------------------------------
//Event listeners to set value of some variables
let hold = [false, false];
let dx = x = dy = y = 0;

$('#canvI').on("touchstart", (ev) => {
    hold = [true, true];
    dx = x = ev.touches[0].clientX*hdFx;
    dy = y = ev.touches[0].clientY*hdFx;
    detecT();
});
$('#canvI').on("touchmove", (ev) => {
    hold = [true, false];
    x = ev.touches[0].clientX*hdFx;
    y = ev.touches[0].clientY*hdFx;
    detecT();
});
$('#canvI').on("touchend", (ev) => {
    hold = [false, false];
    detecT();
});
$('#canvI').on("touchcancel", (ev)=> {
    hold = [false, false];
    detecT();
});

//To show taps
let showTap=true;
const toucH=()=>{
    ctz.fillStyle='#ffffff99';
    if (hold[0] || hold[1]) {
        ctz.clearRect(0,0,w,h);
        ctz.beginPath();
        ctz.arc(x, y, hdFx*10, 0, 2*Math.PI);
        ctz.fill();
    }
    else {
        ctz.clearRect(0,0,w,h);
    };
    
}
//-------------------------------------------



//-------------------------------------------
let slct = 1;

//requests selected shapes pencil eraser etc.. 
function detecT() {
    switch (slct) {
        case 0:
            ersr();
            break;
        case 1:
            pncl();
            break;
        case 2:
            lyne();
            break;
        case 3:
            rectngl();
            break;
        case 4:
            circ();
            break;
        case 5:
            //teXt();
            break;
    };
    if(showTap){toucH()};
};
//-------------------------------------------



//-------------------------------------------
//Eraser
let eraserSyz=30;
function ersr (){
    let syz=eraserSyz*hdFx;
    if (hold[0] && hold[1]) {
        stylTemp();
        ctx.globalCompositeOperation='destination-out';
        ctx.globalAlpha=1;
        ctx.lineWidth=syz*2;
        ctx.fillStyle='#ffffff';
        ctx.beginPath();
        ctx.moveTo(dx,dy);
        ctx.lineTo(dx,dy);
        ctx.stroke();
        
        cty.clearRect(0, 0, w, h);
        cty.arc(x,y,syz-1,0,2*Math.PI);
        cty.stroke();
        cty.beginPath();
    }
    else if (hold[0] || hold[1]) {
        ctx.lineTo(x,y);
        ctx.stroke();
        
        cty.clearRect(0, 0, w, h);
        cty.arc(x,y,syz,0,2*Math.PI);
        cty.stroke();
        cty.beginPath();
    }
    else {
        ctx.beginPath();
        ctx.fillStyle=fillColor;
        ctx.globalCompositeOperation='source-over';
        ctx.globalAlpha=transparency/100;
        ctx.lineWidth=lineWid*hdFx;
        cty.clearRect(0,0,w,h);
        cty.restore();
    };
};

//pencil
function pncl (){
    if (hold[0] && hold[1]) {
        ctx.beginPath();
        cty.beginPath();
        ctx.moveTo(dx, dy);
        cty.moveTo(dx,dy);
    }
    else if (hold[0] || hold[1]) {
        ctx.lineTo(x, y);
        cty.clearRect(0,0,w,h);
        cty.lineTo(x, y);
        cty.stroke()
    }
    else {
        cty.beginPath();
        cty.clearRect(0,0,w,h);
        ctx.stroke();
        ctx.fill();
    };
};

//rectangle
function rectngl(){
    if (hold[0] && hold[1]) {
        cty.beginPath();
        cty.lineJoin = "miter";
        ctx.beginPath();
        ctx.lineJoin = "miter";
    }
    else if (hold[0] || hold[1]) {
        cty.beginPath();
        cty.clearRect(0, 0, w, h);
        cty.fillRect(dx, dy, x - dx, y - dy);
        cty.strokeRect(dx, dy, x - dx, y - dy);
        cty.stroke();
        
        if(showTap){
            stylTemp();
            cty.arc(dx,dy,hdFx*10,0,2*Math.PI);
            cty.moveTo(dx, dy);
            cty.lineTo(x, y);
            cty.stroke();
            cty.restore();
        };
    }
    else {
        cty.beginPath();
        cty.clearRect(0, 0, w, h);
        ctx.fillRect(dx, dy, x - dx, y - dy);
        ctx.strokeRect(dx, dy, x - dx, y - dy);
        ctx.stroke();
        stylCanv();
    };
};

//line
function lyne(){
    if (hold[0] && hold[1]) {
        ctx.beginPath();
        ctx.moveTo(dx, dy);
    }
    else if (hold[0] || hold[1]) {
        cty.beginPath();
        cty.clearRect(0, 0, w, h);
        cty.moveTo(dx, dy);
        cty.lineTo(x, y);
        cty.stroke();
    }
    else {
        cty.clearRect(0, 0, w, h);
        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.beginPath();
        cty.beginPath();
    };
};

//circle 
function circ(){
    if (hold[0] && hold[1]) {
        ctx.beginPath();
        cty.beginPath();
    }
    else if (hold[0] || hold[1]) {
        cty.beginPath();
        cty.clearRect(0, 0, w, h);
        let a = Math.pow(dx - x, 2);
        let b = Math.pow(dy - y, 2);
        let r = Math.pow(a + b, .5);
        cty.arc(dx, dy, r, 0, 2 * Math.PI);
        cty.fill();
        cty.stroke();
        
        if(showTap){
            cty.beginPath();
            stylTemp();
            cty.moveTo(dx, dy);
            cty.lineTo(x, y);
            cty.stroke();
            cty.restore();
        };
    }
    else {
        cty.beginPath();
        cty.clearRect(0, 0, w, h);
        let a = Math.pow(dx - x, 2);
        let b = Math.pow(dy - y, 2);
        let r = Math.pow(a + b, .5);
        ctx.arc(dx, dy, r, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
    };
};




//To clear screen
const allClr=()=>{
    cty.clearRect(0, 0, w, h);
    ctx.clearRect(0, 0, w, h);
    ctz.clearRect(0, 0, w, h);
    //navigator.vibrate(80);
};
$('#clr').on("click", allClr);
//-------------------------------------------



//-------------------------------------------
//to set given style[color, fill, etc]... 
let fillColor='#00000000';
let lineWid=2;
let strokColor='#00bfff';
let fillColorOp=[false,'#005588'];

function stylCanv (){
    let each = [ctx, cty];
    for (let ct of each) {
        ct.beginPath();
        ct.fillStyle =fillColor;
        ct.lineWidth =lineWid*hdFx;
        ct.strokeStyle =strokColor;
        ct.lineJoin = "round";
        ct.lineCap = "round";
        ct.font='50px sans-serif';
        ct.save();
    };
    
    $('#strokeWidthDemo').css({
        'width': lineWid + "px", 
        'height':lineWid + "px",
        'margin':(50 - lineWid) / 2 + "px", 
        'background':ctx.strokeStyle
    });
    $('#stroKwidH').html(lineWid);
    //console.log(strokColor);
};
function stylTemp(){
    cty.save();
    cty.strokeStyle='#ffffff';
    cty.lineWidth=hdFx;
    cty.shadowOffsetX=-hdFx;
    cty.shadowOffsetY=hdFx;
    cty.shadowColor='#000000';
    cty.globalAlpha =1;
}
//-------------------------------------------



//-------------------------------------------
//Event listener to set style when input

$('#inp1').on("input",()=>{
    lineWid=$('#inp1').val();
    stylCanv();
});
$('#inp6').on("change", () => {
    if($('#inp6')[0].checked){
        fillColorOp[0]=true;
        fillColor=fillColorOp[1];
        $($('.colOp')[1]).show();
        $($('.colOp')[2]).hide();
    }
    else{
        fillColorOp=[false,ctx.fillStyle];
        fillColor='#00000000';
        $($('.colOp')[1]).hide();
        $($('.colOp')[2]).show();
    };
    stylCanv();
});
$('#inpEr').on('input',()=>{
    let alpha=$('#inpEr').val();
    $('#eraser-size').html(alpha);
    eraserSyz=alpha;
});
//-------------------------------------------



//-------------------------------------------
//mini tool box section 

$('#closE').on('click',()=>{$('#stYl').hide(100)});
$('#closR').on('click',()=>{$('#ersrT').hide(100)});

//For Spectrum Color Picker
$("#strokeColInp").spectrum({
    color:'#00bfff', 
    containerClassName: 'colorPikrC', 
    replacerClassName: 'colorPikr', 
    flat:false,
    showInput: true, 
    showInitial:true, 
    showPalette: true,
    showSelectionPalette: true,
    palette:[], 
    preferredFormat:'name', 
    change:(col)=>{
        strokColor=col.toHexString();
        stylCanv();
    }
});
$("#fillColInp").spectrum({
    color:'#005588', 
    containerClassName: 'colorPikrC', 
    replacerClassName: 'colorPikr', 
    flat:false,
    showInput: true, 
    showInitial:true, 
    showPalette: true,
    showSelectionPalette: true,
    palette:[], 
    preferredFormat:'name', 
    change:(col)=>{
        fillColor=col.toHexString();
        stylCanv();
    }, 
});
//-------------------------------------------



//-------------------------------------------
//selecting tool/shape section

let sapes = $(".shapeIco");
$(sapes[1]).css('stroke',"#00dfff");

//to highlight selected tool/shapes
const selct = (lt) => {
    for (let i=0;i<sapes.length-1;i++) {
        $(sapes[i]).css('stroke', "#aaaaaa");
    };
    $(sapes[slct]).css('stroke',"#00dfff");
    if(slct>0&&slct<5){
        $('#stYl').show(100);
        $('#ersrT').hide(100);
    }
    else if(slct==0){
        $('#stYl').hide(100);
        $('#ersrT').show(100);
    };
};

//Event listener when shapes etc are selected
for (let i = 0; i < sapes.length-1; i++) {
    $(sapes[i]).on("click", () => {
        slct = i;
        selct();
    });
};
//-------------------------------------------



//-------------------------------------------
//sidebar and sidebar-Elements section

//for sidebar toggle button 
let btnInfo1 = false;
$('#svgIco1').on('click',()=>{
    btnInfo1 = (btnInfo1 == true) ? false : true;
    if (btnInfo1) {
        $('#sideBar').show(200);
        $('#canvI').hide();
        $('#svgIco1').css('right', "12.1em");
        $('#svgIco1').html('<path d="M10 8 L20 24 L10 40" />');
    }
    else {
        $('#sideBar').hide(200);
        $('#canvI').show();
        $('#svgIco1').css('right', "0");
        $('#svgIco1').html('<path d="M18 8 L8 24 L18 40" />');
    };
});
$('#canvH').on('click',()=>{
    if(btnInfo1){$('#svgIco1').click()};
});

//for changing resolution 
$('#inpRes').on('touchend',()=>{$('#resConf')[0].click()});
$('#inpRes').on('input',()=>{
    $('#reS').html($('#inpRes').val());
});
$('#resConf').on('click', ()=>{
    if(confirm('you will lost your current progress. Do you want to continue ? ')){
        autoAdj($('#inpRes').val()/2);
    }
    else{
        $('#inpRes').val(hdFx*2);
        $('#reS').html(hdFx*2);
    }
});

//for changing canvas background 
$('.canvBgColo').on('click',(ev)=>{
    $('#canvs').css('background',$(ev.target).html());
});

//to toggle showTap
$('#experimentalInp1').on('input', (ev)=>{
    showTap=$(ev.target)[0].checked;
})

//for transpirancy
let transparency=100;
$('#experimentalInp2').on('input',(ev)=>{
    transparency=$(ev.target).val();
    $('#transp').html(transparency);
    for (let each of [cty, ctx]){
        each.globalAlpha=transparency/100;
    };
});

//for outline
$('#experimentalInp3').on('input',(ev)=>{
    if($(ev.target)[0].checked){
        $('*').css('outline','solid 1px #ff0000');
    }
    else{
        $('*').css('outline','none');
    };
});

//to move svgIco1 button up-down
$('#svgIco1').on("touchmove", (ev) => {
    ev.stopPropagation();
    let a2 = ev.touches[0].clientY;
    $('#svgIco1').css('transform',"translate(50%,-50%)");
    if (a2 > 25 && a2 < innerHeight - 150){
        $('#svgIco1').css('top', a2 + "px");
    };
});
//-------------------------------------------


//-------------------------------------------
//downlod image 
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

});//----------------------------------------
