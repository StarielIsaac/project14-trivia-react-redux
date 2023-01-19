import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux, maiconSucess, maiconFail } from './helpers';
import App from '../App';

describe('Testando a tela de Feedback', () => {
  test('Verifica se a messagem `Well Done!` corretamente.', async () => {
    renderWithRouterAndRedux(<App />, {
      initialState: { player: { ...maiconSucess } },
      initialEntries: ['/feedbeck'],
    });

    const feedbackMessage = screen.getByTestId('feedback-text');
    const pointsScore = screen.getByTestId('feedback-total-score');
    const countAssertions = screen.getByTestId('feedback-total-question');

    expect(feedbackMessage).toBeVisible();
    expect(pointsScore).toBeVisible();
    expect(countAssertions).toBeVisible();
    expect(feedbackMessage).toHaveTextContent('Well Done!');
    expect(pointsScore).toHaveTextContent(maiconSucess.score);
    expect(countAssertions).toHaveTextContent(maiconSucess.assertions);
  });

  test('Verifica se a messagem `Could be better...` corretamente.', async () => {
    renderWithRouterAndRedux(<App />, {
      initialState: { player: { ...maiconFail } },
      initialEntries: ['/feedbeck'],
    });

    const feedbackMessage = screen.getByTestId('feedback-text');
    const pointsScore = screen.getByTestId('feedback-total-score');
    const countAssertions = screen.getByTestId('feedback-total-question');

    expect(feedbackMessage).toBeVisible();
    expect(pointsScore).toBeVisible();
    expect(countAssertions).toBeVisible();
    expect(feedbackMessage).toHaveTextContent('Could be better...');
    expect(pointsScore).toHaveTextContent(maiconFail.score);
    expect(countAssertions).toHaveTextContent(maiconFail.assertions);
  });

  test('Verifica se o botão "Play Again" retorna para tela inicial', async () => {
    const { history } = renderWithRouterAndRedux(<App />, {
      initialEntries: ['/feedbeck'],
    });

    const buttonPlayAgain = screen.getByTestId('btn-play-again');
    expect(buttonPlayAgain).toBeInTheDocument();
    userEvent.click(buttonPlayAgain);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });
  test('Verifica se o botão "Ranking" redireciona para de Ranking', async () => {
    const { history } = renderWithRouterAndRedux(<App />, {
      initialEntries: ['/feedbeck'],
    });

    const buttonRanking = screen.getByTestId('btn-ranking');
    expect(buttonRanking).toBeInTheDocument();
    userEvent.click(buttonRanking);
    const { pathname } = history.location;
    expect(pathname).toBe('/ranking');
  });
});
