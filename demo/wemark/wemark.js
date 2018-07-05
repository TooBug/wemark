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
        parseMd(){
            if(this.data.md){
                this.setData({
                    parsedData: parser.parse(this.data.md)
                });
            }
        }
    }
});
