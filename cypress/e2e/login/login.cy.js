import * as loginValida from "../../modules/cadastro/index.js";
import 'cypress-mochawesome-reporter/register';

const baseUrl = Cypress.config('baseUrl');

describe('', () => {
  it('CT1 - Usuário novo que não possui conta', () => {
    cy.visit('/');
    //Iniciar cadastro 
    loginValida.iniciarCadastro();
    //Preencher dados pessoais 
    loginValida.preencherDadosPessoais();
    //validação do cadastro realizado com sucesso
    loginValida.validacaoComSucesso();
  });

  context('CT2 - logando com usuário criado e validando se está exibindo o nome correto e excluindo a conta', () => {
    const usuario = {
      nome: 'Marcos',
      email: `marcos_${Date.now()}@mail.com`,
      senha: '12345'
    };
    before(() => {
      cy.visit('/login');
      loginValida.iniciarCadastro(usuario.nome, usuario.email);
      loginValida.preencherDadosPessoais(usuario.senha);
      loginValida.validacaoComSucesso();
      loginValida.usuarioDeslogandoSistema();
    });

    //Test Case 2: Login User with correct email and password
    it('CT2 - logando com usuário criado e validando se está exibindo o nome correto e excluindo a conta', () => {

      cy.visit('/login');
      loginValida.loginComSucesso(usuario.email, usuario.senha);
      loginValida.validacaoUsuariologado(usuario.nome);

      loginValida.deletandoConta();

    });



  });

  //Test Case 3: Login User with incorrect email and password
  it('CT3 - Não deve permitir usuário logar pois o e-mail está incorreto', () => {
    cy.visit('/login');
    loginValida.loginComSucesso('marco@gmail.com', '123456');
    loginValida.verificarMensagemErroExibidaLogin();
  });

  context('CT4 - usuário deslogando do sistema', () => {
    const usuario = {
      nome: 'Marcos',
      email: `marcos_${Date.now()}@mail.com`,
      senha: '12345'
    };
    before(() => {
      cy.visit('/login');
      loginValida.iniciarCadastro(usuario.nome, usuario.email);
      loginValida.preencherDadosPessoais(usuario.senha);
      loginValida.validacaoComSucesso();
      loginValida.usuarioDeslogandoSistema();
    });

    //Test Case 4: Logout User
    it('CT4 - usuário deslogando do sistema', () => {
      cy.visit('/login');
      loginValida.loginComSucesso(usuario.email, usuario.senha);
      loginValida.validacaoUsuariologado();
      loginValida.usuarioDeslogandoSistema();

    });
  });

  //Test Case 5: Register User with existing email
  it('CT5 - Não deve permitir criar usuário pois o email informado já possue usuário cadastrado', () => {

    cy.visit("/login");
    loginValida.verificarNaoPermitirIniciarCadastro();
    cy.contains('Email Address already exist!')
      .should('be.visible');

  });

  //Test Case 6: Contact Us Form
  it('CT6 - O usuário vai entrar em contato com o atendimento para reclamar do produto', () => {

    loginValida.verificarFaleConosco();
    cy.contains('Success! Your details have been submitted successfully.')
      .should('be.visible');

  });

  //Test Case 8: Verify All Products and product detail page
  it('CT8 - O usuário vai verificar os dados do produto que foi escolhido', () => {

    loginValida.verificarProdutos();
    cy.contains('Add to cart').should('be.visible');

  });

  //Test Case 9: Search Product
  it('CT9 - O usuário vai fazer a busca pelo produto', () => {
    loginValida.fazerBuscaPeloProduto();
  });

  //Test Case 10: Verify Subscription in home page
  it('CT10 - Validando o rodape da pagina', () => {
    loginValida.validandoRodaPe();
    cy.contains('You have been successfully subscribed!').should('be.visible');
  });

  //Test Case 15: Place Order: Register before Checkout

  it('CT15 - Cadastrando usuário vai logar fazer uma compra e sair do sistema', () => {
    loginValida.iniciarCadastro();
    loginValida.preencherDadosPessoais();
    loginValida.validacaoComSucesso();
    loginValida.verificarProdutos;
    cy.contains('Add to cart').click();
    loginValida.adicionandoProduto();
    cy.contains('Congratulations! Your order has been confirmed!').should('be.visible');
    loginValida.deletandoConta();
  });

  context('CT16 - O usuário vai logar fazer uma compra e sair do sistem', () => {
    const usuario = {
      nome: 'Marcos',
      email: `marcos_${Date.now()}@mail.com`,
      senha: '12345'
    };
    before(() => {
      cy.visit('/login');
      loginValida.iniciarCadastro(usuario.nome, usuario.email);
      loginValida.preencherDadosPessoais(usuario.senha);
      loginValida.validacaoComSucesso();
      loginValida.usuarioDeslogandoSistema();

    });


    //Test Case 16: Place Order: Login before Checkout
    it('CT16 - O usuário vai logar fazer uma compra e sair do sistema', () => {
      loginValida.loginComSucesso(usuario.email, usuario.senha);
      loginValida.verificarProdutos;
      cy.contains('Add to cart').click();
      loginValida.adicionandoProduto();
      cy.contains('Congratulations! Your order has been confirmed!').should('be.visible');
      loginValida.deletandoConta();
    });

  });










});