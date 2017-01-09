var wemark = require('../wemark/wemark');
var should = require('should');

// 模拟Page
function Page(){
}
Page.prototype.setData = function(data){
	for(var key in data){
		this[key] = data[key];
	}
};

// 模拟wx对象
global.wx = {
	getSystemInfoSync: function(){
		return {
			windowWidth: 375
		};
	}
};

describe('wemark存在性判断', function() {
	it('wemark是一个对象', function() {
		wemark.should.be.an.Object();
	});
	it('wemark.parse是一个函数', function() {
		wemark.parse.should.be.a.Function();
	});
	it('wemark.parse接受三个参数', function() {
		wemark.parse.length.should.equal(3);
	});
});

describe('parse基础功能', function(){
	var page1 = new Page();
	wemark.parse('# hello', page1);
	it('page.wemark是一个对象', function(){
		page1.wemark.should.be.an.Object();
	});
	it('page.wemarkFixImageHeight是一个函数', function(){
		page1.wemarkFixImageHeight.should.be.a.Function();
	});
	it('page.wemark.renderList是一个数组', function(){
		page1.wemark.renderList.should.be.an.Array();
	});
	it('page.wemark.imageHeight是一个对象', function(){
		page1.wemark.imageHeight.should.be.an.Object();
	});
});

describe('markdown解析', function(){
	var md = require('./test.md');
	var page2 = new Page();
	wemark.parse(md, page2, {imageWidth:300});
	var render = page2.wemark.renderList;
	var image = page2.wemark.imageHeight;

	it('renderList[0](h1)', function(){
		render[0].should.be.eql({type:'h1', content:[{
			type:'text',
			content:'h1 Heading'
		}]});
	});
	it('renderList[1](h2)', function(){
		render[1].should.be.eql({type:'h2', content:[{
			type:'text',
			content:'h2 Heading'
		}]});
	});
	it('renderList[2](h3)', function(){
		render[2].should.be.eql({type:'h3', content:[{
			type:'text',
			content:'h3 Heading'
		}]});
	});
	it('renderList[3](h4)', function(){
		render[3].should.be.eql({type:'h4', content:[{
			type:'text',
			content:'h4 Heading'
		}]});
	});
	it('renderList[4](h5)', function(){
		render[4].should.be.eql({type:'h5', content:[{
			type:'text',
			content:'h5 Heading'
		}]});
	});
	it('renderList[5](h6)', function(){
		render[5].should.be.eql({type:'h6', content:[{
			type:'text',
			content:'h6 Heading'
		}]});
	});
	it('renderList[6](p)', function(){
		render[6].should.be.eql({type:'p', content:[{
			type:'text',
			content:'这是一段普通的文字，中间有一点'
		},{
			type:'code',
			content:'代码'
		},{
			type:'text',
			content:'，还有点'
		},{
			type:'strong',
			content:'加粗'
		},{
			type:'text',
			content:'的文字。'
		}]});
	});
	it('renderList[7](ul li)', function(){
		render[7].should.be.eql({
			type: 'ul_li_p',
			content: [ { type: 'text', content: '无序列表1' } ]
		});
	});
	it('renderList[8](ul li ul li)', function(){
		render[8].should.be.eql({
			type: 'ul_li_p',
			content: [
					{ type: 'text', content: '无序列表2' },
					{ type: 'text', content: '\t- 子项目' },
					{ type: 'text', content: '\t- 子项目' }
			]
		});
	});
	it('renderList[9](ol li)', function(){
		render[9].should.be.eql({
			type: 'ol_li_p',
			content: [
				{ type: 'text', content: '1. ' },
				{ type: 'text', content: 'Lorem ipsum dolor sit amet' }
			]
		});
	});
	it('renderList[10](ul li)', function(){
		render[10].should.be.eql({
			type: 'ol_li_p',
			content: [
				{ type: 'text', content: '2. ' },
				{ type: 'text', content: 'Consectetur adipiscing elit' }
			]
		});
	});
	it('renderList[11](ol li)', function(){
		render[11].should.be.eql({
			type: 'ol_li_p',
			content: [
				{ type: 'text', content: '3. ' },
				{ type: 'text', content: 'Integer molestie lorem at massa' }
			]
		});
	});

	it('renderList[12](image)', function(){
		render[12].should.be.eql({
			"type": "p",
			"content": [
				{
					"type": "image",
					"src": "https://www.toobug.net/logo.png"
				}
			]
		});
	});
	it('renderList[13](code)', function(){
		render[13].should.be.eql({
			"type": "code",
			"content": "// 代码啊\n\nconsole.log(123);\n"
		});
	});
	it('renderList[14](p)', function(){
		render[14].should.be.eql({
			"type": "p",
			"content": [
				{
					"type": "text",
					"content": "hello"
				}
			]
		});
	});
	it('renderList[15](table thead)', function(){
		render[15].should.be.eql({
			"type": "table_tr",
			"content": [
				{
					"type": "table_th",
					"content": "表头1"
				},
				{
					"type": "table_th",
					"content": "表头2"
				},
				{
					"type": "table_th",
					"content": "表头3"
				}
			]
		});
	});
	it('renderList[16](table tr)', function(){
		render[16].should.be.eql({
			"type": "table_tr",
			"content": [
				{
					"type": "table_td",
					"content": "11"
				},
				{
					"type": "table_td",
					"content": "12"
				},
				{
					"type": "table_td",
					"content": "13"
				}
			]
		});
	});
	it('renderList[17](table tr)', function(){
		render[17].should.be.eql({
			"type": "table_tr",
			"content": [
				{
					"type": "table_td",
					"content": "21"
				},
				{
					"type": "table_td",
					"content": "22"
				},
				{
					"type": "table_td",
					"content": "23"
				}
			]
		});
	});

});
