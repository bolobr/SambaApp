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
});


describe('Instance of Video', function(){


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

});
