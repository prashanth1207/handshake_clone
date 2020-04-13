let fs = require('fs');

module.exports.renderImage = (req,resp) =>{
  imageId = req.params.imageId;
  image = fs.readdirSync('public/images/profile_pics')
  .filter(file => {
    return (file.slice(-4) === '.png');
  })
  .find(file => {
    if(imageId === file){
      return true
    }
  })
let file_path = `public/images/profile_pics/${image || 'default.png'}`;
resp.sendfile(file_path);
}