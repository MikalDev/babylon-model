"use strict";

{
    const SDK = self.SDK;

    const PLUGIN_CLASS = SDK.Plugins.Mikal_BabylonModel;

    PLUGIN_CLASS.Type = class BabylonModelPluginType extends SDK.ITypeBase
    {
        constructor(sdkPlugin, iObjectType)
        {
            super(sdkPlugin, iObjectType);
        }
    };
}