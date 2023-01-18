import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { renderWithRouterAndRedux, tokenInvalid, tokenValid } from './helpers';
import App from '../App';

describe('Testando a page Game.', () => {
  test('Verifica se a page Game retorna para o page inicial Login caso o token seja inválido.', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(tokenInvalid),
      }),
    );

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

    await act(() => userEvent.click(buttonPlay));

    expect(global.fetch).toHaveBeenCalledTimes(2);
    expect(history.location.pathname).toBe('/');
  });

  test('Verifica se as perguntas e respostas aparecem quando a page Game é montada.', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(tokenValid),
      }),
    );

    renderWithRouterAndRedux(<App />, { initialEntries: ['/game'] });

    expect(global.fetch).toHaveBeenCalledTimes(1);

    expect(await screen.findByTestId('correct-answer')).toBeInTheDocument();
    expect(await screen.findAllByTestId(/wrong-answer/i)).toHaveLength(3);
  });
});
