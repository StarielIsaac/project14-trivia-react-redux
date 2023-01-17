import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { renderWithRouterAndRedux, tokenInvalid } from './helpers';
import App from '../App';

describe('Testando a page Game.', () => {
  test('Verifica se a page Game retorna para o page inicial Login.', async () => {
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

    await waitFor(() => expect(history.location.pathname).toBe('/'));
  });
});
