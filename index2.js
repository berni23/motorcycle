
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

}

var lerp = (a,b,t) => a + (b-a)*(1-Math.cos(t*Math.PI))/2;
var noise = x=>{

var z  = x*0.01%500;
  console.log(z);
  var g = lerp(perm[Math.floor(z)], perm[Math.ceil(z)],z-Math.floor(z));
  return g

}

function loop(){

  ctx.fillStyle = "#19f";
  ctx.fillRect(0,0,c.width,c.height);
  ctx.beginPath();

  ctx.fillStyle = "black";
  ctx.moveTo(0,c.height);

  for (let i = 0; i < (c.width+10); i++)

    ctx.lineTo(i,c.height - noise(i)*0.25);
    ctx.lineTo(c.width,c.height);
    ctx.fill();
    requestAnimationFrame(loop);

  }


loop();
