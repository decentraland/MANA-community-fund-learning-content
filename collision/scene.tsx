 import { createElement, ScriptableScene } from "metaverse-api";

//used for ball starting pos
const startingpos = {x: 3, y: 4, z: 2 };
var currentpos = startingpos;

//physics simulation requires time, velocity, acceleration
var time = 0;
var vel = 0;
var acc = -9.8; // gravity is 9.8m/s^2 in my world.

//when the ball touches the ground
const ground_height = 0.5;

//why bouncy is the ball? (between 0 and 1 please.) 1 makes it stop when it hits the ground
const elasticity = 0.5; //ball will lose 1/5 of speed when it hits the ground


export default class CollisionScene extends ScriptableScene {

    async render() {
      //called every time the scene refreshes. Must return the scene, almost like html
      console.log("time + 0.01 = " + time);
      time += 0.1;
      var nextpos = currentpos;

      //increment y according to velocity.
      nextpos.y += time*vel;

      //increment velocity according to acceleration
      vel += time*acc;

      //check if the ball has hit the ground and needs to bounce up.
      if(nextpos.y <= ground_height){
      console.log("Boom, hit the ground with speed of " + vel);
      //change direction
      vel = vel * -1;

      //also lose some energy.
      vel = vel * (1  - elasticity);
    }

        return (
            <scene position={{ x: 5, y: 0, z: 5 }}>

                <box position={{ x: 0, y: 0, z: 0 }} scale={{ x: 10, y: ground_height, z: 10 }} color="blue" />


                <sphere position={nextpos} color="#ff00aa" scale={0.75} />


            </scene>
        );
    }
}
