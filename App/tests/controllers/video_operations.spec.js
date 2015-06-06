var Sails = require('sails');
var sinon = require('sinon'); // Mocking/stubbing/spying
var assert = require('assert'); // Assertions
var VidOp = require('../../api/controllers/Video_operationController.js');
var request = require('supertest');
var wolfpack = require('wolfpack');
var video_inst = wolfpack('/api/models/Video');


//Stub for requests
var request = {
  params: {
  },
  param: function(field){
    return this.params[field]
  },
  reset: function(){
    params = {};
  }
}

//Stub for responses
var response = {
  //Redirect
  redirect_called: false,
  redirect: function(params){
    this.redirect_called = params
  },
  //View
  view_called: false,
  view: function(params){
    this.view_called = params
  },

  //Reset Structure
  reset: function(){
    this.redirect_called = false;
    this.view_called = false
  }
}






describe("Vid Op Controller", function(){
  describe("Get pages without parameters", function(){
    it('should render the view new_video', function(){
      var view = sinon.spy();
      VidOp.new_video(null, {
        view: view
      });
      assert.ok(view.called);
    });

    it('should render the view index', function(){
      var view = sinon.spy();
      VidOp.index(null, {
        view: view
      });
      assert.ok(view.called);
    });
  });

  //Este teste é mais complicado um pouco
  describe("Get pages with parameters", function(){
    //Elimina qualquer teste do Banco de dados
    video_inst.destroy({name: 'Teste'}, function(err,v){})
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
    it("should create and redirect", function(){
      //Elimina qualquer teste do Banco de dados
      video_inst.destroy({name: 'Teste'}, function(err,v){})
      request.params.name = "Teste";
      VidOp.create(request, response);
      //Testa se redirect foi chamado;
      assert.equal(response.redirect_called, true);
      //Este teste pode ser mais específico se observar para onde o redirect é enviado.
      //Mas dado a natureza limitada do campo de testes do framework escolhido
      //Enviar um arquivo por meio de um teste é mais complicado do que se imaginava.
      //Assim, outros testes serão realizados conforme a demanda
    })
  })

})
