
var c = document.createElement("canvas");



var ctx = c.getContext("2d");

console.log('hi');
c.width = 500;
c.height= 350;

document.body.appendChild(c);

var perm =[];
while(perm.length < 500){

  while(perm.includes(val = Math.floor(Math.random()*500)));
  perm.push(val);

  //console.log(perm[perm.length-1])
 // console.log(val)

}

var lerp = (a,b,t) => a + (b-a)*(1-Math.cos(t*Math.PI))/2;


var noise = x=>{

  x = x*0.01%500;
  var g = lerp(perm[Math.floor(x)] , perm[Math.ceil(x)],x-Math.floor(x));

  return g
}

var player = new function(){

  this.x = c.width/2;
  this.y = 0;
  this.ySpeed = 0;
  this.rot = 0;
  this.rSpeed = 0;

  this.img = new Image();
  this.img.src = "moto3.png";
  this.draw = function(){

    var p1 = c.height - noise(t+this.x)*0.25;
    var p2 = c.height - noise(t+5+this.x)*0.25;
    var grounded = 0;

    if(p1-15>this.y)  {this.ySpeed +=0.1;}

    else{

      this.ySpeed -= this.y-(p1-15);
      this.y = p1-15;
    //  grounded = 1;

    }

  /*  if (!playing || grounded && Math.abs(this.rot)>Math.PI*0.5){

      playing = false;
      this.rSpeed = 5;
      k.ArrowUp = 1;
      this.x-= speed*2.5;

    }
    */

    var angle = Math.atan2((p2-15)-this.y,(this.x+5)-this.x)
    this.y +=this.ySpeed

    /*if(grounded && playing){

      this.rot -=(this.rot- angle)*0.5
      this.rSpeed = this.rSpeed -(angle-this.rot);
    }

    this.rSpeed +=(k.ArrowLeft-k.ArrowRight)*0.5;

    this.rot -=this.rSpeed*0.1;

    if(this.rot >Math.PI) this.rot =-Math.PI;
    if(this.rot <-Math.PI) this.rot =Math.PI;

    */
    ctx.save();
    ctx.translate(this.x,this.y);
    //ctx.rotate(this.rot);
    ctx.drawImage(this.img,-15,-15,30,30);
    ctx.restore();
  }
}

var t = 0;
var speed =0.5;
var playing = true;
var factor = 0.05
var k  = {ArrowUp:0,ArrowDown:0,ArrowRight:0,ArrowLeft:0};

function loop(){

  //if (factor<0) factor = 0
  t+=5*speed;

  ctx.fillStyle = "#19f";
  ctx.fillRect(0,0,c.width,c.height);
  ctx.beginPath();

  ctx.arc(c.width/2, c.height/2, 50, 0, 2 * Math.PI);
  ctx.fillStyle = "#FFFF00";
  ctx.fill();
  ctx.beginPath();
  ctx.fillStyle = "brown";
  ctx.moveTo(0,c.height);

  for (let i = 0; i < c.width; i++)

    ctx.lineTo(i,c.height - noise(t+i)*0.25);
    ctx.lineTo(c.width,c.height);
    ctx.fill();
    player.draw();

  requestAnimationFrame(loop);

}


document.addEventListener("keydown", (event)=>{

  if(event.key==='ArrowRight'){

  speed+=factor;

}

 else if(event.key==='ArrowDown'){

  speed-= factor;
//  if (speed<0) speed = 0;
}

  }
  )

onkeyup = d=> k[d.key] = 1;
onkeydown = d=>k[d.key] = 0;
/*document.onkeydown = checkKey;

function checkKey(e) {

    e = e || window.event;

    if (e.keyCode == '38') {
        alert('hello world')
    }
    else if (e.keyCode == '40') {
        // down arrow
    }
    else if (e.keyCode == '37') {
       // left arrow
    }
    else if (e.keyCode == '39') {
       // right arrow
    }

}
*/

loop();
