/*global describe,it*/
var wemark = require('../wemark/parser');
var should = require('should');

describe('wemark存在性判断', function() {
	it('wemark是一个对象', function() {
		wemark.should.be.an.Object();
	});
	it('wemark.parse是一个函数', function() {
		wemark.parse.should.be.a.Function();
	});
	it('wemark.parse接受两个参数', function() {
		wemark.parse.length.should.equal(2);
	});
});

describe('parse基础功能', function(){
	var renderList = wemark.parse('# hello');
	it('renderList是一个数组', function(){
		renderList.should.be.an.Array();
	});
	/*it('page.wemark.imageHeight是一个对象', function(){
		page1.wemark.imageHeight.should.be.an.Object();
	});*/
});

describe('markdown解析', function(){
	var md = require('./test.md');
	var renderList = wemark.parse(md);

	var index = 0;

	it('renderList[' + (index) + '](h1)', function(index){
		return function(){
			renderList[index].should.be.eql({type:'h1', isArray:true, content:[{
				type:'text',
				content:'h1 Heading',
				data:{}
			}]});
		};
	}(index++));

	it('renderList[' + (index) + '](h2)', function(index){
		return function(){
			renderList[index].should.be.eql({type:'h2', isArray:true, content:[{
				type:'text',
				content:'h2 Heading',
				data:{}
			}]});
		};
	}(index++));

	it('renderList[' + (index) + '](h3)', function(index){
		return function(){
			renderList[index].should.be.eql({type:'h3', isArray:true, content:[{
				type:'text',
				content:'h3 Heading',
				data:{}
			}]});
		};
	}(index++));

	it('renderList[' + (index) + '](h4)', function(index){
		return function(){
			renderList[index].should.be.eql({type:'h4', isArray:true, content:[{
				type:'text',
				content:'h4 Heading',
				data:{}
			}]});
		};
	}(index++));

	it('renderList[' + (index) + '](h5)', function(index){
		return function(){
			renderList[index].should.be.eql({type:'h5', isArray:true, content:[{
				type:'text',
				content:'h5 Heading',
				data:{}
			}]});
		};
	}(index++));

	it('renderList[' + (index) + '](h6)', function(index){
		return function(){
			renderList[index].should.be.eql({type:'h6', isArray:true, content:[{
				type:'text',
				content:'h6 Heading',
				data:{}
			}]});
		};
	}(index++));

	it('renderList[' + (index) + '](p code+strong)', function(index){
		return function(){
			renderList[index].should.be.eql({type:'p', isArray:true, content:[{
				type:'text',
				content:'这是一段普通的文字，中间有一点',
				data:{}
			},{
				type:'code',
				content:'代码',
				data:{}
			},{
				type:'text',
				content:'，还有点',
				data:{}
			},{
				type:'strong',
				content:'加粗',
				data:{}
			},{
				type:'text',
				content:'的文字。',
				data:{}
			}]});
		};
	}(index++));

	it('renderList[' + (index) + '](p deleted)', function(index){
		return function(){
			renderList[index].should.be.eql({type:'p', isArray:true, content:[{
				type:'text',
				content:'普通',
				data:{}
			},{
				type:'deleted',
				content:'被删除的文字',
				data:{}
			},{
				type:'text',
				content:'哈哈',
				data:{}
			}]});
		};
	}(index++));

	it('renderList[' + (index) + '](ul li)', function(index){
		return function(){
			renderList[index].should.be.eql({
				type: 'ul_li_p',
				isArray: true,
				content: [ { type: 'text', content: '无序列表1', data: {} } ]
			});
		};
	}(index++));

	it('renderList[' + (index) + '](ul li ul li)', function(index){
		return function(){
			renderList[index].should.be.eql({
				type: 'ul_li_p',
				isArray: true,
				content: [
						{ type: 'text', content: '无序列表2', data: {} },
						{ type: 'text', content: '\t- 子项目', data: {} },
						{ type: 'text', content: '\t- 子项目', data: {} }
				]
			});
		};
	}(index++));

	it('renderList[' + (index) + '](ol li)', function(index){
		return function(){
			renderList[index].should.be.eql({
				type: 'ol_li_p',
				isArray: true,
				content: [
					{ type: 'text', content: '1. ' },
					{ type: 'text', content: 'Lorem ipsum dolor sit amet', data:{} }
				]
			});
		};
	}(index++));

	it('renderList[' + (index) + '](ul li)', function(index){
		return function(){
			renderList[index].should.be.eql({
				type: 'ol_li_p',
				isArray: true,
				content: [
					{ type: 'text', content: '2. ' },
					{ type: 'text', content: 'Consectetur adipiscing elit', data:{} }
				]
			});
		};
	}(index++));

	it('renderList[' + (index) + '](ol li)', function(index){
		return function(){
			renderList[index].should.be.eql({
				type: 'ol_li_p',
				isArray: true,
				content: [
					{ type: 'text', content: '3. ' },
					{ type: 'text', content: 'Integer molestie lorem at massa', data:{} }
				]
			});
		};
	}(index++));

	it('renderList[' + (index) + '](image)', function(index){
		return function(){
			renderList[index].should.be.eql({
				"type": "p",
				"isArray": true,
				"content": [
					{
						"type": "image",
						"src": "https://www.toobug.net/logo.png"
					}
				]
			});
		};
	}(index++));

	it('renderList[' + (index) + '](code)', function(index){
		return function(){
			renderList[index].should.be.eql({
				"type": "code",
				"isArray": false,
				"highlight": false,
				"content": "// 代码啊\n\nconsole.log(123);\n"
			});
		};
	}(index++));

	it('renderList[' + (index) + '](p)', function(index){
		return function(){
			renderList[index].should.be.eql({
				"type": "p",
				"isArray": true,
				"content": [
					{
						"type": "text",
						"content": "hello",
						"data": {}
					}
				]
			});
		};
	}(index++));

	it('renderList[' + (index) + '](table thead)', function(index){
		return function(){
			renderList[index].should.be.eql({
				"type": "table_tr",
				"isArray": true,
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
		};
	}(index++));

	it('renderList[' + (index) + '](table tr)', function(index){
		return function(){
			renderList[index].should.be.eql({
				"type": "table_tr",
				"isArray": true,
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
		};
	}(index++));

	it('renderList[' + (index) + '](table tr)', function(index){
		return function(){
			renderList[index].should.be.eql({
				"type": "table_tr",
				"isArray": true,
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
		};
	}(index++));

	it('renderList[' + (index) + '](video > source[src])', function(index){
		return function(){
			renderList[index].should.be.eql({
				"type": "video",
				"isArray": false,
				"src": "http://html5demos.com/assets/dizzy.mp4"
			});
		};
	}(index++));

	it('renderList[' + (index) + '](video[src])', function(index){
		return function(){
			renderList[index].should.be.eql({
				"type": "video",
				"isArray": false,
				"src": "http://html5demos.com/assets/dizzy.mp4"
			});
		};
	}(index++));

	it('renderList[' + (index) + '](video > source[src])', function(index){
		return function(){
			renderList[index].should.be.eql({
				"type": "video",
				"isArray": false,
				"src": "http://html5demos.com/assets/dizzy.mp4",
				"poster": "http://via.placeholder.com/350x150"
			});
		};
	}(index++));

	it('renderList[' + (index) + '](video[src])', function(index){
		return function(){
			renderList[index].should.be.eql({
				"type": "video",
				"isArray": false,
				"src": "http://html5demos.com/assets/dizzy.mp4",
				"poster": "http://via.placeholder.com/350x150"
			});
		};
	}(index++));

});
