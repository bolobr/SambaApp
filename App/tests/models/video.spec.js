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
      assert.equal(typeof Video.attributes.original_video_path, 'string');
    });
    it("should have an encoded video path", function(){
      assert.equal(typeof Video.attributes.encoded_video_path, 'string');
    });
  });
  describe("Functions", function(){
    it("shoud have a beforeCreate", function(){
      assert.equal(typeof Video.beforeCreate, 'function');
    })
  })


});


describe('Instance of Video', function(){
  v = video_inst.create({
    name: "teste",
    original_path: "/home/teste",
    encoded_video_path: "/home/teste"
  }, function(){
    it("Should not have same path for both", function(){
      assert.notEqual(v.original_path, v.encoded_video_path);

    });
  });
});
