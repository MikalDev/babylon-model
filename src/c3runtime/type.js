"use strict";

{
    const C3 = self.C3;

    C3.Plugins.Mikal_BabylonModel.Type = class BabylonModelType extends C3.SDKTypeBase
    {
        constructor(objectClass)
        {
            super(objectClass);
            this.engine = null;
            this.scene = null;
            this.lastTickcount = 0;
            this.initializeEngine()
            this.scenes = [];
            this.views = [];
            this.meshes = [];
            this.c3Texture = null;
            this.count = 0;
            this.light = null;
            this.nextAnimationGroupIndex = 0;
        }

        addScene(scene, view)
        {
            this.scenes.push(scene);
            this.views.push(view);
        }

        addMesh(mesh)
        {
            this.meshes.push(mesh);
            this.count++;
        }

        updateAnimations()
        {
            // Review newly added animations, add blending
            // return start of animationGroups index and length
            if (!this.scene.animationGroups) return (
                {
                    index:0,
                    count:0
                }
            )
            for (let i = this.nextAnimationGroupIndex; i<this.scene.animationGroups.length;i++)
            {
                let group = this.scene.animationGroups[i];
                group.stop();
                for (let index = 0; index < group.targetedAnimations.length; index++) {
                    let animation = group.targetedAnimations[index].animation;
                    animation.enableBlending = true;
                    animation.blendingSpeed = 0.05;
                }

            }

            let index = this.nextAnimationGroupIndex;
            this.nextAnimationGroupIndex = this.scene.animationGroups.length

            return (
                {
                    index: index,
                    count: this.scene.animationGroups.length - index
                }
            );
        }

        Release()
        {
            super.Release();
        }

        OnCreate()
        {
            this.GetImageInfo().LoadAsset(this._runtime);
        }

        LoadTextures(renderer)
        {
            return this.GetImageInfo().LoadStaticTexture(renderer,
            {
                sampling: this._runtime.GetSampling()
            });
        }

        initializeEngine()
        {
            // Single engine and canvas for all instances
            this.canvas = document.createElement('canvas');
            const canvas = this.canvas;
            canvas.id = "canvas";
            canvas.width = 2048;
            canvas.height = 2048;
            canvas.style.zIndex = 100;
            canvas.style.position = "absolute";
            canvas.style.border = "0px solid";
            canvas.style.top = -99999;
            canvas.style.left = -99999;
            // canvas.style.top = 0;
            // canvas.style.left = 0;
            canvas.background = "transparent";
            var body = document.getElementsByTagName("body")[0];
            body.appendChild(canvas);	
            this.engine = new BABYLON.Engine(canvas, true);
            this.engine.hideLoadingUI();

            // Create scene to load to 
            this.scene = new BABYLON.Scene(this.engine);

            // Start render loop
            this.engine.runRenderLoop(() => {
                if (this.scene.activeCamera) this.scene.render();
            });

        }

        ReleaseTextures()
        {
            this.GetImageInfo().ReleaseTexture();
        }
    };
}