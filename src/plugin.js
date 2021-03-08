"use strict";

{
    const SDK = self.SDK;

    ////////////////////////////////////////////
    // The plugin ID is how Construct identifies different kinds of plugins.
    // *** NEVER CHANGE THE PLUGIN ID! ***
    // If you change the plugin ID after releasing the plugin, Construct will think it is an entirely different
    // plugin and assume it is incompatible with the old one, and YOU WILL BREAK ALL EXISTING PROJECTS USING THE PLUGIN.
    // Only the plugin name is displayed in the editor, so to rename your plugin change the name but NOT the ID.
    // If you want to completely replace a plugin, make it deprecated (it will be hidden but old projects keep working),
    // and create an entirely new plugin with a different plugin ID.
    const PLUGIN_ID = "Mikal_BabylonModel";
    ////////////////////////////////////////////

    const PLUGIN_VERSION = "0.3.1";
    const PLUGIN_CATEGORY = "general";

    let app = null;

    const PLUGIN_CLASS = SDK.Plugins.Mikal_BabylonModel = class BabylonModelPlugin extends SDK.IPluginBase
    {
        constructor()
        {
            super(PLUGIN_ID);

            SDK.Lang.PushContext("plugins." + PLUGIN_ID.toLowerCase());

            this._info.SetName(self.lang(".name"));
            this._info.SetDescription(self.lang(".description"));
            this._info.SetVersion(PLUGIN_VERSION);
            this._info.SetCategory(PLUGIN_CATEGORY);
            this._info.SetAuthor("Mikal");
            this._info.SetHelpUrl(self.lang(".help-url"));
            this._info.SetPluginType("world"); // mark as world plugin, which can draw
            this._info.SetIsResizable(true); // allow to be resized
            this._info.SetIsRotatable(true); // allow to be rotated
            this._info.SetHasImage(true);
            this._info.SetSupportsEffects(true); // allow effects
            this._info.SetMustPreDraw(false);
            this._info.AddCommonPositionACEs();
            this._info.AddCommonAngleACEs();
            this._info.AddCommonAppearanceACEs();
            this._info.AddCommonZOrderACEs();
            this._info.AddCommonSizeACEs();
            this._info.SetIsTiled(false);
            this._info.SetIsSingleGlobal(false);
            this._info.SetIsDeprecated(false);
            this._info.SetCanBeBundled(false);

            this._info.AddFileDependency(
            {
                filename: "c3runtime/babylon.max.js",
                type: "external-script"
            });

            this._info.AddFileDependency(
            {
                filename: "c3runtime/babylonjs.loaders.min.js",
                type: "external-script"
            });

            this._info.AddFileDependency(
            {
                filename: "c3runtime/pep.js",
                type: "external-script"
            });

            // Only support the newer C3 runtime
            this._info.SetSupportedRuntimes(["c3"]);

            SDK.Lang.PushContext(".properties");

            SDK.Lang.PopContext(); // .properties

            SDK.Lang.PopContext();
        }
    };

    PLUGIN_CLASS.Register(PLUGIN_ID, PLUGIN_CLASS);
}