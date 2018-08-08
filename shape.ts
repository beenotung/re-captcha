var getPixels = require('get-pixels');
var util = require('util');

async function main(){
 let pixels = await util.promisify(getPixels)("in.png");
 let [width, height, channels] = pixels.shape.slice();
 let data = pixels.data.slice().map(x => x === 0 ? 0 : 255);
 console.log({
   size: data.length,
   width,
   height,
   channels,
 })
}
main()
