const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

let engine;
let world;

var top_wall;
var ball;
var con; // variavel para a corda / constrição
var btn1;
var btn2;
function setup() {
  createCanvas(400,400);
  engine = Engine.create();
  world = engine.world;
   var ball_options = {
    restitution: 0.95,
  }  
  btn2 = createImg('up.png');
  btn2.position(20,30);
  btn2.size(50,50);
  btn2.mouseClicked(vForce);
  ball = Bodies.circle(100,200,20,ball_options);
  World.add(world,ball);
  con = Matter.Constraint.create({ //cria a restrição com a bola e a corda do pendulo
    pointA:{x:200,y:20}, // ponto na tela para pendurar a corda
    bodyB:ball, // corpo ligado a corda, ou seja, a bola
    pointB:{x:0,y:0}, // centro da bola
    length:100, // comprimento da corda
    stiffness:0.1 // rigidez da corda, quanto menor, mais elastica a corda fica
  });
  World.add(world,con); //adiciona a restrição ao mundo do programa
  rectMode(CENTER);
  ellipseMode(RADIUS);
}

function draw() 
{
  background(51);
  Engine.update(engine);
  ellipse(ball.position.x,ball.position.y,20);

  strokeWeight(2); // cria a largura da corda
  stroke(255); // dá o valor da cor da corda
  line(con.pointA.x,con.pointA.y,ball.position.x,ball.position.y); // cria a linha da corda com a restrição e ligada a bola
  Engine.update(engine);
}


function vForce()
{
  Matter.Body.applyForce(ball,{x:0,y:0},{x:0.05,y:0});} //modificar o valor pra força de X
