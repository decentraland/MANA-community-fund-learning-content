#Mixamo Video Links

DL: https://drive.google.com/file/d/1Ac2QqTiWy9FC0Tsogfb5k7PBKHUyrRv1/view?usp=sharing

Code:

```
import { createElement, ScriptableScene } from "metaverse-api";

const MODEL_ID = "dancefriend";

export default class DanceAnimation extends ScriptableScene {
    state = {
        dancestate: true
    };

    async sceneDidMount() {
      this.subscribeTo("pointerDown", e => {
        this.setState({ dancestate: false });
      });
      this.subscribeTo("pointerUp", e => {
        this.setState({ dancestate: true });
      });
    }

    async render() {
        return (
            <scene>
                <gltf-model
                    id={`${MODEL_ID}`}
                    position={{ x: 5, y: 0, z: 5 }}
                    scale={51}
                    src="models/untitled.gltf"
                    skeletalAnimation={[{ clip: "Bellydancing", playing: this.state.dancestate }]}
                />
            </scene>
        );
    }
}
```


Links:
https://www.blender.org/
https://github.com/Kupoman/blendergltf
https://poly.google.com/view/0glaKDa3yc7
https://gltf-viewer.donmccurdy.com/
