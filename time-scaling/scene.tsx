import { createElement, ScriptableScene } from 'metaverse-api'

const networkHz = 6
const interval = 1000 / networkHz
var myscaler = 1;

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
    const { time } = this.state

    var fastsecs = time*10;
    //time increments are about .1 second. multiplying by 10 gives us about seconds.

    var inc = fastsecs % 5;
    // Get modulo 5, as a custom increment

    if(inc < 1.1){ //every ~5 seconds
      myscaler+= 0.2; //scaler will grow a little bit. myscaler is defined globally above.

      console.log("my scaler incremented to " + myscaler);
      //in a web browser inspect element and select console.
      //there you can see the log printing out the size of the scaler.
    }

    //return the scene, use myscaler variable directly inside the scene to scale entities.
    return (
      <scene>
        <entity id="scaler-obj">

            <box position={{ x: 0, y: 0, z: 0 }} scale={{ x: myscaler, y: myscaler, z: myscaler }} color="blue"/>

        </entity>

        <plane />
      </scene>
    )
  }
}
