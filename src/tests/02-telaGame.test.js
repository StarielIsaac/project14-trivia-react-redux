import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { tokenInvalid, questions, renderWithRouterAndRedux } from './helpers';
import App from '../App';

describe('Testanto tela game', () => {
  jest.setTimeout(1100000);

  test('Verifica se token for invalido a pagina é redirecionada para tela principal', async () => {
    global.fetch = jest
      .fn(() =>
        Promise.resolve({
          json: () => Promise.resolve(tokenInvalid),
        }),
      )
      .mockReturnValueOnce(
        Promise.resolve({
          json: () => Promise.resolve('123abc'),
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

    userEvent.click(buttonPlay);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(2);
      expect(history.location.pathname).toBe('/');
    });
  });

  test('Verifica se após 5 segundos o time decrementa a cada segundo e ao acabar, o botão para próxima pergunta aparece.', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(questions),
      }),
    );

    renderWithRouterAndRedux(<App />, { initialEntries: ['/game'] });

    const answers = await screen.findAllByTestId(/wrong-answer|correct-answer/i);

    await waitFor(() => expect(answers[0]).not.toBeDisabled(), { timeout: 5500 });

    for (let i = 30; i >= 0; i--) {
      await waitFor(() => expect(screen.getByTestId('time')).toHaveTextContent(i), {
        timeout: 1500,
      });
    }

    for (const button of answers) {
      expect(button).toBeInTheDocument();
      await waitFor(() => expect(button).toBeDisabled());
    }

    expect(await screen.findByTestId('btn-next')).toBeVisible();
    expect(await screen.findByTestId('btn-next')).not.toBeDisabled();
  });

  test('Verifica se o jogo acumula os pontos acertando todas as questões.', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(questions),
      }),
    );

    const { results } = questions;

    const { history, store } = renderWithRouterAndRedux(<App />, {
      initialEntries: ['/game'],
    });

    for (const { category, correct_answer, question, incorrect_answers } of results) {
      expect(await screen.findByText(category)).toBeVisible();
      expect(await screen.findByText(question)).toBeVisible();

      const answers = screen.getAllByTestId(/wrong-answer|correct-answer/i);

      expect(answers).toHaveLength(incorrect_answers.length + 1);

      for (const button of answers) {
        expect(button).toHaveAttribute('type', 'button');
        expect(button).toBeVisible();
        expect(button).toBeDisabled();
      }

      const correct = screen.getByText(correct_answer);

      await waitFor(() => expect(correct).not.toBeDisabled(), { timeout: 5500 });

      userEvent.click(correct);

      if (question === results[results.length - 1].question) {
        const scoreTotal = screen.getByTestId('header-score');

        expect(scoreTotal).toBeVisible();
        expect(scoreTotal).toHaveTextContent(/200/);
      }

      userEvent.click(await screen.findByTestId('btn-next'));
    }

    await waitFor(() => expect(history.location.pathname).toBe('/feedbeck'));

    const {
      player: { score, assertions },
    } = store.getState();

    expect(score).toEqual(200);
    expect(assertions).toEqual(5);
  });

  test('Verifica se o jogo não acumula os pontos errando todas as questões.', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(questions),
      }),
    );

    const { results } = questions;

    const { history, store } = renderWithRouterAndRedux(<App />, {
      initialEntries: ['/game'],
    });

    for (const { category, question, incorrect_answers } of results) {
      expect(await screen.findByText(category)).toBeVisible();
      expect(await screen.findByText(question)).toBeVisible();

      const answers = screen.getAllByTestId(/wrong-answer|correct-answer/i);

      expect(answers).toHaveLength(incorrect_answers.length + 1);

      for (const button of answers) {
        expect(button).toHaveAttribute('type', 'button');
        expect(button).toBeVisible();
        expect(button).toBeDisabled();
      }
      const index = Math.floor(Math.random() * incorrect_answers.length);
      const incorrect = screen.getByText(incorrect_answers[index]);

      await waitFor(() => expect(incorrect).not.toBeDisabled(), { timeout: 5500 });

      userEvent.click(incorrect);

      if (question === results[results.length - 1].question) {
        const scoreTotal = screen.getByTestId('header-score');

        expect(scoreTotal).toBeVisible();
        expect(scoreTotal).toHaveTextContent(/0/);
      }

      userEvent.click(await screen.findByTestId('btn-next'));
    }

    await waitFor(() => expect(history.location.pathname).toBe('/feedbeck'));

    const {
      player: { score, assertions },
    } = store.getState();

    expect(score).toEqual(0);
    expect(assertions).toEqual(0);
  });
});
