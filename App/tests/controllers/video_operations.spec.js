var Sails = require('sails');
var sinon = require('sinon'); // Mocking/stubbing/spying
var assert = require('assert'); // Assertions
var VidOp = require('../../api/controllers/Video_operationController.js');
var request = require('supertest');
var wolfpack = require('wolfpack');
var video_inst = wolfpack('/api/models/Video');

//Stub for wrong file
var wrong_file = function(field){
  file_resp = {
    upload: function(hash, f){
      files = [
        { fd: '/home/gcordeiro/SambaApp/App/.tmp/uploads/983873e9-35b4-4335-9e21-3a379b05de94.pdf',
          size: 285515,
          type: 'application/pdf',
          filename: 'Tak.pdf',
          status: 'bufferingOrWriting',
          field: 'file',
          extra: undefined }
      ]
      f(null, files);
    }
  }
  return file_resp;
}


//Stub for correct file
var correct_file = function(field){
  file_resp = {
    upload: function(hash, f){
      files = [
        { fd: '/home/gcordeiro/SambaApp/App/.tmp/uploads/aacb9d37-265d-43bb-9f63-8d456882c7ec.dv',
        size: 109800114,
        type: 'video/dv',
        filename: 'sample.dv',
        status: 'bufferingOrWriting',
        field: 'file',
        extra: undefined }
      ]
      f(null, files);
    }
  }
  return file_resp;
}


//Stub for requests
var request = {
  params: {
  },
  param: function(field){
    return this.params[field]
  },
  file: wrong_file,
  reset: function(){
    params = {};
  }
}

//Stub for responses
var response = {
  //Redirect
  redirect_called: false,
  redirect: function(params){
    this.redirect_called = params;
  },
  //View
  view_called: false,
  view: function(params){
    this.view_called = params;
  },

  //Reset Structure
  reset: function(){
    this.redirect_called = false;
    this.view_called = false;
  }
}






describe("Vid Op Controller", function(){
  describe("Get pages without parameters", function(){
    it('should render the view new_video', function(){
      var view = sinon.spy();
      VidOp.new_video(null, {
        view: view,
      });
      assert.ok(view.called);
    });

    it('should render the view index', function(){
      var view = sinon.spy();
      VidOp.index(null, {
        view: view,
      });
      assert.ok(view.called);
    });
  });

  //Este teste é mais complicado um pouco
  describe("Get pages with parameters", function(){
    //Elimina qualquer teste do Banco de dados
    video_inst.destroy({name: 'Teste'}, function(err,v){});
    //Instancia uma versão com o nome teste
    video_inst.create({
      name: "Teste",
      original_video_path: "/home/teste/vid1/original/vid",
      encoded_video_path: "/home/teste/vid1/original/vid"
    }, function(err, vid){
      it('should render the show view', function(){
        //Cria uma requisição com o nome correto
        request.params.name = 'Teste';
        //Envia para o controlador
        VidOp.show(request, response);
        //Checa se o controlador chamou o método em questão

        assert.ok(response.view_called, true);
      });
    });

  });

  response.reset();

  describe("Post to create", function(){
    it("should not allow files other than video", function(){
      //Elimina qualquer teste do Banco de dados
      video_inst.destroy({name: 'Teste'}, function(err,v){});
      request.params.name = "Teste";
      VidOp.create(request, response);
      //O teste é feito verificando a rota tomada de padrão '/video/:id'
      str = response.redirect_called.split('/')[1] //obtem o video da rota
      assert.equal(str, 'new_video');//verifica se está correto

    });

    it("should create and redirect para a página show with correct params", function(){
      //Elimina qualquer teste do Banco de dados
      video_inst.destroy({name: 'Teste'}, function(err,v){});
      request.params.name = "Teste";
      VidOp.create(request, response);
      //O teste é feito verificando a rota tomada de padrão '/video/:id'
      str = response.redirect_called.split('/')[1] //obtem o video da rota
      assert.equal(str, 'video');//verifica se está correto

    });


  });



});
