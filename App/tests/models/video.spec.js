var Video = require('../../api/models/Video'),
    sinon = require('sinon'),
    assert = require('assert'),
    wolfpack = require('wolfpack');
var video_inst = wolfpack('/api/models/Video');

describe('Model Video', function () {

  //Name Validation
  describe("Name Attribute", function(){
    it("it should have a name attribute", function(){
      assert.equal(Video.attributes.name.type, 'string');
    });
  })
  //Path Validation
  describe("Paths", function(){
    it("should have an original video path", function(){
      assert.equal(Video.attributes.original_video_path.type, 'string');
    });
    it("should have an encoded video path", function(){
      assert.equal(Video.attributes.encoded_video_path.type, 'string');
    });
  });
  describe("Functions", function(){
    it("shoud have a beforeCreate", function(){
      assert.equal(typeof Video.beforeCreate, 'function');
    })
  })


});


describe('Instance of Video', function(){
  //Testing for identical paths for encoded and original video
  v = video_inst.beforeCreate({
    name: "teste",
    original_video_path: "/home/teste/vid1/original/vid",
    encoded_video_path: "/home/teste/vid1/original/vid"
  }, function(err, vid){
    it("Should not have same path for both original and encoded", function(){
      assert.notEqual(vid.original_path, vid.encoded_video_path);
    });
  });

  v = video_inst.create({
    name: "",
    original_path: "/home/teste"
  }, function(err, vid){
    it("Should not allow creation of video without a name", function(){
      assert.notEqual(err, undefined);
    });
  });


  v = video_inst.create({
    name: "teste",
    original_path: ""
  }, function(err, vid){
    it("Should not allow creation of video without a original path", function(){
      assert.notEqual(err, undefined);
    });
  });

  //Testing for video uniqueness path
  //describe("Paths should be unique", function(){

  //})

  //Testing for video in web safe format
  //v = video_inst.create({
  //  name: "te",
  //  original_video_path: "te"
  //}, function(err, vid){
  //  it("should have a web safe extension for encoded video", function(){
  //
  //  })
  //})
});
