const { RESTDataSource } = require('apollo-datasource-rest');

class CloudinaryAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://api.cloudinary.com/v1_1/galimax/';
    this.UPLOAD_PRESET = 'galimax'
  }

  async uploadImages(images) {
    console.log(images[0])    

  //   return this.post(
  //     'image/upload',
  //     data
  //   ).then(image => {
  //     console.log('image', image);
  //   })
  }
}

module.exports = CloudinaryAPI;