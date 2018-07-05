const parser = require('./parser');

Component({
    properties: {
        md: {
            type: String,
            value: '',
            observer(){
                this.parseMd();
            }
        }
    },
    data: {
        parsedData: {}
    },
    methods: {
        created(){
			console.log('created');
            // this.parseMd();
        },
        parseMd(){
			console.log('parseMd', this.data.md, parser.parse(this.data.md));
            if(this.data.md){
                this.setData({
                    parsedData: parser.parse(this.data.md)
                });
            }
			setTimeout(()=>{console.log(this.data.parsedData)},1000);
        }
    }
});
