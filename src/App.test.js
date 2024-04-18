import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import LoginPage from './Pages/LoginPage';
//Unit Tests

/*
test('add', () => {
  const value=add(1,2);
  expect(value).toBe(3);
});

test('total',()=>{
  expect(total(5,10)).toBe('$15');

})
*/




describe('LoginPage Component', () => {
  test('renders login form', () => {
    render(<LoginPage />);
    const emailInput = screen.getByLabelText('Email:');
    const passwordInput = screen.getByLabelText('Password:');
    const loginButton = screen.getByRole('button', { name: 'Login' });
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });

/*  test('submits login form with valid data', async () => {
    render(<LoginPage />);
    const emailInput = screen.getByLabelText('Email:');
    const passwordInput = screen.getByLabelText('Password:');
    const loginButton = screen.getByRole('button', { name: 'Login' });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(loginButton);

    await waitFor(() => {
      // Assertions for success scenario after login form submission
      // For example: Expect navigation to occur after successful login
    });
  }
  
  );*/
});




//Integration Tests


describe('Navigation', () => {
  it('should navigate to the login page when login link is clicked', () => {
    cy.visit('/');
    cy.contains('Login').click();
    cy.url().should('include', '/login');
  });