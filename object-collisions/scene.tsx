import { createElement, ScriptableScene } from 'metaverse-api'

const networkHz = 6
const interval = 1000 / networkHz
var prevtime = 0;

//used for ball starting pos
const startingpos = {x: 3, y: 6, z: 2 };
var currentpos = startingpos;

//physics simulation requires time, velocity, acceleration
var vel = 0;
var acc = -9.8; // gravity is 9.8m/s^2 in my world.

//when the ball touches the ground
const ground_height = 0.5;

//why bouncy is the ball? (between 0 and 1 please.) 1 makes it stop when it hits the ground
const elasticity = 0.5; //ball will lose 1/2 of speed when it hits the ground

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
    const { time } = this.state
    var timestep = time - prevtime;
    prevtime = time;// calculate how much time has passed.
    //change in position = change in time * speed.

    var nextpos = currentpos;

    //increment y according to velocity.
    nextpos.y += timestep*vel;

    //increment velocity according to acceleration
    vel += timestep*acc;

    //check if the ball has hit the ground and needs to bounce up.
    if(nextpos.y <= ground_height){
    console.log("Boom, hit the ground with speed of " + vel);
    //change direction when it hits the ground (only once though)
    if(vel < 0){
      vel = vel * -1;
      //also lose some energy.
      vel = vel * (1  - elasticity);
    }
  }

    //return the scene,

    //use myscaler variable directly inside the scene to scale a red box..

    //the next box is a ground layer
    //the sphere is a pink ball with gravity
    return (
      <scene position={{ x: 5, y: 0, z: 5 }}>
          <box position={{ x: 0, y: 0, z: 0 }} scale={{ x: 10, y: ground_height, z: 10 }} color="blue" />
          <sphere position={nextpos} color="#ff00aa" scale={0.5} />
      </scene>
    )
  }
}
