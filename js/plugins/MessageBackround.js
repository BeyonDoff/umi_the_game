/*:
* @target MZ
* @author Erebos
* @plugindesc 对话框背景[添加姓名框背景]
* @url 暂时没有
*
* @param 对话框图像名称
* @desc 设置对话框图像名称
* 预设值 log
* @default log
*
* @param 信息框X
* @desc 设置对话框的X
* 预设值 0
* @default 0
*
* @param 信息框Y
* @desc 设置对话框的Y
* 预设值 0
* @default 0
*
* @param 姓名图像名称
* @desc 设置姓名框图像名称
* 预设值 name
* @default name
*
* @param 姓名框X
* @desc 设置姓名框的X
* 预设值 0
* @default 0
*
* @param 姓名框Y
* @desc 设置姓名框的Y
* 预设值 0
* @default 0
*/
(() => {
    // ---------------------------------------------------------------------------
    //                信息框背景
    // ---------------------------------------------------------------------------
	var SIAKOMobi = PluginManager.parameters('MessageBackround');
    const messageBackground = Scene_Message.prototype.createMessageWindow;
    Scene_Message.prototype.createMessageWindow = function() {
        messageBackground.call(this);
        this.createMessageBg();
    };

    Scene_Message.prototype.createMessageBg = function() {
        this._msgBg = new Sprite(ImageManager.loadSystem(SIAKOMobi['对话框图像名称']));
        this._msgBg.x = Number(SIAKOMobi['信息框X']||0);
        this._msgBg.y = Number(SIAKOMobi['信息框Y']||0);
        this._msgBg.scale.x = this._messageWindow.width / 1280;
        this._msgBg.scale.y = this._messageWindow.height / 300;
        this._messageWindow.addChildToBack(this._msgBg);
    };

    Window_Message.prototype.setBackgroundType = function() {
        this.opacity = 0;
        this.opacity = 0;
    };

    // ---------------------------------------------------------------------------
    //                名字框背景
    // ---------------------------------------------------------------------------
    const nameBox = Scene_Message.prototype.createNameBoxWindow;
    Scene_Message.prototype.createNameBoxWindow = function() {
        nameBox.call(this);
        this.createNameBg();
    };

    Scene_Message.prototype.createNameBg = function() {
        this._nameBg = new Sprite(ImageManager.loadSystem(SIAKOMobi['姓名图像名称']));
        this._nameBg.x = Number(SIAKOMobi['姓名框X']||0);
        this._nameBg.y = Number(SIAKOMobi['姓名框Y']||0);
        this._nameBoxWindow.addChildToBack(this._nameBg);
    };

    Window_NameBox.prototype.setBackgroundType = function() {
        this.opacity = 0;
    };

    // ---------------------------------------------------------------------------
    //                刷新
    // ---------------------------------------------------------------------------
    const update = Scene_Message.prototype.update;
    Scene_Message.prototype.update = function() {
        update.call(this);
        this._nameBg.scale.x = this._nameBoxWindow.windowWidth() / 100;
        this._nameBg.scale.y = this._nameBoxWindow.windowHeight() / 20;
    };

})();