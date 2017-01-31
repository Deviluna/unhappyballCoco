cc.Class({
    extends: cc.Component,

    properties: {
        jumpHeight: 0,
        jumpDuration: 0,
        accel: 0,
        gravity: 0,
    },

    setInputControl: function () {
        var self = this;
        // 添加键盘事件监听
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            // 有按键按下时，判断是否是我们指定的方向控制键，并设置向对应方向加速
            onKeyPressed: function(keyCode, event) {
                   switch(keyCode) {
                    case cc.KEY.space:
                            self.tojump=true;
                        break;
                  
                }
            },
            onKeyReleased: function(keyCode, event) {
            }
        }, self.node);
    },
    
    onCollisionEnter: function (other) {
        this.node.color = cc.Color.RED;
        this.touchingNumber ++;

    },
    onCollisionExit: function () {
        this.touchingNumber --;
        if (this.touchingNumber === 0) {
            this.node.color = cc.Color.WHITE;
        }
        
    },
    
    onLoad: function () {
    this.jump=false;
    this.ySpeed = 100;
    var jumpUp = cc.moveBy(this.jumpDuration, cc.p(0, this.jumpHeight)).easing(cc.easeCubicActionOut());
    this.node.runAction(jumpUp);    
    this.setInputControl();
    
    cc.director.getCollisionManager().enabled = true;
    cc.director.getCollisionManager().enabledDebugDraw = true;
    this.touchingNumber = 0;

    },

    update: function (dt) {
     if (this.tojump) {
        var jumpUp = cc.moveBy(this.jumpDuration, cc.p(0, this.jumpHeight)).easing(cc.easeCubicActionOut());
        this.node.runAction(jumpUp);
        this.ySpeed=0;
        this.tojump=false; 
     }
     else {
         this.ySpeed+=this.gravity*dt;
         this.node.y-=this.ySpeed*dt;
     
         
     }
         
     },
});
