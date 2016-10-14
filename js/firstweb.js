var WINDOW_WIDTH=document.body.offsetWidth ;
var WINDOW_HEIGHT=document.body.offsetHeight;
var MARGIN_TOP=30;
var MARGIN_LEFT=60;
const endTime= new Date(2016,9,13,20,12,12)
var CurShowTime=0;
var RADIUS=2;
var balls = [];
const colors = ["#33B5E5","#0099CC","#AA66CC","#9933CC","#99CC00","#669900","#FFBB33","#FF8800","#FF4444","#CC0000"]

window.onload=function  () {	
	var canvas=document.getElementById("canvas");
	if (canvas.getContext("2d")) {
		  var ctx = canvas.getContext("2d");
	}else{
		alert("该浏览器不支持canvas！");
	}
	canvas.width=WINDOW_WIDTH;
	canvas.height=WINDOW_HEIGHT;
	CurShowTime=getCurShowTime();
	setInterval(
		function (){	
			render( ctx );
			change();			
			
			
	},50)
	

function getCurShowTime () {
	var curTime=new Date();
	var ret=endTime.getTime()-curTime.getTime();
	ret=Math.round( ret/1000 );
	return ret>=0?ret : 0;
	}
function change () {
	var nextTime=getCurShowTime();	
	var nextHour=parseInt(nextTime/3600);
	var nextMin= parseInt((nextTime-nextHour*3600)/60);
	var nextSec= nextTime%60;

	var curHour=parseInt(CurShowTime/3600);
	var curMin= parseInt((CurShowTime-curHour*3600)/60);
	var curSec= CurShowTime%60;

	if (curSec!=nextSec) {
		if (parseInt(nextHour/10)!=parseInt(curHour/10)) {
			addBalls(MARGIN_LEFT , MARGIN_TOP , parseInt(Hour/10));
		}
		if (parseInt(nextHour%10)!=parseInt(curHour%10)) {
			addBalls(MARGIN_LEFT+15*RADIUS , MARGIN_TOP , parseInt(curHour%10) );
		}
		if (parseInt(nextMin/10)!=parseInt(curMin/10)) {
			addballs(MARGIN_LEFT+39*RADIUS , MARGIN_TOP , parseInt(curMin/10) );
		}
		if (parseInt(nextMin%10)!=parseInt(curMin%10)) {
			addBalls( MARGIN_LEFT+54*RADIUS , MARGIN_TOP , parseInt(curMin%10) );
		}
		if (parseInt(nextSec/10)!=parseInt(curSec/10)) {
			addBalls(MARGIN_LEFT+78*RADIUS  , MARGIN_TOP , parseInt(curSec/10));
		}
		if (parseInt(nextSec%10)!=parseInt(curSec%10)) {
			addBalls(MARGIN_LEFT+93*RADIUS , MARGIN_TOP , parseInt(nextSec%10) );
		}
		
		CurShowTime=nextTime;
	}
	
 	updateBalls();
 	console.log( balls.length);
}

function updateBalls(){
    for( var i = 0 ; i < balls.length ; i ++ ){

        balls[i].x += balls[i].vx;
        balls[i].y += balls[i].vy;
        balls[i].vy += balls[i].g;

        if( balls[i].y >= WINDOW_HEIGHT-RADIUS ){
            balls[i].y = WINDOW_HEIGHT-RADIUS;
            balls[i].vy = - balls[i].vy*0.75;
        }
    }

    var cnt = 0
    for( var i = 0 ; i < balls.length ; i ++ )
        if( balls[i].x + RADIUS > 0 && balls[i].x -RADIUS < WINDOW_WIDTH )
            balls[cnt++] = balls[i];

    while( balls.length > cnt ){
        balls.pop();
    }
}

function addBalls( x , y , num ){

    for( var i = 0  ; i < digit[num].length ; i ++ )
        for( var j = 0  ; j < digit[num][i].length ; j ++ )
            if( digit[num][i][j] == 1 ){
                var aBall = {
                    x:x+j*2*RADIUS+RADIUS,
                    y:y+i*2*RADIUS+RADIUS,
                    g:1.5+Math.random(),
                    vx:Math.pow( -1 , Math.ceil( Math.random()*1000 ) ) * 4,
                    vy:-5,
                    color: colors[ Math.floor( Math.random()*colors.length ) ]
                }

                balls.push( aBall );
            }
}

function render (ctx) {
	ctx.clearRect(0,0,WINDOW_WIDTH, WINDOW_HEIGHT);
	var Hour=parseInt(CurShowTime/3600);
	var Min= parseInt((CurShowTime-Hour*3600)/60);
	var Sec= CurShowTime%60;	
	renderDigit( MARGIN_LEFT , MARGIN_TOP , parseInt(Hour/10) , ctx );
	renderDigit( MARGIN_LEFT+15*RADIUS , MARGIN_TOP , parseInt(Hour%10) , ctx );
	renderDigit( MARGIN_LEFT+30*RADIUS , MARGIN_TOP , 10, ctx );
	renderDigit( MARGIN_LEFT+39*RADIUS , MARGIN_TOP , parseInt(Min/10) , ctx );
	renderDigit( MARGIN_LEFT+54*RADIUS , MARGIN_TOP , parseInt(Min%10) , ctx );
	renderDigit( MARGIN_LEFT+69*RADIUS , MARGIN_TOP , 10, ctx );
	renderDigit( MARGIN_LEFT+78*RADIUS  , MARGIN_TOP , parseInt(Sec/10) , ctx );
	renderDigit( MARGIN_LEFT+93*RADIUS , MARGIN_TOP , parseInt(Sec%10) , ctx );

	 for( var i = 0 ; i < balls.length ; i ++ ){
        ctx.fillStyle=balls[i].color;
        ctx.beginPath();
        ctx.arc( balls[i].x , balls[i].y , RADIUS , 0 , 2*Math.PI , true );
        ctx.closePath();
        ctx.fill();
    }

}

function renderDigit (x,y,num,ctx) {
	 ctx.fillStyle="blue"
	 for (var i = 0; i < digit[num].length; i++) {
	 	 for(var j = 0 ; j < digit[num][i].length ; j ++) {
	 	 	if (digit[num][i][j]==1) {
	 	 		ctx.beginPath();
	 	 		ctx.arc(x+j*2*RADIUS+RADIUS, y+i*2*RADIUS+RADIUS, RADIUS, 0, 2*Math.PI, true );
	 	 		ctx.closePath();
	 	 		ctx.fill();
	 	 	}
	 	 }
	 	
	}
}

}


