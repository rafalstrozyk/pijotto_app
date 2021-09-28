import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import BtnRrdLink from './BtnRrdLink';

const Container = ({ children }) => (
  <Router>
    <Switch>
      <Route path="/">
        <div>
          <h1>Test home</h1>
        </div>
      </Route>
    </Switch>
    {children}
  </Router>
);

let rerender;
beforeEach(() => {
  const component = render(
    <Container>
      <BtnRrdLink>Test</BtnRrdLink>
    </Container>
  );
  rerender = component.rerender;
});

test('BtnRrdLink - render children', () => {
  expect(screen.getByTestId('btn')).toHaveTextContent('Test');
});

test('BtnRrdLink - default props', () => {
  expect(BtnRrdLink.defaultProps.link).toBe('/');
  expect(BtnRrdLink.defaultProps.functionOnClick).toBeDefined();
});

test('BtnRrdLink - onClick without link prop', () => {
  screen.getByTestId('btn').click();
  expect(screen.getByTestId('btn')).toHaveTextContent('Test');
});

test('BtnRrdLink - onClick handle prop function', () => {
  let boolVar = false;
  const testingHandleFunction = () => {
    boolVar = !boolVar;
  };
  rerender(
    <Container>
      <BtnRrdLink functionOnClick={testingHandleFunction} link="/">Test2</BtnRrdLink>
    </Container>
  );
  expect(screen.getByTestId('btn')).toHaveTextContent('Test2');
  const btn = screen.getByTestId('btn');
  expect(boolVar).toBe(false);

  btn.click();
  expect(boolVar).toBe(true);
});
