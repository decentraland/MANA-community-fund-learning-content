# Time Scaling
This is an example showing how to create a mini physics simulation in Decentraland. Object positions can be controlled by their velocities, which are controlled by a globally set, and arbitrary acceleration. 

The code to do this is in scene.tsx.  Everything else was mostly generated using `dcl init`.

# General Info
With this Dynamic Animation, we're demonstrating how to employ simple data binding to objects in your scene. Translation, rotation, and scale are all attributes you can bind to `state` properties.

Once you've got the CLI installed, to view the scene, you only need to switch to that directory and type `dcl preview` at the command prompt. It will make sure any dependencies are installed and then open the scene in a new browser tab automatically.

You can learn more about our JSX-style lifecycle and rendering in our documentation: https://docs.decentraland.org/
