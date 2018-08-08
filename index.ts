var fs = require('fs');
var path = require('path');
var util = require('util');
var PNG = require('pngjs').PNG;
var tesseract = require('node-tesseract');

fs.createReadStream('in.png')
.pipe(new PNG({filterType:4}))
.on('parsed',function(){
  for(let y=0;y<this.height;y++){
    for(let x=0;x<this.width;x++){
      let idx = (this.width*y+x)<<2;
      let filter = i => {
        let v = this.data[i];
        if (v>=256*0.88){
          this.data[i]=255;
        }else{
          this.data[i]=0;
        }
      };
      filter(idx);
      filter(idx+1);
      filter(idx+2);
    }
  }
  let stream = this.pack();
  stream.pipe(fs.createWriteStream('out.png'));
  stream.on('end',async function(){
    let input = path.join(__dirname,'out.png');
    let text = await util.promisify(tesseract.process)(input);
    text = text.trim().replace(/\s/g,'');
    console.log({text})
  });
});
