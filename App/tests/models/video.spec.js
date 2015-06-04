var Video = require('../../api/models/Video'),
    sinon = require('sinon'),
    assert = require('assert');

describe('Model Video', function () {
  v = Video.create({
    name: "Teste"
  });
  //Name Validation
  describe("Name Attribute", function(){
    it("it should have a name ", function(){
      assert.equal(Video.attributes.name.type, 'string');
    });
    it("it should be required", function(){
      assert.equal(Video.attributes.name.required, true);
    })
  })

  //Path Validation
  describe("Paths", function(){
    it("should have an original video path", function(){
      assert.equal(typeof Video.original_path, 'string');
    });
    it("should have an encoded video path", function(){
      assert.equal(typeof Video.encoded_video_path, 'string');
    });
    it("should not be equal", function(){
      assert.notEqual(Video.encoded_video_path, Video.original_path);
    });
  });

});
