import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux, tokenValid } from './helpers';
import App from '../App';

describe('Testando a tela inicial', () => {
  beforeEach(
    () =>
      (global.fetch = jest.fn(() =>
        Promise.resolve({
          json: () => Promise.resolve(tokenValid),
        }),
      )),
  );

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
    expect(nameInput).toBeInTheDocument();
    expect(inputEmail).toBeInTheDocument();
  });
  test('Verifica se o botão é habilitado ao prencher nome e email', async () => {
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

    await act(() => userEvent.click(buttonPlay));

    expect(global.fetch).toHaveBeenCalled();
    expect(history.location.pathname).toBe('/game');
  });
  test('Verifica o botão de "Configurações" redireciona para pagina Settings', async () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const buttonConfig = screen.getByRole('button', {
      name: /configurações/i,
    });

    expect(buttonConfig).toBeInTheDocument();

    await act(() => userEvent.click(buttonConfig));

    expect(history.location.pathname).toBe('/settings');
  });

  test('Verifica se a page Login loga pressionando o botão `Enter` no input do e-email selecionado.', async () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const nameInput = screen.getByRole('textbox', {
      name: /nome:/i,
    });
    const inputEmail = screen.getByRole('textbox', {
      name: /e-mail:/i,
    });

    userEvent.type(nameInput, 'João');
    userEvent.type(inputEmail, 'joao@email.com');

    await act(() => userEvent.keyboard('{Enter}'));

    expect(history.location.pathname).toBe('/game');
  });
});
