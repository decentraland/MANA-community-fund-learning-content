import { createElement, ScriptableScene } from 'metaverse-api'

const networkHz = 6
const interval = 1000 / networkHz
var prevtime = 0;

//Each ball needs its own position and velocity in a global scope
//physics simulation requires time, velocity, acceleration. That's it.

//Ball 1 =
const startingpos1 = {x: 3, y: 6, z: 3 };
var currentpos1 = startingpos1;
var vel1 = 0;

//Ball 2 =
const startingpos2 = {x: -1, y: 5, z: 1}
var currentpos2 = startingpos2;
var vel2 = 0;

// gravity is 9.8m/s^2 in my world. for everything,
//but you could have objects with different acc if you wanted.
const acc = -9.8;

//What height the ball touches the ground at
const ground_height = 0.5;

//How bouncy is the ball? (between 0 and 1 please.) 1 makes it stop when it hits the ground
//balls will lose 1/2 of speed when it hits the ground
const elasticity = 0.5;


//functions to simulate gravity
//excplicity make all the variables numbers (typescript). This is for a blockchain afterall.
//returns a number for new velocity given velocity and time
function updateVelocity(curr_vel: number, timestep: number): number{
  return curr_vel + (timestep * acc);
}

//given an object's position and velocity decide if its next position
function updatePosition(curr_vel: number, curr_y_pos: number, timestep: number): number{
  return curr_y_pos + (curr_vel * timestep);
}

//given current position, decide if the ball should bounce and change directions if it hits the floor and is going down.
//returns new velocity
function updateFall(current_y_pos: number, vel: number, timestep: number): number{
  if(current_y_pos <= ground_height && vel < 0){
    //hit the ground
    console.log("Boom, hit the ground with speed of " + vel);
    //change direction when it hits the ground (only once though)
    var new_vel = vel * -1;
    //also lose some energy.
    new_vel = new_vel * (1 - elasticity);
    console.log("new vel = " + new_vel);
    return new_vel;

  }else{
    //keep falling with increasing speed.
    return updateVelocity(vel, timestep);
  }
}


export default class RollerCoaster extends ScriptableScene<any, { time: number }> {
  state = { time: 0 }

  timeout = setInterval(() => {
    this.setState({
      time: performance.now() * 0.0001
    })
  }, interval)

  sceneWillUnmount() {
    clearInterval(this.timeout)
  }

  async render() {
    //====== Physics Simulation ===//
    const { time } = this.state;
    var timestep = time - prevtime;
    prevtime = time;// calculate how much time has passed.

    //change in position = change in time * speed.
    //Get new velocities.
    vel1 = updateFall(currentpos1.y, vel1, timestep);
    vel2 = updateFall(currentpos2.y, vel2, timestep);

    var nextpos1 = currentpos1;
    var nextpos2 = currentpos2;

    //increment y according to velocity.
    nextpos1.y = updatePosition(vel1, currentpos1.y, timestep);
    nextpos2.y = updatePosition(vel2, currentpos2.y, timestep);



    //return the scene,

    //use myscaler variable directly inside the scene to scale a red box..

    //the next box is a ground layer
    //the sphere is a pink ball with gravity
    return (
      <scene position={{ x: 5, y: 0, z: 5 }}>
          <box position={{ x: 0, y: 0, z: 0 }} scale={{ x: 10, y: ground_height, z: 10 }} color="blue" />

          <sphere id="ball1" position={nextpos1} color="#ff00aa" scale={0.5} />

          <sphere id="ball2" position={nextpos2} color="#ff00aa" scale={0.5} />
      </scene>
    )
  }
}
