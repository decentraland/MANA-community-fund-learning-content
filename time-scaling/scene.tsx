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
    var inc = fastsecs % 5;

    if(inc < 1.1){
      myscaler+= 0.2;
      console.log("my scaler incremented to " + myscaler);
    }

    return (
      <scene>
        <entity id="scaler">
            <box position={{ x: 5, y: 0, z: 5 }} scale={{ x: myscaler, y: myscaler, z: myscaler }} color="blue"/>
        </entity>

        <plane />
      </scene>
    )
  }
}
