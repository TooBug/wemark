module.exports = `
# h1 Heading
## h2 Heading
### h3 Heading
#### h4 Heading
##### h5 Heading
###### h6 Heading

这是一段普通的文字，中间有一点\`代码\`，还有点**加粗**的文字。

这段文字中间有一个软
换行，还有一个
硬换行

一段长数字123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890

普通~~被删除的文字~~哈哈

小程序内链接 [Demo](/index/index?id=123)

- 无序列表1
- 无序列表2
	- 子项目
	- 子项目

1. Lorem ipsum dolor sit amet
2. Consectetur adipiscing elit
3. Integer molestie lorem at massa


![图片来一张](https://www.toobug.net/logo.png)

\`\`\`javascript
// 代码啊

console.log(123);

const parser = require('./parser');

Component({
    properties: {
        md: {
            type: String,
            value: '',
            observer(){
                this.parseMd();
            }
        },
    },
    data: {
        parsedData: {},
    },
    methods: {
        parseMd(){
			if (this.data.md) {
				var parsedData = parser.parse(this.data.md, {
					link: this.data.link
				});
				this.setData({
					parsedData
				});
            }
        }
    }
});
\`\`\`

\`\`\`html
<html>
	<head>
		<title>test</title>
	</head>
	<body>
		<div class="hello">hello div</div>
		<p>hellp p</div>
	</body>
</html>
\`\`\`

hello

|表头1|表头2|表头3|
|----|-----|----|
|11|12|13|
|21|22|23|

<video>
<source src="http://html5demos.com/assets/dizzy.mp4">
</source>
</video>

<video src="http://html5demos.com/assets/dizzy.mp4"></video>

<video>
<source src="http://html5demos.com/assets/dizzy.mp4" poster="http://via.placeholder.com/350x150">
</source>
</video>

<video src="http://html5demos.com/assets/dizzy.mp4" poster="http://via.placeholder.com/350x150"></video>
`;
