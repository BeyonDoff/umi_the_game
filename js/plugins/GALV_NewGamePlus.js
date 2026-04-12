//-----------------------------------------------------------------------------
//  Galv's New Game Plus
//-----------------------------------------------------------------------------
//  For: RPGMAKER MV
//  GALV_NewGamePlus.js
//-----------------------------------------------------------------------------
//  2016-06-26 - Version 1.0 - release
//-----------------------------------------------------------------------------
// Terms can be found at:
// galvs-scripts.com
//-----------------------------------------------------------------------------

var Imported = Imported || {};
Imported.Galv_NewGamePlus = true;

var Galv = Galv || {};            // Galv's main object
Galv.NEWGP = Galv.NEWGP || {};        // Galv's stuff

//-----------------------------------------------------------------------------
/*:
 * @plugindesc 多周目系统
 * 
 * @author Galv - galvs-scripts.com   汉化:硕明云书
 *
 * @param Command Text
 * @text 标题显示文本
 * @desc Text displayed in title command window when a saved file is able to do New Game Plus
 * @default 新的冒险+
 *
 * @param Help Text
 * @text 帮助说明文本
 * @desc Text displayed in top help box when selecting a save file to use for a New Game Plus
 * @default 选择保存文件以开始新的冒险+
 *
 * @param Active Icon
 * @text 活动图标
 * @desc 如果激活游戏以使用新游戏plus，则显示在保存文件列表中的图标
 * @default 245
 *
 * @param Active Icon XY
 * @text 活动图标XY
 * @desc Position of the active icon in the save file list
 * x,y
 * @default 40,40
 *
 * @param NGP Icon
 * @text NGP图标
 * @desc 如果游戏是新游戏+游戏，则显示在保存文件列表中的图标
 * @default 190
 *
 * @param NGP Icon XY
 * @text NGP图标坐标
 * @desc Position of the New Game+ icon in the save file list
 * @default 0,40
 *
 * @param --------------
 * @desc
 * @default
 *
 * @param Max Gold
 * @text Max金钱
 * @desc 玩家可以从保存游戏中保留的最大金币数量-1保留所有内容。
 * @default -1
 *
 * @param Actor List
 * @text 参与者列表
 * @desc 角色存储ID
 * @default
 *
 * @param --------------
 * @text 类型
 * @desc
 * @default
 *
 * @param Variable Type
 * @text 变量类型
 * @desc 0 = 仅变量列表中的变量
 * 1 = 除变量列表外的所有变量
 * @default 0
 *
 * @param Variable List
 * @text 变量列表
 * @desc 逗号分隔的变量将保留在新游戏中+
 * @default
 *
 * @param Switch Type
 * @text 开关编号
 * @desc 0 = 仅开关列表中的开关编号
 * 1 = All switches excluding the switch list
 * @default 0
 *
 * @param Switch List
 * @text 开关列表
 * @desc Comma separated switches that will keep in new game+
 * Use a switch ID for single or a dash to separate a range.
 * @default
 *
 * @param Item Type
 * @text 项目类型
 * @desc 0 = 仅项目列表中的项目
 * 1 = 除项目列表外的所有项目
 * @default 0
 *
 * @param Item List
 * @text 项目表
 * @desc Comma separated item ids that will keep in new game+
 * Use an item ID for single or a dash to separate a range.
 * @default
 *
 * @param Weapon Type
 * @text 武器类型
 * @desc 0 = Only weapons in the weapon list
 * 1 = All weapons excluding the weapon list
 * @default 0
 *
 * @param Weapon List
 * @text 武器列表
 * @desc Comma separated weapon ids that will keep in new game+
 * Use a weapon ID for single or a dash to separate a range.
 * @default
 *
 * @param Armor Type
 * @text 护甲类型
 * @desc 0 = Only armors in the armor list
 * 1 = All armors excluding the armor list
 * @default 0
 *
 * @param Armor List
 * @text 护甲列表
 * @desc Comma separated armor ids that will keep in new game+
 * Use an armor ID for single or a dash to separate a range.
 * @default
 *
 * @help
 *   
 * ----------------------------------------------------------------------------
 * 允许玩家使用他们之前玩过的某些东西来重新玩游戏。
 * ----------------------------------------------------------------------------
 *
 *       Galv.NEWGP.activate();   //记录存档 -  后面记得存档
 *       $gameSystem.newGamePlus  //周目判断记录
 *       Galv.NEWGP.isReplay()    //分歧判断
 *
 *
 * ----------------------------------------------------------------------------
 * 插件设置
 * ----------------------------------------------------------------------------
 * 变量
 * ---------
 * 变量列表设置以及变量类型设置控件
 * 变量从保存文件传输到新的game+。
 *
 * 变量列表示例：
 * 34,56,90            // 3个变量的列表
 * 1-20,60-80          // 范围1-20和60-80之间的变量列表
 * 1-20,60-80,56,90    // 范围之间的变量列表加上2个变量
 *
 * 变量类型示例：
 * 0  //仅变量列表中的变量
 * 1  // 所有变量，不包括变量列表中的变量
 *
 * 开关
 * --------
 * 当您开始新游戏时，所有开关在Rpg Maker中默认启动为OFF。
 * 使用开关列表和
 * 切换类型插件设置，用于控制切换的开关。
 *
 * ----------------------------------------------------------------------------
 *   脚本调用
 * ----------------------------------------------------------------------------
 *
 *     Galv.NEWGP.activate();   // 激活游戏的新游戏+功能
 *                              // (玩家在此之后需要保存)
 *
 * ----------------------------------------------------------------------------
 *   条件分支-脚本：
 * ----------------------------------------------------------------------------
 *
 *     Galv.NEWGP.isReplay()       // 如果玩家正在玩新游戏+游戏
 *     Galv.NEWGP.isReplay(x)      // 如果是新游戏+玩家x
 *     Galv.NEWGP.isReplay(a,b)    // 如果是a和b之间的过场
 *
 *     Galv.NEWGP.isActive()       // 如果新游戏+在当前游戏中处于活动状态
 *
 * ----------------------------------------------------------------------------
 *   控制变量-脚本
 * ----------------------------------------------------------------------------
 *
 *    $gameSystem.newGamePlus   // 返回NewGame+的次数
 *                              // 已用于当前播放的文件
 */

