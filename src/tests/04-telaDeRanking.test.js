import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import Ranking from '../pages/Ranking';
import App from '../App';
import { localStorageMock } from './helpers/mocks';

const NUMBER1 = 240;
const NUMBER2 = 200;
const NUMBER3 = 160;

describe('Verificando a page /Ranking/', () => {
  it('Verificando de o título é renderizado', () => {
    renderWithRouterAndRedux(<Ranking />);
    const title = screen.getByRole('heading', { name: /ranking/i });
    expect(title).toBeInTheDocument();
  });
  it('Verificando de o botão Jogar novamente é renderizado', () => {
    renderWithRouterAndRedux(<Ranking />);
    const btn = screen.getByTestId('btn-go-home');
    expect(btn).toBeInTheDocument();
  });
  it('Verifica se o ranking esta na ordem de certa', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    Object.defineProperty(window, 'localStorage', { value: localStorageMock });

    act(() => {
      history.push('/ranking');
    });
    const rancking1 = screen.getByTestId('player-name-0');
    const rancking2 = screen.getByTestId('player-name-1');
    const rancking3 = screen.getByTestId('player-name-2');

    expect(rancking1).toHaveTextContent('Maria');
    expect(rancking2).toHaveTextContent('Ricardo');
    expect(rancking3).toHaveTextContent('José');

    const score1 = screen.getByTestId('player-score-0');
    const score2 = screen.getByTestId('player-score-1');
    const score3 = screen.getByTestId('player-score-2');

    expect(score1).toHaveTextContent(NUMBER1);
    expect(score2).toHaveTextContent(NUMBER2);
    expect(score3).toHaveTextContent(NUMBER3);
  });
  it('Verifica se o botão "Retornar para tela login" redireciona a tela', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    act(() => {
      history.push('/ranking');
    });
    const buttonLogin = screen.getByRole('button', {
      name: /retornar a tela de login/i,
    });
    userEvent.click(buttonLogin);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });
});
