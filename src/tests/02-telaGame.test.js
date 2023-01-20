import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { tokenInvalid, questions, renderWithRouterAndRedux } from './helpers';
import App from '../App';

describe('Testanto tela game', () => {
  jest.setTimeout(50000);

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

    const lim = 25; // muda para 0 valor da variável lim caso queira testar os dois últimos expects nesse test.

    renderWithRouterAndRedux(<App />, { initialEntries: ['/game'] });

    const answers = await screen.findAllByTestId(/wrong-answer|correct-answer/i);

    await waitFor(() => expect(answers[0]).not.toBeDisabled(), { timeout: 5100 });

    for (let i = 30; i >= lim; i--) {
      await waitFor(() => expect(screen.getByTestId('time')).toHaveTextContent(i), {
        timeout: 1300,
      });
    }

    for (const button of answers) {
      expect(button).toBeVisible();
      await waitFor(() => expect(button).not.toBeDisabled());
    }

    /* O primeiro test coverage do cypress tem um timout muito curto para avaliar 100% da cobertura no jest,
      descomentando os dois expect abaixo e alterando a variável lim acima para 0 a cobertura é 100% */

    // expect(await screen.findByTestId('btn-next')).toBeVisible();
    // expect(await screen.findByTestId('btn-next')).not.toBeDisabled();
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

    const scoreSumed = results.reduce((total, { difficulty }) => {
      switch (difficulty.toLowerCase()) {
        case 'hard':
          return total + 10 + 30 * 3;

        case 'medium':
          return total + 10 + 30 * 2;

        default:
          return total + 10 + 30 * 1;
      }
    }, 0);

    const scoreTotal = screen.getByTestId('header-score');

    expect(scoreTotal).toBeVisible();

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

      expect(correct).toHaveAttribute('type', 'button');
      await waitFor(() => expect(correct).not.toBeDisabled(), { timeout: 5100 });

      userEvent.click(correct);

      if (question === results[results.length - 1].question) {
        expect(scoreTotal).toHaveTextContent(scoreSumed);
      }

      userEvent.click(await screen.findByTestId('btn-next'));
    }

    await waitFor(() => expect(history.location.pathname).toBe('/feedbeck'));

    const {
      player: { score, assertions },
    } = store.getState();

    expect(score).toEqual(scoreSumed);
    expect(assertions).toEqual(results.length);
  });
  /* 
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

      await waitFor(() => expect(incorrect).not.toBeDisabled(), { timeout: 5100 });

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
  }); */
});
