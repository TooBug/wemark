var Remarkable = require('./remarkable');
var parser = new Remarkable({
	html: true
});

function parse(md, page, options){

	if(!options) options = {};
	if(!options.name) options.name = 'wemark';
	if(!options.imageWidth) {
		// 先写一个默认值
		var sysInfo = wx.getSystemInfoSync();
		options.imageWidth = sysInfo.windowWidth;
	}

	var tokens = parser.parse(md, {});

	// markdwon渲染列表
	var renderList = [];
	// 图片高度数组
	var imageHeight = {};
	// 返回的数据
	var ret = {
		renderList: renderList,
		imageHeight: imageHeight
	};

	var env = [];
	// 记录当前list深度
	var listLevel = 0;
	// 记录第N级ol的顺序
	var orderNum = [0, 0];
	var tmp;

	// 获取inline内容
	var getInlineContent = function(inlineToken){
		var ret = [];
		var env;

		if(inlineToken.type === 'htmlblock'){
			// 匹配video
			// 兼容video[src]和video > source[src]
			var videoRegExp = /<video.*?src\s*=\s*['"]*([^\s^'^"]+).*?(?:\/\s*\>|<\/video\>)/g;

			var match;
			var html = inlineToken.content.replace(/\n/g, '');
			while(match = videoRegExp.exec(html)){
				if(match[1]){
					ret.push({
						type: 'video',
						src: match[1]
					});
				}
			}
		}else{
			inlineToken.children.forEach(function(token, index){
				if(['text', 'code'].indexOf(token.type) > -1){
					ret.push({
						type: env || token.type,
						content: token.content
					});
					env = '';
			}else if(token.type === 'del_open'){
				env = 'deleted';
				}else if(token.type === 'strong_open'){
					env = 'strong';
				}else if(token.type === 'em_open'){
					env = 'em';
				}else if(token.type === 'image'){
					ret.push({
						type: token.type,
						src: token.src
					});
				}
			});
		}

		return ret;
	};

	var getBlockContent = function(blockToken, index){
		if(blockToken.type === 'htmlblock'){
			return getInlineContent(blockToken);
		}else if(blockToken.type === 'heading_open'){
			return {
				type: 'h' + blockToken.hLevel,
				content: getInlineContent(tokens[index+1])
			};
		}else if(blockToken.type === 'paragraph_open'){
			var type = 'p';
			var prefix = '';
			if(env.length){
				prefix = env.join('_') + '_';
			}

			var content = getInlineContent(tokens[index+1]);

			// 处理ol前的数字
			if(env[env.length - 1] === 'li' && env[env.length - 2] === 'ol'){
				content.unshift({
					type:'text',
					content:orderNum[listLevel - 1] + '. '
				});
			}

			return {
				type: prefix + 'p',
				content: content
			};
		}else if(blockToken.type === 'fence'){
			return {
				type: 'code',
				content: blockToken.content
			};
		}else if(blockToken.type === 'bullet_list_open'){
			env.push('ul');
			listLevel++;
		}else if(blockToken.type === 'ordered_list_open'){
			env.push('ol');
			listLevel++;
		}else if(blockToken.type === 'list_item_open'){
			env.push('li');
			if(env[env.length - 2] === 'ol' ){
				orderNum[listLevel - 1]++;
			}
		}else if(blockToken.type === 'list_item_close'){
			env.pop();
		}else if(blockToken.type === 'bullet_list_close'){
			env.pop();
			listLevel--;
		}else if(blockToken.type === 'ordered_list_close'){
			env.pop();
			listLevel--;
			orderNum[listLevel] = 0;
		}else if(blockToken.type === 'blockquote_open'){
			env.push('blockquote');
		}else if(blockToken.type === 'blockquote_close'){
			env.pop();
		}else if(blockToken.type === 'tr_open'){
			tmp = {
				type: 'table_tr',
				content:[]
			};
			return tmp;
		}else if(blockToken.type === 'th_open'){
			tmp.content.push({
				type: 'table_th',
				content: getInlineContent(tokens[index+1]).map(function(inline){return inline.content;}).join('')
			});
		}else if(blockToken.type === 'td_open'){
			tmp.content.push({
				type: 'table_td',
				content: getInlineContent(tokens[index+1]).map(function(inline){return inline.content;}).join('')
			});
		}
	};

	tokens.forEach(function(token, index){
		var blockContent = getBlockContent(token, index);
		if(Array.isArray(blockContent)){
			blockContent.forEach(function(block){
				renderList.push(block);
			});
		}else if(blockContent){
			renderList.push(blockContent);
		}
	});

	// 为page实例添加fixHeight方法
	page.wemarkFixImageHeight = function (e){
		var natureHeight = e.detail.height;
		var natureWidth = e.detail.width;
		var asp = natureHeight/natureWidth;
		var obj = {};
		obj[options.name + '.imageHeight.' + e.target.dataset.id] = options.imageWidth*asp;
		this.setData(obj);
	};

	var obj = {};
	obj[options.name] = ret;
	page.setData(obj);

}

module.exports = {
	parse: parse
};
