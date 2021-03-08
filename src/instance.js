"use strict";

{
    // 50x50 image
    let iconImage = "data:image/png;base64,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"
    const SDK = self.SDK;

    const PLUGIN_CLASS = SDK.Plugins.Mikal_BabylonModel;

    PLUGIN_CLASS.Instance = class BabylonModelInstance extends SDK.IWorldInstanceBase
    {
        constructor(sdkType, inst)
        {
            super(sdkType, inst);
            this._createTexture = true;
            this._texture = null;
            this._textureLoaded = false;
            this._iRenderer = null
        }

        Release()
        {}

        OnCreate()
        {}

        OnPlacedInLayout()
        {
            // Initialise to size of image
            this.OnMakeOriginalSize();
        }

        b64toBlob(dataURI) 
        {
            let byteString = atob(dataURI.split(',')[1]);
            let ab = new ArrayBuffer(byteString.length);
            let ia = new Uint8Array(ab);
            for (let i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);
            }
            return new Blob([ab], { type: 'image/png' });
        }

        Draw(iRenderer, iDrawParams)
        {
            if (this._createTexture)
            {
                this._iRenderer = iRenderer
                this._createTexture = false;
                this._texture = iRenderer.CreateDynamicTexture(50, 50, {mipMap: false});
                let imageBlob = this.b64toBlob(iconImage);
                let layoutView = iDrawParams.GetLayoutView()
                createImageBitmap(imageBlob).then((value) => {
                    iRenderer.UpdateTexture(value, this._texture,{});
                    this._textureLoaded = true;
                    this._inst.SetSize(250, 250)
                    layoutView.Refresh();
                });
            }
            if (this._textureLoaded)
            {
                const rcTex = new SDK.Rect(0, 0, 1, 1);
				this._inst.ApplyBlendMode(iRenderer);
                iRenderer.SetTexture(this._texture);
                iRenderer.Quad3(this._inst.GetQuad(), rcTex);
            }
            else
            {
                // render placeholder
                iRenderer.SetAlphaBlend();
                iRenderer.SetColorFillMode();

                if (this.HadTextureError()) iRenderer.SetColorRgba(0.25, 0, 0, 0.25);
                else iRenderer.SetColorRgba(0, 0, 0.1, 0.1);

                iRenderer.Quad(this._inst.GetQuad());
            }
        }

        GetTexture()
        {
            const image = this.GetObjectType().GetImage();
            return super.GetTexture(image);
        }

        IsOriginalSizeKnown()
        {
            return true;
        }

        GetOriginalWidth()
        {
            return this.GetObjectType().GetImage().GetWidth();
        }

        GetOriginalHeight()
        {
            return this.GetObjectType().GetImage().GetHeight();
        }

        OnMakeOriginalSize()
        {
            const image = this.GetObjectType().GetImage();
            this._inst.SetSize(image.GetWidth(), image.GetHeight());
        }

        HasDoubleTapHandler()
        {
            return true;
        }

        OnDoubleTap()
        {
            this.GetObjectType().EditImage();
        }

        OnPropertyChanged(id, value)
        {}

        LoadC2Property(name, valueString)
        {
            return false; // not handled
        }
    };
}