//-----------------------------------------------------------------------------
// 代码
//-----------------------------------------------------------------------------

(function() {

Galv.NEWGP.newGameTxt = PluginManager.parameters('Galv_NewGamePlus')["Command Text"];
Galv.NEWGP.helpTxt = PluginManager.parameters('Galv_NewGamePlus')["Help Text"];
Galv.NEWGP.icon = Number(PluginManager.parameters('Galv_NewGamePlus')["Active Icon"]);
Galv.NEWGP.iconNGP = Number(PluginManager.parameters('Galv_NewGamePlus')["NGP Icon"]);
Galv.NEWGP.maxGold = Number(PluginManager.parameters('Galv_NewGamePlus')["Max Gold"]);

var txt = PluginManager.parameters('Galv_NewGamePlus')["Active Icon XY"].split(",");
Galv.NEWGP.iconXY = [Number(txt[0]),Number(txt[1])];

var txt = PluginManager.parameters('Galv_NewGamePlus')["NGP Icon XY"].split(",");
Galv.NEWGP.iconNGPXY = [Number(txt[0]),Number(txt[1])];


Galv.NEWGP.sortNumber = function(a,b) {
    return a - b;
};

Galv.NEWGP.makeList = function(string) {
	var list = string.split(",");
	var finalList = {'ids':[], 'ranges':[]};
	
	for (var i = 0; i < list.length; i++) {
		var number = Number(list[i]);
		if (isNaN(list[i])) {
			// create range
			var range = list[i].split("-");
			range = [Number(range[0]),Number(range[1])];
			range.sort(Galv.NEWGP.sortNumber);
			finalList.ranges.push(range);
		} else {
			// Add number
			finalList.ids.push(number);
		};
	}
	return finalList;
};


Galv.NEWGP.varType = Number(PluginManager.parameters('Galv_NewGamePlus')["Variable Type"]);
Galv.NEWGP.varList = Galv.NEWGP.makeList(PluginManager.parameters('Galv_NewGamePlus')["Variable List"]);

Galv.NEWGP.swiType = Number(PluginManager.parameters('Galv_NewGamePlus')["Switch Type"]);
Galv.NEWGP.swiList = Galv.NEWGP.makeList(PluginManager.parameters('Galv_NewGamePlus')["Switch List"]);

Galv.NEWGP.itemType = Number(PluginManager.parameters('Galv_NewGamePlus')["Item Type"]);
Galv.NEWGP.itemList = Galv.NEWGP.makeList(PluginManager.parameters('Galv_NewGamePlus')["Item List"]);

Galv.NEWGP.weaponType = Number(PluginManager.parameters('Galv_NewGamePlus')["Weapon Type"]);
Galv.NEWGP.weaponList = Galv.NEWGP.makeList(PluginManager.parameters('Galv_NewGamePlus')["Weapon List"]);

Galv.NEWGP.armorType = Number(PluginManager.parameters('Galv_NewGamePlus')["Armor Type"]);
Galv.NEWGP.armorList = Galv.NEWGP.makeList(PluginManager.parameters('Galv_NewGamePlus')["Armor List"]);

Galv.NEWGP.actorList = Galv.NEWGP.makeList(PluginManager.parameters('Galv_NewGamePlus')["Actor List"]);


Galv.NEWGP.activate = function() {
	$gameSystem.gameCompleted = true;
};

Galv.NEWGP.buildFinishedSaveList = function() {
	Galv.NEWGP.games = false;
	var count = DataManager.maxSavefiles();
	
	for (var i = 0; i < count; i++) {
		var valid = DataManager.isThisGameFile(i + 1);
		if (valid) {
			var game = DataManager.buildNewGamePlusData(i + 1);
			if (game.System.gameCompleted) {
				Galv.NEWGP.games = Galv.NEWGP.games || {};
				Galv.NEWGP.games[i + 1] = game;
			};
		};
	};
};

Galv.NEWGP.setupNewGamePlus = function() {
	var game = Galv.NEWGP.newGameSaveFile;
	
	// GAME SYSTEM
	$gameSystem = game.System;             // Duplicate Game System
	$gameSystem.newGamePlus += 1;          // Increase new game plus number
	$gameSystem.gameCompleted = false;     // Remove completed.
	Galv.NEWGP.newGameSaveFile = 0;
	
	// GAME PARTY
	var maxGold = Galv.NEWGP.maxGold < 0 ? game.Party._gold : Galv.NEWGP.maxGold;
	$gameParty._gold = Math.min(game.Party._gold,maxGold);
	
	// GAME VARIABLES
	this.setVariables(game);
	
	// GAME SWITCHES
	this.setSwitches(game);

	// GAME ACTORS
	this.setActors(game);
	
	// GAME ITEMS
	this.setItems(game,'item');
	this.setItems(game,'weapon');
	this.setItems(game,'armor');

};

// GAME VARIABLES
Galv.NEWGP.setVariables = function(game) {
	if (Galv.NEWGP.varType == 0) { // Only transfer List
		for (var i = 0; i < Galv.NEWGP.varList.ids.length; i++) {    // constants
			$gameVariables._data[Galv.NEWGP.varList.ids[i]] = game.Variables._data[Galv.NEWGP.varList.ids[i]];
		};
		for (var i = 0; i < Galv.NEWGP.varList.ranges.length; i++) { // ranges
			var range = Galv.NEWGP.varList.ranges[i];
			for (var r = range[0]; r <= range[1]; r++) {
				$gameVariables._data[r] = game.Variables._data[r];
			};
		};
	} else if (Galv.NEWGP.varType == 1) { // Transfer all EXCEPT list
		// change ALL variables
		$gameVariables = game.Variables;
		
		// then set excluded variables back to 0
		for (var i = 0; i < Galv.NEWGP.varList.ids.length; i++) {    // constants
			$gameVariables._data[Galv.NEWGP.varList.ids[i]] = 0;
		};
		for (var i = 0; i < Galv.NEWGP.varList.ranges.length; i++) { // ranges
			var range = Galv.NEWGP.varList.ranges[i];
			for (var r = range[0]; r <= range[1]; r++) {
				$gameVariables._data[r] = 0;
			};
		};
	};
};

// GAME SWITCHES
Galv.NEWGP.setSwitches = function(game) {
	if (Galv.NEWGP.swiType == 0) { // Only transfer List
		for (var i = 0; i < Galv.NEWGP.swiList.ids.length; i++) {    // constants
			// change all constant variables
			$gameSwitches._data[Galv.NEWGP.swiList.ids[i]] = game.Switches._data[Galv.NEWGP.swiList.ids[i]];
		};
		for (var i = 0; i < Galv.NEWGP.swiList.ranges.length; i++) { // ranages
			var range = Galv.NEWGP.swiList.ranges[i];
			for (var r = range[0]; r <= range[1]; r++) {
				$gameSwitches._data[r] = game.Switches._data[r];
			};
		};
	} else if (Galv.NEWGP.swiType == 1) { // Transfer all EXCEPT list
		// change ALL variables
		$gameSwitches = game.Switches;
		
		// then set excluded variables back to 0
		for (var i = 0; i < Galv.NEWGP.swiList.ids.length; i++) {    // constants
			$gameSwitches._data[Galv.NEWGP.swiList.ids[i]] = false;
		};
		for (var i = 0; i < Galv.NEWGP.swiList.ranges.length; i++) { // ranges
			var range = Galv.NEWGP.swiList.ranges[i];
			for (var r = range[0]; r <= range[1]; r++) {
				$gameSwitches._data[r] = false;
			};
		};
	};
};

// GAME ACTORS
Galv.NEWGP.setActors = function(game) {
	for (var i = 0; i < Galv.NEWGP.actorList.ids.length; i++) {    // constants
		$gameActors._data[Galv.NEWGP.actorList.ids[i]] = game.Actors._data[Galv.NEWGP.actorList.ids[i]];
	};
	for (var i = 0; i < Galv.NEWGP.actorList.ranges.length; i++) { // ranges
		var range = Galv.NEWGP.actorList.ranges[i];
		for (var r = range[0]; r <= range[1]; r++) {
			$gameActors._data[r] = game.Actors._data[r];
		};
	};
};


// GAME ITEMS / WEAPONS / ARMORS
Galv.NEWGP.setItems = function(game, iType) {
	var type = Galv.NEWGP[iType + 'Type'];
	var list = Galv.NEWGP[iType + 'List'];
	
	switch (iType) {
		case 'item':
			var itemBox = '_items';
			var itemData = $dataItems;
			break;
		case 'weapon':
			var itemBox = '_weapons';
			var itemData = $dataWeapons;
			break;
		case 'armor':
			var itemBox = '_armors';
			var itemData = $dataArmors;
			break;
	};
	
	if (type == 0) { // Only transfer List
		for (var i = 0; i < list.ids.length; i++) {    // constants
			var itemId = list.ids[i];
			var itemAmount = game.Party[itemBox][itemId];
			if (itemAmount) $gameParty.gainItem(itemData[itemId], itemAmount);
		};
		for (var i = 0; i < list.ranges.length; i++) { // ranges
			var range = list.ranges[i];
			for (var r = range[0]; r <= range[1]; r++) {
				var itemAmount = game.Party[itemBox][r];
				if (itemAmount) $gameParty.gainItem(itemData[r], itemAmount);
			};
		};
	} else if (type == 1) { // Transfer all EXCEPT list
		// change ALL items
		$gameParty[itemBox] = game.Party[itemBox];
		
		// then set excluded variables back to 0
		for (var i = 0; i < list.ids.length; i++) {    // constants
			var itemId = list.ids[i];
			if (itemAmount) $gameParty.gainItem(itemData[itemId], -game.Party[itemBox][itemId]);
		};
		for (var i = 0; i < list.ranges.length; i++) { // ranges
			var range = list.ranges[i];
			for (var r = range[0]; r <= range[1]; r++) {
				$gameParty.gainItem(itemData[r], -game.Party[itemBox][r]);
			};
		};
	};
};



Galv.NEWGP.isActive = function() {
	return $gameSystem.gameCompleted;
};

Galv.NEWGP.isReplay = function(a,b) {
	if (!a && !b) {
		return $gameSystem.newGamePlus > 0;
	} else if (!b) {
		return $gameSystem.newGamePlus == b;
	} else {
		if (b < 0) {
			// infinite
			return $gameSystem.newGamePlus > a;
		} else {
			var array = [a,b];
			array.sort(Galv.NEWGP.sortNumber);
			return ($gameSystem.newGamePlus > array[0] && $gameSystem.newGamePlus < array[1]);
		};
	};
};


// DATA MANAGER
//-----------------------------------------------------------------------------

Galv.NEWGP.DataManager_setupNewGame = DataManager.setupNewGame;
DataManager.setupNewGame = function() {
	Galv.NEWGP.DataManager_setupNewGame.call(this);
	if (Galv.NEWGP.newGameSaveFile) Galv.NEWGP.setupNewGamePlus();
};

DataManager.buildNewGamePlusData = function(savefileId) {
	var newGameData = {};
    var globalInfo = this.loadGlobalInfo();
    if (this.isThisGameFile(savefileId)) {
        var json = StorageManager.load(savefileId);
        newGameData = this.buildViewableSaveContents(JsonEx.parse(json));
        return newGameData;
    } else {
        return false;
    }
};

DataManager.buildViewableSaveContents = function(contents) {
	var obj = {};
    obj.System        = contents.system;
    obj.Switches      = contents.switches;
    obj.Variables     = contents.variables;
    obj.Actors        = contents.actors;
    obj.Party         = contents.party;
	return obj;
};

Galv.NEWGP.DataManager_makeSavefileInfo = DataManager.makeSavefileInfo;
DataManager.makeSavefileInfo = function() {
	var info = Galv.NEWGP.DataManager_makeSavefileInfo.call(this);
	info.newGamePlus = $gameSystem.newGamePlus;
	info.gameCompleted = $gameSystem.gameCompleted;
	return info;
};


// GAME SYSTEM
//-----------------------------------------------------------------------------

Galv.NEWGP.Game_System_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
	Galv.NEWGP.Game_System_initialize.call(this);
	this.newGamePlus = 0;  // Number of times game has been new game plussed
	this.gameCompleted = false;  //
};


// SCENE TITLE
//-----------------------------------------------------------------------------

Galv.NEWGP.Scene_Title_create = Scene_Title.prototype.create;
Scene_Title.prototype.create = function() {
	Galv.NEWGP.buildFinishedSaveList();
	Galv.NEWGP.newGameSaveFile = 0;
	Galv.NEWGP.Scene_Title_create.call(this);
	this._commandWindow.setHandler('newGamePlus',  this.commandNewGamePlus.bind(this));
};

Scene_Title.prototype.commandNewGamePlus = function() {
	this._commandWindow.close();
    SceneManager.push(Scene_LoadNGPlus);
};


// WINDOW TITLE COMMAND
//-----------------------------------------------------------------------------

Galv.NEWGP.Window_TitleCommand_makeCommandList = Window_TitleCommand.prototype.makeCommandList;
Window_TitleCommand.prototype.makeCommandList = function() {
    if (Galv.NEWGP.games) this.addCommand(Galv.NEWGP.newGameTxt, 'newGamePlus'); // Show command if any save file is "completed"
    Galv.NEWGP.Window_TitleCommand_makeCommandList.call(this);
};


// WINDOW SAVE FILE LIST
//-----------------------------------------------------------------------------

Galv.NEWGP.Window_SavefileList_drawContents = Window_SavefileList.prototype.drawContents;
Window_SavefileList.prototype.drawContents = function(info, rect, valid) {
	Galv.NEWGP.Window_SavefileList_drawContents.call(this,info,rect,valid);
	this.drawNewGamePlus(info,rect.x,rect.y,rect.width);
};

Window_SavefileList.prototype.drawNewGamePlus = function(info, x, y, width) {
	if (info.gameCompleted) {
		// completed game icon
		this.drawIcon(Galv.NEWGP.icon,x + Galv.NEWGP.iconXY[0],y + Galv.NEWGP.iconXY[1]);
	}
	var NGPnumber = info.newGamePlus ? info.newGamePlus : 0;
	if (NGPnumber > 0) {
		// new game plus icon
		this.drawIcon(Galv.NEWGP.iconNGP,x + Galv.NEWGP.iconNGPXY[0],y + Galv.NEWGP.iconNGPXY[1]);
		// draw number
		if (NGPnumber > 1) {
			this.contents.fontSize = 16;
			this.drawText(NGPnumber,x + Galv.NEWGP.iconNGPXY[0] + 3,y + Galv.NEWGP.iconNGPXY[1] + 10,Window_Base._iconWidth,'right');
			this.resetFontSettings();
		};
	}
};

})();


// Scene_LoadNGPlus
//-----------------------------------------------------------------------------

function Scene_LoadNGPlus() {
    this.initialize.apply(this, arguments);
}

Scene_LoadNGPlus.prototype = Object.create(Scene_File.prototype);
Scene_LoadNGPlus.prototype.constructor = Scene_LoadNGPlus;

Scene_LoadNGPlus.prototype.helpWindowText = function() {
    return Galv.NEWGP.helpTxt;
};

Scene_LoadNGPlus.prototype.firstSavefileIndex = function() {
    return 0;
};

Scene_LoadNGPlus.prototype.onSavefileOk = function() {
	if (Galv.NEWGP.games[this._listWindow._index + 1]) {
		Galv.NEWGP.newGameSaveFile = Galv.NEWGP.games[this._listWindow._index + 1];
		SoundManager.playLoad();
		DataManager.setupNewGame();
		this.fadeOutAll();
		SceneManager.goto(Scene_Map);
	} else {
		SoundManager.playBuzzer();
		this.activateListWindow();
	};
};