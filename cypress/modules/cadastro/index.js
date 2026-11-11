

function iniciarCadastro(nome = 'Marcos', email) {
    cy.visit('/login');
    const emailUnico = email || `marcos_${Date.now()}@mail.com`;
    cy.get('[action*="signup"]').click();
    cy.get('[data-qa="signup-name"]')
        .should('be.visible')
        .invoke('val', nome)
    cy.get('[data-qa="signup-name"]').trigger('input')
    cy.get('[data-qa="signup-name"]').trigger('change');
    cy.get('[data-qa="signup-email"]')
        .should('be.visible')
        .invoke('val', emailUnico)
    cy.get('[data-qa="signup-email"]').trigger('input');
    cy.get('[data-qa="signup-email"]').trigger('change');
    cy.get('[data-qa="signup-button"]').dblclick();
}

function preencherDadosPessoais() {
    cy.get('#id_gender2', { timeout: 10000 })
        .scrollIntoView()
        .should('exist')
        .check({ force: true });
    cy.get('[data-qa="password"]').type('12345');
    cy.get('[data-qa="days"]').select('16');
    cy.get('[data-qa="months"]').select('May');
    cy.get('[data-qa="years"]').select('1994');
    cy.get('#newsletter').check();
    cy.get('[data-qa="first_name"]').type('Marcos');
    cy.get('[data-qa="last_name"]').type('Ezequiel');
    cy.get('[data-qa="company"]').type('GFT');
    cy.get('[data-qa="address"]').type('100 Queen Street West, Toronto, ON,');
    cy.get('[data-qa="country"]').select('Canada');
    cy.get('[data-qa="state"]').type('Canada');
    cy.get('[data-qa="city"]').type('Toronto');
    cy.get('[data-qa="zipcode"]').type('M5H 2N2');
    cy.get('[data-qa="mobile_number"]').type('31999999999');
    cy.get('[data-qa="create-account"]').dblclick();

}

function validacaoComSucesso() {
    cy.get('[data-qa="account-created"]', { timeout: 10000 }).should('be.visible')
        .and('have.text', 'Account Created!');
    cy.contains('Congratulations! Your new account has been successfully created!')
        .should('be.visible');
    cy.contains('You can now take advantage of member privileges to enhance your online shopping experience with us.')
        .should('be.visible');
    cy.get('[data-qa="continue-button"]').click();
}

function loginComSucesso(email, senha) {
    cy.get('.login-form', { timeout: 10000 }).should('be.visible');
    cy.get('[data-qa="login-email"]')
        .should('be.visible')
        .focus()
        .invoke('val', email);
    cy.get('[data-qa="login-email"]').trigger('input');
    cy.get('[data-qa="login-email"]').trigger('change');
    //cy.get('[data-qa="login-email"]').blur();
    cy.get('[data-qa="login-password"]')
        .should('be.visible')
        .invoke('val', senha);
    cy.get('[data-qa="login-password"]').trigger('input');
    cy.get('[data-qa="login-password"]').trigger('change');
    cy.get('[data-qa="login-button"]').click({ force: true });
}

function validacaoUsuariologado(nome = 'Marcos') {
    cy.contains('.navbar-nav', `Logged in as ${nome}`)
        .should('be.visible')

}

function verificarMensagemErroExibidaLogin() {
    cy.contains('Your email or password is incorrect!')
        .should('be.visible');
}

function usuarioDeslogandoSistema() {
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.get('a[href="/logout"]', { timeout: 10000 }).click({ force: true });
    cy.url({ timeout: 10000 }).then((url) => {
        if (url.includes('/logout')) {
            cy.clearCookies();
            cy.visit('/login');
        }
    });
    cy.contains('Login to your account').should('be.visible');
    cy.get('[action*="login"]').should('be.visible');
}

function verificarNaoPermitirIniciarCadastro() {

    cy.get('[action*="signup"]').dblclick();
    cy.get('[data-qa="signup-name"]').type('Marcos');
    cy.get('[data-qa="signup-email"]').type('marcosepteste@gmail.com');
    cy.get('[data-qa="signup-button"]').dblclick();
}

function verificarFaleConosco() {
    cy.visit('/contact_us');
    cy.contains('Get In Touch').should('be.visible');
    cy.get('[data-qa="name"]').type('Marcos Paz')
    cy.get('[data-qa="email"]').type('marcosepteste@gmail.com');
    cy.get('[data-qa="subject"]').type('Produto veio errado');
    cy.get('[data-qa="message"]').type('Segue o anexo da imagem do produto que veio com defeito.');
    cy.get('input[name="upload_file"]').should('be.visible');
    cy.get('input[name="upload_file"]').click();
    cy.get('input[name="upload_file"]').selectFile('cypress/fixtures/Produto_com_defeito.png');
    cy.get('[data-qa="submit-button"]').dblclick();
}

function verificarProdutos() {
    cy.visit('/')
    cy.contains('Home').should('be.visible');
    cy.visit('/products')
    cy.get('h2.title.text-center', { timeout: 10000 })
        .should('be.visible')
        .and('contain.text', 'All Products');
    cy.get('a[href="/product_details/1"]').click();
    cy.get('h2').should('contain', 'Blue Top');
    cy.get('p').should('contain', 'Category: Women > Tops');
    cy.get('span').should('contain', 'Rs. 500');
    cy.get('#quantity').clear().type('2');
    cy.get('b').should('contain', 'Availability:');
    cy.get('b').should('contain', 'Condition:');
    cy.get('b').should('contain', 'Brand:');

}

function fazerBuscaPeloProduto() {
    cy.visit('/')
    cy.contains('Home').should('be.visible');
    cy.visit('/products')
    cy.get('h2.title.text-center', { timeout: 10000 })
        .should('be.visible')
        .and('contain.text', 'All Products');
    cy.get('#search_product').clear().type('polo');
    cy.get('#submit_search').click();
    cy.get('.features_items', { timeout: 10000 }).should('be.visible');
    cy.get('.productinfo p', { timeout: 10000 })
        .should('have.length.greaterThan', 0)
        .each(($el) => {
            cy.wrap($el)
                .invoke('text')
                .should('match', /polo/i);
        })


}

function adicionandoProduto() {

    cy.get('u').should('contain', 'View Cart').click();
    cy.get('.btn.btn-default.check_out').click();
    cy.get('a[href="/payment"]').click();
    cy.get('[data-qa="name-on-card"]').type('Marcos Ezequiel');
    cy.get('[data-qa="card-number"]').type('325898588747');
    cy.get('[data-qa="cvc"]').type('325');
    cy.get('[data-qa="expiry-month"]').type('12');
    cy.get('[data-qa="expiry-year"]').type('2028');
    cy.get('[data-qa="pay-button"]').dblclick();

}

function deletandoConta() {
    cy.get('a[href="/delete_account"]').click();
    cy.get('[data-qa="account-deleted"]').should('be.visible');
    cy.get('[data-qa="continue-button"]').dblclick();

}

function validandoRodaPe() {
    cy.visit('/')
    cy.contains('Subscription').should('be.visible');
    cy.get('#susbscribe_email').type('marcos@gmail.com');
    cy.get('#subscribe').click();


}



module.exports = {
    iniciarCadastro,
    preencherDadosPessoais,
    validacaoComSucesso,
    loginComSucesso,
    validacaoUsuariologado,
    verificarMensagemErroExibidaLogin,
    usuarioDeslogandoSistema,
    verificarNaoPermitirIniciarCadastro,
    verificarFaleConosco,
    verificarProdutos,
    fazerBuscaPeloProduto,
    adicionandoProduto,
    deletandoConta,
    validandoRodaPe

}