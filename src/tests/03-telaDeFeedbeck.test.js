import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import Feedback from '../pages/Feedback';
import App from '../App';
import { userMaicon } from './helpers/mocks';

describe('Testando a tela de Feedback', () => {
  test('Verifica se a menssagem correta é exbida', () => {
    renderWithRouterAndRedux(<Feedback />, userMaicon);

    const feedbackMessage = screen.getByTestId('feedback-text');

    expect(feedbackMessage).toBeInTheDocument();
    expect(feedbackMessage).toHaveTextContent('Could be better...');
  });
  test('Verifica se os elemento relacionados ao resultado são renderizados', () => {
    renderWithRouterAndRedux(<Feedback />, userMaicon);

    const feedbackScore = screen.getByTestId('feedback-total-score');
    const feedbackAssertion = screen.getByTestId('feedback-total-question');

    expect(feedbackScore).toBeInTheDocument();
    expect(feedbackAssertion).toBeInTheDocument();
  });
  test('Verifica se o botão "Play Again" retorna para tela inicial', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/feedbeck');
    });

    const buttonPlayAgain = screen.getByTestId('btn-play-again');
    expect(buttonPlayAgain).toBeInTheDocument();
    userEvent.click(buttonPlayAgain);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });
  test('Verifica se o botão "Ranking" redireciona para de Ranking', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/feedbeck');
    });

    const buttonRanking = screen.getByTestId('btn-ranking');
    expect(buttonRanking).toBeInTheDocument();
    userEvent.click(buttonRanking);
    const { pathname } = history.location;
    expect(pathname).toBe('/ranking');
  });
});
