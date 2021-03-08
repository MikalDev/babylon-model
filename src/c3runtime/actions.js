"use strict";

{
    C3.Plugins.Mikal_BabylonModel.Acts = {
        async loadFile(fileName)
        {
            const engine = this._sdkType.engine;
            const asset = this.GetRuntime().GetAssetManager();
            const renderer = this._renderer;
            const uri = await asset.GetProjectFileUrl(fileName);
            const uriElements = uri.split('/');
            let name = uriElements[uriElements.length-1];
            const root = uri.replace(name,"");

            // Get global scene
            let scene = this._sdkType.scene;

            BABYLON.SceneLoader.ShowLoadingScreen = false;
            // The first parameter can be used to specify which mesh to import. Here we import all meshes
            //    BABYLON.SceneLoader.Append("https://models.babylonjs.com/", "alien.glb", scene, function (newMeshes) {
            scene = await BABYLON.SceneLoader.AppendAsync(root, name, scene);
            console.log('[BM] scene', scene);
            scene.meshes.forEach((mesh) => 
            {
                if (mesh.id == '__root__')
                {
                    this.root = mesh;
                    this.root.id = '__root__'+this.GetInstance().GetUID();
                    console.log('[BM] Root mesh:',mesh);
                }
            });
            this._sdkType.addMesh(this.root);
            this.root.normalizeToUnitCube(true,false);
            this.root.position.z = 1000*(this._sdkType.count-1);
            if (!scene.lights.length)
            {
                scene.activeCamera = [];
                scene.createDefaultLight(true, true, true);
                scene.clearColor = new BABYLON.Color4(0.0, 0.0, 0.0, 0.0);
                scene.lights[0].intensity=10.0;
                this._sdkType.light = scene.lights[0];
                console.log('[BM] light',scene.lights[0]);
                scene.lights[0].groundColor = new BABYLON.Color3(1.0, 1.0, 1.0);
                scene.lights[0].specular = new BABYLON.Color3.White();
                // For PBR textures, loads skybox from CDN
            }

            let boundingVectors = this.root.getHierarchyBoundingVectors(true);
            let centerVector = boundingVectors.max.add(boundingVectors.min);
            centerVector = centerVector.divide(new BABYLON.Vector3(2,2,2));

            this.root.position.y = - centerVector.y;

            // console.log('[BM] center',this.root.getHierarchyBoundingVectors(true))

            // console.log('[BM] meshes',scene.meshes);

            this.camera = new BABYLON.ArcRotateCamera("Camera", 0,0, 10, new BABYLON.Vector3(0, 0, 1000*(this._sdkType.count-1)), scene);
            this.camera.viewport = new BABYLON.Viewport((this._sdkType.count-1)%8*0.125, Math.floor((this._sdkType.count-1)/8)*0.125, 0.125, 0.125);
            this.camera.lowerBetaLimit = -360; 
            this.camera.lowerAlphaLimit = -360;
            this.camera.maxZ = 200;
            scene.activeCameras.push(this.camera);
            this.index = this._sdkType.count-1;
            
            // console.log('[BM] scene',scene);

            this.animationInfo = this._sdkType.updateAnimations();
            console.log('[BM] animationInfo:', this.animationInfo);

            this.modelLoaded = true;
            this.Trigger(C3.Plugins.Mikal_BabylonModel.Cnds.onModelLoaded)
            // this.scene.createDefaultCamera(true, true, true);
            // this.light = new BABYLON.HemisphericLight("HemiLight"&this.GetInstance().GetUID(), new BABYLON.Vector3(0, 1, 0), this.scene);
            // this.light.diffuse = new BABYLON.Color3(0, 1, 1);
            // this.light.groundColor = new BABYLON.Color3(0, 1, 1);
            // this.scene.activeCamera.inputs.clear(); 
            // scene.meshes[0].setPositionWithLocalVector(new BABYLON.Vector3(200*Math.random(), 0, 0 ))
            // console.log('[BM], pos:',scene.meshes[0].getPositionExpressedInLocalSpace());
        },

        setCameraAlpha(alpha)
        {
            if (!this.modelLoaded) return;
            this.camera.alpha = alpha * 0.0174533;
        },

        setCameraBeta(beta)
        {
            if (!this.modelLoaded) return;
            this.camera.beta = beta * 0.0174533;
        },

        setCameraRadius(radius)
        {
            if (!this.modelLoaded) return;
            this.camera.radius = radius;
        },

        playAnimation(name, loop)
        {
            if (!this.modelLoaded) return;
            if (this.currentAnimation)
            {
                this.currentAnimation.stop();
                this.currentAnimation.onAnimationGroupEndObservable.clear();
            } 
            let group = this.getAnimationGroupByName(name);
            console.log('[BM] group:', group)
            // Check if animation not found
            if (!group) return;
            group.play(loop);
            this.currentAnimation = group;
            group.onAnimationGroupEndObservable.add((request) => {
                this.animationFinished = this.currentAnimationName;
                this.Trigger(C3.Plugins.Mikal_BabylonModel.Cnds.onAnimationFinished);
            });
            this.currentAnimationName = name;
        },

        stopAnimation(name)
        {
            if (!this.modelLoaded) return;
            let group = this.getAnimationGroupByName(name);
            if (!group) return;
            group.stop();
        },

        setAnimationSpeedRatio(speedRatio)
        {
            if (!this.currentAnimation) return;
            this.currentAnimation.speedRatio = speedRatio;
        },

        setLightIntensity(intensity)
        {
            if (!this.modelLoaded) return;
            this._sdkType.light.intensity = intensity;
        },

        setZElevation(zElevation)
        {
            this.GetWorldInfo().SetZElevation(zElevation);
        },

        setLightDiffuseColor(r,g,b)
        {
            let scene = this._sdkType.scene;
            if (!scene) return
            if (!scene.lights.length) return

            let light = scene.lights[0];
            light.diffuse = new BABYLON.Color3(r/100, g/100, b/100);
        },

        setLightGroundColor(r,g,b)
        {
            let scene = this._sdkType.scene;
            if (!scene) return
            if (!scene.lights.length) return

            let light = scene.lights[0];
            light.groundColor = new BABYLON.Color3(r/100, g/100, b/100);
        },
        setLightSpecularColor(r,g,b)
        {
            let scene = this._sdkType.scene;
            if (!scene) return
            if (!scene.lights.length) return

            let light = scene.lights[0];
            light.specular = new BABYLON.Color3(r/100, g/100, b/100);
        }
    };
}