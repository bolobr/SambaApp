/**
* Video.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/
var encoded_path = "video/encoded/"
var original_path = "video/original/"
var aws_prefix = "http://s3.amazonaws.com/bolobuckettest/"
var http = require('http');
var s3 = require('s3');
var fs = require('fs');
var zencoder = require('zencoder');
var client_z = zencoder(process.env.ZencoderApi)

var client = s3.createClient({
  maxAsyncS3: 20,     // this is the default
  s3RetryCount: 3,    // this is the default
  s3RetryDelay: 1000, // this is the default
  multipartUploadThreshold: 209715200, // (~200 MB)
  multipartUploadSize: 157286400, // (~150 MB)
  s3Options: {
    accessKeyId: process.env.AWSKey,
    secretAccessKey: process.env.AWSSecret,
    // any other options are passed to new AWS.S3()
    // See: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Config.html#constructor-property
  },
});



module.exports = {

  attributes: {
    "name": {
      type: 'string',
      required: true
    },
    "file_name":{
      type: 'string'
    },
    "original_video_path": {
      type: 'string',
      required: true,
      unique: true
    },
    "encoded_video_path": {
      type: 'string',
      unique: true
    },
    "pending_original": {
      type: 'boolean',
      default: false
    },
    "pending_encoded": {
      type: 'boolean',
      default: false
    },
    "job_id":{
      type: 'String'
    }

  },


  //Extra functions
  upload_s3: function(files, name){
    console.log(files);
    var params = {
      localFile: files[0]['fd'],
      s3Params: {
        Bucket: "bolobuckettest",
        Key: original_path + name + '/' + files[0]['filename'],
      },
    };
    uploader = client.uploadFile(params);
    uploader.on('end', function() {
      console.log("done uploading");
      new_file_name = files[0]['filename'].split('.')[0] + '.mp4'
      fs.unlink(files[0]['fd']);
      var data =  {
        input: aws_prefix + original_path + name + '/' + files[0]['filename'],
        outputs: [{
          "url": aws_prefix + encoded_path + name + '/' + new_file_name,
          "public": true,
        }],
      }
      client_z.Job.create(data, function(err, data) {
        if (err) { console.log(err); return; }
        console.log(data);
      });
    });
    uploader.on('progress', function(){
      console.log("progress", uploader.progressMd5Amount,
      uploader.progressAmount, uploader.progressTotal);
    });
  },


};
