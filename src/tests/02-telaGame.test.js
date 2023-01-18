import { findByAltText, findByText, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';
import { questionsResponse, invalidTokenQuestionsResponse } from './helpers/mocks'

describe('Testanto tela game', () => {
  jest.setTimeout(1100000)
  test('Verifica se o jogo possui 5 questões e na ultima ele redireciona para tela de feedbeck', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(questionsResponse),
    }));
    const { history } = renderWithRouterAndRedux(<App/>);
    const nameInput = screen.getByRole('textbox', {
      name: /nome:/i,
    });

    const inputEmail = screen.getByRole('textbox', {
      name: /e-mail:/i,
    });

    const buttonPlay = screen.getByRole('button', {
      name: /play/i,
    });

    userEvent.type(nameInput, 'eduardo');
    userEvent.type(inputEmail, 'dudu@email.com');
    userEvent.click(buttonPlay);
    await waitForElementToBeRemoved(inputEmail);

    const category = await screen.findByText(/Geography/i)
    expect(category).toBeInTheDocument();

    const question =  screen.getByText('The Republic of Malta is the smallest microstate worldwide.');
    expect(question).toBeInTheDocument();

    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(2);

    const incorrectAnswers = screen.getByRole('button', {name: 'True'})
    await waitFor(() => expect(incorrectAnswers).not.toBeDisabled(),{timeout: 5500})
    userEvent.click(incorrectAnswers);

    const score = screen.getByTestId('header-score');
    expect(score).toBeInTheDocument();

    const buttonNext = screen.getByTestId('btn-next');
    userEvent.click(buttonNext);

    const question2 = screen.getByText('In quantum physics, which of these theorised sub-atomic particles has yet to be observed?');
    expect(question2).toBeInTheDocument();

    const correcAnswer2 = screen.getByTestId('correct-answer');
    await waitFor(() => expect(correcAnswer2).not.toBeDisabled(),{timeout: 5500});
    userEvent.click(correcAnswer2);

    const buttonNext2 = screen.getByTestId('btn-next');
    userEvent.click(buttonNext2);

    const question3 = screen.getByText("Generally, which component of a computer draws the most power?");
    expect(question3).toBeInTheDocument();

    const correcAnswer3 = screen.getByTestId('correct-answer');
    await waitFor(() => expect(correcAnswer3).not.toBeDisabled(),{timeout: 5500});
    userEvent.click(correcAnswer3);

    const buttonNext3 = screen.getByTestId('btn-next');
    userEvent.click(buttonNext3);

    const question4 = screen.getByText('What is the most expensive weapon in Counter-Strike: Global Offensive?');
    expect(question4).toBeInTheDocument();

    const timer = screen.getByTestId('time');
    expect(timer).toHaveTextContent(30);

    await waitFor(() => expect(screen.getByTestId('btn-next')).toBeInTheDocument() ,{timeout: 36500});
    const timer2 = screen.getByTestId('time');
    expect(timer2).toHaveTextContent(0);

    const buttonNext4 = screen.getByTestId('btn-next');
    userEvent.click(buttonNext4);

    const question5 = screen.getByText('Who was the Author of the manga Uzumaki?');
    expect(question5).toBeInTheDocument();

    const correcAnswer5 = screen.getByTestId('correct-answer');
    await waitFor(() => expect(correcAnswer5).not.toBeDisabled(),{timeout: 5500});
    userEvent.click(correcAnswer5);

    const buttonNext5 = screen.getByTestId('btn-next');
    userEvent.click(buttonNext5);

    const { pathname } = history.location;

    expect(pathname).toBe('/feedbeck');

    const scoreTotal = screen.getByTestId('feedback-total-score');
    expect(scoreTotal).toBeInTheDocument();
    expect(scoreTotal).toHaveTextContent(120)
  });
  test('Verifica se token for invalido a pagina é redirecionada para tela principal', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(invalidTokenQuestionsResponse),
    }));
    const { history } = renderWithRouterAndRedux(<App/>);
    const nameInput = screen.getByRole('textbox', {
      name: /nome:/i,
    });

    const inputEmail = screen.getByRole('textbox', {
      name: /e-mail:/i,
    });

    const buttonPlay = screen.getByRole('button', {
      name: /play/i,
    });

    userEvent.type(nameInput, 'eduardo');
    userEvent.type(inputEmail, 'dudu@email.com');
    userEvent.click(buttonPlay);
    await waitForElementToBeRemoved(inputEmail);

    const nameUser = screen.getByTestId('header-player-name');

    await waitForElementToBeRemoved(nameUser);

    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });
});