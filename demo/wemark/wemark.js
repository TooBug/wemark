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
		link: {
			type: Boolean,
			value: false
		}
    },
    data: {
        parsedData: {}
    },
    methods: {
        parseMd(){
			console.log(this.data.link, parser.parse(this.data.md, {
				link: this.data.link
			}));
            if(this.data.md){
                this.setData({
                    parsedData: parser.parse(this.data.md, {
						link: this.data.link
					})
                });
            }
        }
    }
});
