var wemark = require('../wemark/wemark');
var should = require('should');

describe('wemark存在性判断', function() {
	it('wemark是一个对象', function() {
		wemark.should.be.an.Object();
	});
	it('wemark.parse是一个函数', function() {
		wemark.parse.should.be.a.Function();
	});
	it('wemark.parse接受一个参数', function() {
		wemark.parse.length.should.equal(1);
	});
});

describe('parse基础功能', function(){
	var ret = wemark.parse('# hello');
	it('ret是一个对象', function(){
		ret.should.be.an.Object();
	});
	/*it('page.wemarkFixImageHeight是一个函数', function(){
		page1.wemarkFixImageHeight.should.be.a.Function();
	});*/
	it('ret.renderList是一个数组', function(){
		ret.renderList.should.be.an.Array();
	});
	/*it('page.wemark.imageHeight是一个对象', function(){
		page1.wemark.imageHeight.should.be.an.Object();
	});*/
	it('ret.imageList是一个数组', function(){
		ret.imageList.should.be.an.Array();
	});
});

describe('markdown解析', function(){
	var md = require('./test.md');
	var ret = wemark.parse(md);
	var render = ret.renderList;

	var index = 0;

	it('renderList[' + (index) + '](h1)', function(index){
		return function(){
			render[index].should.be.eql({type:'h1', isArray:true, content:[{
				type:'text',
				content:'h1 Heading'
			}]});
		};
	}(index++));

	it('renderList[' + (index) + '](h2)', function(index){
		return function(){
			render[index].should.be.eql({type:'h2', isArray:true, content:[{
				type:'text',
				content:'h2 Heading'
			}]});
		};
	}(index++));

	it('renderList[' + (index) + '](h3)', function(index){
		return function(){
			render[index].should.be.eql({type:'h3', isArray:true, content:[{
				type:'text',
				content:'h3 Heading'
			}]});
		};
	}(index++));

	it('renderList[' + (index) + '](h4)', function(index){
		return function(){
			render[index].should.be.eql({type:'h4', isArray:true, content:[{
				type:'text',
				content:'h4 Heading'
			}]});
		};
	}(index++));

	it('renderList[' + (index) + '](h5)', function(index){
		return function(){
			render[index].should.be.eql({type:'h5', isArray:true, content:[{
				type:'text',
				content:'h5 Heading'
			}]});
		};
	}(index++));

	it('renderList[' + (index) + '](h6)', function(index){
		return function(){
			render[index].should.be.eql({type:'h6', isArray:true, content:[{
				type:'text',
				content:'h6 Heading'
			}]});
		};
	}(index++));

	it('renderList[' + (index) + '](p code+strong)', function(index){
		return function(){
			render[index].should.be.eql({type:'p', isArray:true, content:[{
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
		};
	}(index++));

	it('renderList[' + (index) + '](p deleted)', function(index){
		return function(){
			render[index].should.be.eql({type:'p', isArray:true, content:[{
				type:'text',
				content:'普通'
			},{
				type:'deleted',
				content:'被删除的文字'
			},{
				type:'text',
				content:'哈哈'
			}]});
		};
	}(index++));

	it('renderList[' + (index) + '](ul li)', function(index){
		return function(){
			render[index].should.be.eql({
				type: 'ul_li_p',
				isArray: true,
				content: [ { type: 'text', content: '无序列表1' } ]
			});
		};
	}(index++));

	it('renderList[' + (index) + '](ul li ul li)', function(index){
		return function(){
			render[index].should.be.eql({
				type: 'ul_li_p',
				isArray: true,
				content: [
						{ type: 'text', content: '无序列表2' },
						{ type: 'text', content: '\t- 子项目' },
						{ type: 'text', content: '\t- 子项目' }
				]
			});
		};
	}(index++));

	it('renderList[' + (index) + '](ol li)', function(index){
		return function(){
			render[index].should.be.eql({
				type: 'ol_li_p',
				isArray: true,
				content: [
					{ type: 'text', content: '1. ' },
					{ type: 'text', content: 'Lorem ipsum dolor sit amet' }
				]
			});
		};
	}(index++));

	it('renderList[' + (index) + '](ul li)', function(index){
		return function(){
			render[index].should.be.eql({
				type: 'ol_li_p',
				isArray: true,
				content: [
					{ type: 'text', content: '2. ' },
					{ type: 'text', content: 'Consectetur adipiscing elit' }
				]
			});
		};
	}(index++));

	it('renderList[' + (index) + '](ol li)', function(index){
		return function(){
			render[index].should.be.eql({
				type: 'ol_li_p',
				isArray: true,
				content: [
					{ type: 'text', content: '3. ' },
					{ type: 'text', content: 'Integer molestie lorem at massa' }
				]
			});
		};
	}(index++));

	it('renderList[' + (index) + '](image)', function(index){
		return function(){
			render[index].should.be.eql({
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
			render[index].should.be.eql({
				"type": "code",
				"isArray": false,
				"content": "// 代码啊\n\nconsole.log(123);\n"
			});
		};
	}(index++));

	it('renderList[' + (index) + '](p)', function(index){
		return function(){
			render[index].should.be.eql({
				"type": "p",
				"isArray": true,
				"content": [
					{
						"type": "text",
						"content": "hello"
					}
				]
			});
		};
	}(index++));

	it('renderList[' + (index) + '](table thead)', function(index){
		return function(){
			render[index].should.be.eql({
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
			render[index].should.be.eql({
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
			render[index].should.be.eql({
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
			render[index].should.be.eql({
				"type": "video",
				"isArray": false,
				"src": "http://html5demos.com/assets/dizzy.mp4"
			});
		};
	}(index++));

	it('renderList[' + (index) + '](video[src])', function(index){
		return function(){
			render[index].should.be.eql({
				"type": "video",
				"isArray": false,
				"src": "http://html5demos.com/assets/dizzy.mp4"
			});
		};
	}(index++));

	it('renderList[' + (index) + '](video > source[src])', function(index){
		return function(){
			render[index].should.be.eql({
				"type": "video",
				"isArray": false,
				"src": "http://html5demos.com/assets/dizzy.mp4",
				"poster": "http://via.placeholder.com/350x150"
			});
		};
	}(index++));

	it('renderList[' + (index) + '](video[src])', function(index){
		return function(){
			render[index].should.be.eql({
				"type": "video",
				"isArray": false,
				"src": "http://html5demos.com/assets/dizzy.mp4",
				"poster": "http://via.placeholder.com/350x150"
			});
		};
	}(index++));

});
