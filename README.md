# babylon-sprite
Babylon animated 3D model rendered at runtime as a sprite in Construct 3.

This is an experiment! PRs and forks very welcome (I am currently more focused on other plugins and projects.)

## Known issues

### Do not use Worker Mode
Set Project Properties -> Advanced -> Use Worker -> No
### Lighting, some objects with PBR materials require high intensity (100), others with non PBR materials require low light intensity (1-5). 
Fixed lighting for non PBR materials.
Working on PBR texture lighting (the plant example model uses PBR material and requires high light intensity to not be dark)
### Mobile performance on Android varies widely, this is likely due to transferring / updating a texture each frame can be slow on Android. A possible mitigation is to make the overall texture smaller (which will mean fewer models supported.) This could be controlled by an initial parameter that applies across all instances.

The intent is to have a 3D model rendered at runtime w/ lighting and camera rotation in a sprite which can be used in a C3 2D or 2.5D (e.g. iso) scene. Once rendered, we can apply the usual C3 effects, z order, position, etc. ACEs.

A simple example would be the look of the older Donkey Kong Country, but instead of pre rendered 3d models changed into sprites, we'll directly use 3D models rendered during runtime, with blended animations, camera and lighting control.


If this looks viable. I will shift to developing this as a different paid project with additional features. Users who help with feedback will be given a discount on the paid project.

The examples are really rough and the character model is purchased, so do not use it in other projects.

## Feature Requests / Bugs

- Allow multiple instances in original layout to load on start of layout.
- Check if multiple instances can be loaded in the same tick.
- Add animation rate / render rate control.
- X,y,z, rotation of model (instead of only camera)
- Add control over animation blending mix amount
- Integrate camera angle and C3 player angle, so player angle can be used directly.
- Add list of animations in editor (if possible, would need to know the model to be loaded during editor time.)
- Add control for resolution vs number of models tradeoff
- *DONE* Add control of light color (ambient and ground)
- *DONE* Add control of light color (specular)

## Tech info:

For model, use only GLB (GTLF binary) file format (includes mesh, textures, animations).
Test your glb model/animations here first: https://sandbox.babylonjs.com/
Models are scaled to unit cube and centered on the y axis.
There is a default animation blend when switching animations, this could become a parameter to set in the future?
Models are all rendered together in one scene with one light, each model has its own camera.
Light control will affect all models (currently just intensity)
Camera control rotates around each model, with an arc camera, control for alpha, beta and radius (distance to model.)
Use the ModelLoaded condition to qualify using actions on models.
Convert models to glb format:
https://blackthread.io/gltf-converter
If using blender 'stash' all the animations so they will be included on glb export
GLB Models
https://doc.babylonjs.com/toolsAndResources/assetLibraries/availableMeshes
FBX combine animations in blender then export to glb (it's a pain, but works), see below examples
If using blender 'stash' all the animations so they will be included on glb export
https://forum.babylonjs.com/t/combining-mixamo-animations-into-a-single-glb-usin...
This has not worked for me, but it would be great if someone could figure it out: https://gamefromscratch.com/mixamo-character-animation-combiner/
https://www.donmccurdy.com/2017/11/06/creating-animated-gltf-characters-with-mix...