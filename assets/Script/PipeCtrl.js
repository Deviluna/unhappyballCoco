cc.Class({
    extends: cc.Component,

    properties: {
                Speed: 0,

    },

    // use this for initialization
    onLoad: function () {

    },

     update: function (dt) {
        this.node.x-=this.Speed*dt;
     },
});
