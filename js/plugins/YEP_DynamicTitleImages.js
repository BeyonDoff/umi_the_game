//=============================================================================
// Yanfly Engine Plugins - Dynamic Title Images
// YEP_DynamicTitleImages.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_DynamicTitleImages = true;

var Yanfly = Yanfly || {};
Yanfly.DTI = Yanfly.DTI || {};
Yanfly.DTI.version = 1.00;

//=============================================================================
 /*:
 * @plugindesc 【YEP❀实用类】游戏进度变更标题图像|YEP_DynamicTitleImages.js
 * @author Yanfly Engine Plugins
 *
 * @help
 * ============================================================================
 * ▼ 介绍
 * ============================================================================
 * 根据游戏的进展程度更改标题图像
 *
 * ============================================================================
 * ▼ 说明
 * ============================================================================
 *
 *选择将显示的标题屏幕图像非常简单。默认情况下，
 *将显示的图像将是在设置中应用的图像。
 *但如果你想在玩家到达某一点时控制它
 *您的游戏，在事件中输入这些插件命令，以确定哪些图像
 *将在玩家下次查看标题屏幕时显示：
 *
 * 插件命令：
 *
 * ChangeTitle1 filename
 * ChangeTitle2 filename
 * -将“filename”替换为“titles1”中找到的图像文件名，或
 * “titles2”文件夹。确保文件名与
 * 显示为区分大小写。一旦事件运行此插件命令
 * 下次玩家访问标题屏幕时，新图像将出现。
 *
 * ClearChangeTitle1
 * ClearChangeTitle2
 * -这将分别将Title1或Title2图像恢复为默认值。
 * 玩家将看到应用于游戏的数据库设置。
 *
 * ============================================================================
 * ▼ 更新
 * ============================================================================
 *
 * Version 1.00:
 * - Finished Plugin!
 *
 * ============================================================================
 *  YEP官网：http://yanfly.moe/yep
 *  插件作者：Yanfly
 *  汉化插件：云书 
 *  使用条款：除非另有说明，否则 Yanfly 
 *  制作的任何原始材料均可免费用于免费和商业 RPG Maker 游戏。
 *  要求你在你的游戏致谢名单中提供“Yanfly”或“Yanfly Engine”。
 *  使用条款：http://www.yanfly.moe/wiki/Category:Yanfly_Engine_Plugins#Terms_of_Use
 *  声明：仅用于汉化参考，如发布游戏到官网下载原版插件。
 *
 * @param RequireSaveGame
 * @text 需要保存游戏？
 * @type boolean
 * @on YES
 * @off NO
 * @desc 需要保存游戏才能显示自定义标题
 * 图像？如果没有，则使用默认图像。
 * @default false
 */
//=============================================================================

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_DynamicTitleImages');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.DTIRequireSaveGame = String(Yanfly.Parameters['RequireSaveGame']);
Yanfly.Param.DTIRequireSaveGame = eval(Yanfly.Param.DTIRequireSaveGame);

//=============================================================================
// ConfigManager
//=============================================================================

ConfigManager.title1ImageName = '';
ConfigManager.title2ImageName = '';

Yanfly.DTI.ConfigManager_makeData = ConfigManager.makeData;
ConfigManager.makeData = function() {
  var config = Yanfly.DTI.ConfigManager_makeData.call(this);
  config.title1ImageName = this.title1ImageName;
  config.title2ImageName = this.title2ImageName;
  return config;
};

Yanfly.DTI.ConfigManager_applyData = ConfigManager.applyData;
ConfigManager.applyData = function(config) {
  Yanfly.DTI.ConfigManager_applyData.call(this, config);
  this.title1ImageName = config.title1ImageName || '';
  this.title2ImageName = config.title2ImageName || '';
};

//=============================================================================
// Game_Interpreter
//=============================================================================

Yanfly.DTI.Game_Interpreter_pluginCommand =
  Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
  Yanfly.DTI.Game_Interpreter_pluginCommand.call(this, command, args);
  if (command === 'ChangeTitle1') {
    var filename = this.argsToString(args);
    ConfigManager.title1ImageName = filename;
    ConfigManager.save();
  } else if (command === 'ChangeTitle2') {
    var filename = this.argsToString(args);
    ConfigManager.title2ImageName = filename;
    ConfigManager.save();
  } else if (command === 'ClearChangeTitle1') {
    ConfigManager.title1ImageName = '';
    ConfigManager.save();
  } else if (command === 'ClearChangeTitle2') {
    ConfigManager.title2ImageName = '';
    ConfigManager.save();
  }
};

Game_Interpreter.prototype.argsToString = function(args) {
  var str = '';
  var length = args.length;
  for (var i = 0; i < length; ++i) {
    str += args[i] + ' ';
  }
  return str.trim();
};

//=============================================================================
// Scene_Title
//=============================================================================

Yanfly.DTI.Scene_Title_createBackground = Scene_Title.prototype.createBackground;
Scene_Title.prototype.createBackground = function() {
  var originalTitle1 = $dataSystem.title1Name;
  var originalTitle2 = $dataSystem.title2Name;
  this.changeTitleBackgroundImages();
  Yanfly.DTI.Scene_Title_createBackground.call(this);
  $dataSystem.title1Name = originalTitle1;
  $dataSystem.title2Name = originalTitle2;
}

Scene_Title.prototype.changeTitleBackgroundImages = function() {
  if (Yanfly.Param.DTIRequireSaveGame && !DataManager.isAnySavefileExists()) {
    return;
  }
  if (ConfigManager.title1ImageName) {
    $dataSystem.title1Name = ConfigManager.title1ImageName;
  }
  if (ConfigManager.title2ImageName) {
    $dataSystem.title2Name = ConfigManager.title2ImageName;
  }
};

//=============================================================================
// End of File
//=============================================================================