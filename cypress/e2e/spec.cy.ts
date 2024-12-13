describe('verificar mi app', () => {
  it('verificar login incorrecto', () => {
    cy.visit('http://localhost:8100').then(() => {
      cy.wait(1000);
      cy.get('body').then(($body) => {
        if ($body.find('#logout-button').length > 0) {
          cy.get('#logout-button').then(($button) => {
            if ($button.is(':visible')) {
              cy.wrap($button).click(); // Haz clic si el botón existe y es visible
            } else {
              cy.log('El botón no está visible, no se realizó la acción');
            }
          });
        } else {
          cy.log('El botón no existe, no se realizó la acción');
        }
      });
      cy.get('#correo').invoke('val','correo-incorrecto@duocuc.cl')
      cy.get('#password').invoke('val','1234')
      cy.contains('Ingresar').click();
      cy.wait(2000);
      cy.get('#logout-button').click()
    });
  })
  it('verificar login correcto', () => {
    cy.visit('http://localhost:8100').then(() => {
      cy.wait(2000);
      cy.get('#correo').invoke('val','jperez');
      cy.wait(1000);
      cy.get('#password').invoke('val','5678');
      cy.wait(1000);
      cy.contains('Ingresar').click();
      cy.wait(2000);
      cy.get('#logout-button').click()
    });
  })
  it('verificar registro de cuenta', () => {
    cy.visit('http://localhost:8100').then(() => {
      cy.get('#registrar').click();
      cy.wait(200);
      cy.get('#email').invoke('val','bas@duocuc.cl')
      cy.wait(200);
      cy.get('#username').invoke('val','bastylos')
      cy.wait(200);
      cy.get('#nombre').invoke('val','Bastian')
      cy.wait(200);
      cy.get('#apellido').invoke('val','Cabezas')
      cy.wait(200);
      cy.get('#direccion').invoke('val','Leonora Latorre 3154')
      cy.wait(200);
      cy.get('#nivelEducacional').click();
      cy.wait(200);
      cy.contains('ion-select-option', 'Superior Incompleta').click({ force: true });
      cy.wait(200);
      cy.contains('OK').click();
      cy.wait(200);
      cy.get('#pass').invoke('val','5678')
      cy.wait(200);
      cy.get('#re_password').invoke('val','5678')
      cy.wait(200);
      cy.get('#Pregunta').invoke('val','cual es tu nombre?')
      cy.wait(200);
      cy.get('#respuesta').invoke('val','Bastian')
      cy.wait(200);
      cy.get('#registrarse').click();
      cy.contains('Volver al inicio').click();
    });
  })
  it('verificar inicio de cuenta registrada', () => {
    cy.visit('http://localhost:8100').then(() => {
      cy.get('#correo').invoke('val','bas@duocuc.cl');
      cy.get('#password').invoke('val','5678');
      cy.wait(200);
      cy.contains('Ingresar').click();
      cy.wait(1000);
      cy.get('#logout-button').click();
    });
  })
  it('verificar funcionalidad de olvide mi contraseña',() => {
    cy.visit('http://localhost:8100').then(() =>{
      cy.get('#o_password').click();
      cy.wait(1000);
      cy.get('#mail').invoke('val', 'atorres@duocuc.cl');
      cy.wait(300);
      cy.get('#completar').click();
      cy.wait(300);
      cy.get('#res').invoke('val', 'gato');
      cy.wait(500);
      cy.get('#boton_respuesta').click();
    })

  })
})