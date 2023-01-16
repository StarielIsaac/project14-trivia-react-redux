import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Login from '../../pages/Login';

describe('Login', () => {
  it('verifica se os elementos de input e botão estão presentes', () => {
    const { getByTestId } = render(<Login />);
    expect(getByTestId('input-player-name')).toBeInTheDocument();
    expect(getByTestId('input-gravatar-email')).toBeInTheDocument();
    expect(getByTestId('btn-play')).toBeInTheDocument();
  });

  it('verifica se o botão está desabilitado ao iniciar', () => {
    const { getByTestId } = render(<Login />);
    const playButton = getByTestId('btn-play');
    expect(playButton).toBeDisabled();
  });

  it('verifica se o botão está habilitado ao preencher nome e email', () => {
    const { getByTestId } = render(<Login />);
    const nameInput = getByTestId('input-player-name');
    const emailInput = getByTestId('input-gravatar-email');
    const playButton = getByTestId('btn-play');

    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'johndoe@example.com' } });

    expect(playButton).toBeEnabled();
  });
});

  test('Verifica se o input para o nome está funcionando corretamente e se o estado do componente está sendo atualizado de acordo', () => {
    const { getByTestId } = render(<Login />);
    const nameInput = getByTestId('input-player-name');
    fireEvent.change(nameInput, { target: { value: 'Test User' } });
    expect(nameInput.value).toBe('Test User');
  });

  test('Verifica se o input para o email está funcionando corretamente e se o estado do componente está sendo atualizado de acordo.', () => {
    const { getByTestId } = render(<Login />);
    const emailInput = getByTestId('input-gravatar-email');
    fireEvent.change(emailInput, { target: { value: 'testuser@email.com' } });
    expect(emailInput.value).toBe('testuser@email.com');
  });

  