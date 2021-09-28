import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import BtnLinkRouterDom from './BtnLinkRouterDom';

test('BtnLinkRouterDom - children', () => {
    const component = render(<BtnLinkRouterDom>Test</BtnLinkRouterDom>);
    expect(component.getByTestId('btn')).toHaveTextContent('Test')
});


