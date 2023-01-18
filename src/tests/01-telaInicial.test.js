import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';
import { obj } from './helpers/mocks';

describe('Testando a tela inicial', () => {
  test('Verifica se na tela possui capos para inserir nome e email', () => {
    renderWithRouterAndRedux(<App />);

    const nameInput = screen.getByRole('textbox', {
      name: /nome:/i,
    });

    const inputEmail = screen.getByRole('textbox', {
      name: /e-mail:/i,
    });

    const buttonPlay = screen.getByRole('button', {
      name: /play/i,
    });

    expect(buttonPlay).toBeDisabled();
    expect(nameInput).toBeDefined();
    expect(inputEmail).toBeDefined();
  });
  test('Verifica se o botão é habilitado ao prencher nome e email', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(obj),
    }));
    const { history } = renderWithRouterAndRedux(<App />);

    const nameInput = screen.getByRole('textbox', {
      name: /nome:/i,
    });
    const inputEmail = screen.getByRole('textbox', {
      name: /e-mail:/i,
    });
    const buttonPlay = screen.getByRole('button', {
      name: /play/i,
    });

    userEvent.type(nameInput, 'João');
    userEvent.type(inputEmail, 'joao@email.com');

    expect(buttonPlay).not.toBeDisabled();

    userEvent.click(buttonPlay);

    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    await waitFor(() => expect(history.location.pathname).toBe('/game'));
  });
  test('Verifica o botão de "Configurações" redireciona para pagina Settings', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const buttonConfig = screen.getByRole('button', {
      name: /configurações/i,
    });

    expect(buttonConfig).toBeDefined();

    userEvent.click(buttonConfig);
    expect(history.location.pathname).toBe('/settings');
  });
});
