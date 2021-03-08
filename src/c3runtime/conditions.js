"use strict";
{
    C3.Plugins.Mikal_BabylonModel.Cnds = {
        isModelLoaded()
        {
            return this.modelLoaded;
        },

        onModelLoaded()
        {
            return true;
        },

        isAnimationPlaying(animation)
        {
            if (this.currentAnimation && this.currentAnimationName == animation)
            {
                return this.currentAnimation.isPlaying;
            } else
            {
                return false
            }
        },

        onAnimationFinished(animation)
        {
            return this.animationFinished == animation;
        }

        };
}