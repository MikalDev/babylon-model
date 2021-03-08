"use strict";

{
    const C3 = self.C3;

    const tempQuad = new C3.Quad();

    C3.Plugins.Mikal_BabylonModel.Instance = class BabylonModelInstance extends C3.SDKWorldInstanceBase
    {
        constructor(inst, properties)
        {
            super(inst);

            const renderer = inst.GetRuntime().GetCanvasManager().GetWebGLRenderer();
            this._renderer = renderer;
            this._gl = renderer._gl;


            this.scene = null;
            this.texWidth = 0;
            this.texHeight = 0;
            this.index = 0;
            this.modelLoaded = false;
            this.currentAnimation = null;
            this.currentAnimationName = "";

            if (properties)
            {
                this._fileName = properties[0];
            }
        }

        Release()
        {
            super.Release();
        }

        Draw(renderer)
        {
            const imageInfo = this._objectClass.GetImageInfo();
            const texture = imageInfo.GetTexture();

            if (!texture) return; // dynamic texture load which hasn't completed yet; can't draw anything

            const wi = this.GetWorldInfo();
            const quad = wi.GetBoundingQuad();
            let rcTex = imageInfo.GetTexRect();

            // Create common teture if it does not exist
            if (!this._sdkType.c3Texture)
            {
                // Create texture for all instances to transfer canvas to
                let sampling = this.GetRuntime().GetSampling();
                let options =  { mipMap: false, sampling: sampling }
                this._sdkType.c3Texture = renderer.CreateDynamicTexture(2048, 2048, options);
            }

            // Only update global texture once per tick
            if (this._sdkType.lastTickcount != this.GetRuntime().GetTickCount())
            {
                renderer.UpdateTexture(this._sdkType.canvas, this._sdkType.c3Texture);
                this._sdkType.lastTickcount = this.GetRuntime().GetTickCount();
            }

            // Only use global texture once enabled
            if (this._sdkType.c3Texture)
            {
                // console.log('[BM] set texture')
                renderer.SetTexture(this._sdkType.c3Texture);
                let fullRect = new C3.Rect(this.index%8*0.125, 1-Math.floor(this.index/8)*0.1250, (this.index%8+1)*0.125, 1-(Math.floor((this.index)/8)+1)*0.125);
                // console.log('[BM] fullRect',fullRect);
                // let fullRect = new C3.Rect(0, 0, 1, 1);
                rcTex = fullRect;
            } else
            {
                renderer.SetTexture(texture);
            }

            if (this._runtime.IsPixelRoundingEnabled())
            {
                const ox = Math.round(wi.GetX()) - wi.GetX();
                const oy = Math.round(wi.GetY()) - wi.GetY();
                tempQuad.copy(quad);
                tempQuad.offset(ox, oy);
                renderer.Quad3(tempQuad, rcTex);
            }
            else
            {
                renderer.Quad3(quad, rcTex);
            }

            this.GetRuntime().UpdateRender()
        }

        getAnimationGroupByName(name)
        {
            const scene = this._sdkType.scene;

            if (!scene.animationGroups) return null;
            if (!this.animationInfo) return null;

            let groupFound = null;
            // Only look at animations associated with model loaded
            for (let index = this.animationInfo.index; index < this.animationInfo.index+this.animationInfo.count; index++)
            {
                let group = scene.animationGroups[index];
                // console.log('[BM] name', group.name);
                if (group.name == name) groupFound = group;
            }
            return groupFound;
        }

        SaveToJson()
        {
            return {
                // data to be saved for savegames
            };
        }

        LoadFromJson(o)
        {
            // load state for savegames
        }

        _SetTestProperty(n)
        {
            this._testProperty = n;
        }

        _GetTestProperty()
        {
            return this._testProperty;
        }

        GetScriptInterfaceClass()
        {
            return self.IMyDrawingPluginInstance;
        }

        Tick()
        {
        }
    };

    // Script interface. Use a WeakMap to safely hide the internal implementation details from the
    // caller using the script interface.
    const map = new WeakMap();

    self.IMyDrawingPluginInstance = class IMyDrawingPluginInstance extends self.IWorldInstance
    {
        constructor()
        {
            super();

            // Map by SDK instance
            map.set(this, self.IInstance._GetInitInst().GetSdkInstance());
        }

        // Example setter/getter property on script interface
        set testProperty(n)
        {
            map.get(this)._SetTestProperty(n);
        }

        get testProperty()
        {
            return map.get(this)._GetTestProperty();
        }
    };
}