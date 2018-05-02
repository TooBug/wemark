var Remarkable = require('./remarkable');
var parser = new Remarkable({
    html: true
});

function parse(md) {
    var tokens = parser.parse(md, {});

    // markdwon渲染列表
    var renderList = [];
    // markdown包含的图片列表，用于预览
    var imageList = [];
    // 返回的数据
    var ret = {
        renderList: renderList,
        imageList: imageList
    };

    var env = [];
    // 记录当前list深度
    var listLevel = 0;
    // 记录第N级ol的顺序
    var orderNum = [0, 0];
    var tmp;

    // 获取inline内容
    var getInlineContent = function(inlineToken) {
        var ret = [];
        var env;

        if (inlineToken.type === 'htmlblock') {
            // 匹配video
            // 兼容video[src]和video > source[src]
            var videoRegExp = /<video.*?src\s*=\s*['"]*([^\s^'^"]+).*?(poster\s*=\s*['"]*([^\s^'^"]+).*?)?(?:\/\s*\>|<\/video\>)/g;

            var match;
            var html = inlineToken.content.replace(/\n/g, '');
            while (match = videoRegExp.exec(html)) {
                if (match[1]) {
                    var retParam = {
                        type: 'video',
                        src: match[1]
                    };

                    if (match[3]) {
                        retParam.poster = match[3];
                    }

                    ret.push(retParam);
                }
            }
        } else {
            inlineToken.children.forEach(function(token, index) {
                switch (token.type) {
                    case 'text':
                    case 'code':
                        ret.push({
                            type: env || token.type,
                            content: token.content
                        });
                        env = '';
                        break;
                    case 'del_open':
                        env = 'deleted';
                        break;
                    case 'strong_open':
                        env = 'strong';
                        break;
                    case 'em_open':
                        env = 'em';
                        break;
                    case 'image':
                        ret.push({
                            type: token.type,
                            src: token.src
                        });
                        imageList.push(token.src)
                        break;
                }
            });
        }

        return ret;
    };

    var getBlockContent = function(blockToken, index) {
        switch (blockToken.type) {
            case 'htmlblock':
                return getInlineContent(blockToken);
            case 'heading_open':
                return {
                    type: 'h' + blockToken.hLevel,
                    content: getInlineContent(tokens[index+1])
                };
            case 'paragraph_open':
                var type = 'p';
                var prefix = '';
                if (env.length) {
                    prefix = env.join('_') + '_';
                }

                var content = getInlineContent(tokens[index+1]);

                // 处理ol前的数字
                if (env[env.length - 1] === 'li' && env[env.length - 2] === 'ol') {
                    content.unshift({
                        type:'text',
                        content:orderNum[listLevel - 1] + '. '
                    });
                }

                return {
                    type: prefix + 'p',
                    content: content
                };
            case 'fence':
                return {
                    type: 'code',
                    content: blockToken.content
                };
            case 'bullet_list_open':
                env.push('ul');
                listLevel++;
                break;
            case 'ordered_list_open':
                env.push('ol');
                listLevel++;
                break;
            case 'list_item_open':
                env.push('li');
                if (env[env.length - 2] === 'ol' ) {
                    orderNum[listLevel - 1]++;
                }
                break;
            case 'list_item_close':
                env.pop();
                break;
            case 'bullet_list_close':
                env.pop();
                listLevel--;
                break;
            case 'ordered_list_close':
                env.pop();
                listLevel--;
                orderNum[listLevel] = 0;
                break;
            case 'blockquote_open':
                env.push('blockquote');
                break;
            case 'blockquote_close':
                env.pop();
                break;
            case 'tr_open':
                tmp = {
                    type: 'table_tr',
                    content:[]
                };
                return tmp;
            case 'th_open':
                tmp.content.push({
                    type: 'table_th',
                    content: getInlineContent(tokens[index+1]).map(function(inline) {return inline.content;}).join('')
                });
                break;
            case 'td_open':
                tmp.content.push({
                    type: 'table_td',
                    content: getInlineContent(tokens[index+1]).map(function(inline) {return inline.content;}).join('')
                });
                break;
        }
    };

    tokens.forEach(function(token, index) {
        var blockContent = getBlockContent(token, index);

        if (!blockContent) return;

        if (!Array.isArray(blockContent)) {
            blockContent = [blockContent];
        }

        blockContent.forEach(function(block) {
            if (Array.isArray(block.content)) {
                block.isArray = true;
            } else {
                block.isArray = false;
            }
            renderList.push(block);
        });
    });

    return ret;
}

module.exports = {
    parse: parse
};
