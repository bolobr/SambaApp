var Sails = require('sails');
var sinon = require('sinon'); // Mocking/stubbing/spying
var assert = require('assert'); // Assertions
var VidOp = require('../../api/controllers/Video_operationController.js');
var request = require('supertest');

describe("Vid Op Controller", function(){
  describe("When we load the list page", function(){
    it('should render the view', function(){
      var view = sinon.spy();
      VidOp.index(null, {
        view: view
      });
      console.log(view)
      assert.ok(view.called);
    })
  })

})
