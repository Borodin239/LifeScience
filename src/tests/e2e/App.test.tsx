import React from 'react';
import {render} from '@testing-library/react';
import App from '../../App/App';

test('app render', () => {
    render(<App/>);
    // const linkElement = screen.getByText(/learn react/i);
    // expect(linkElement).toBeInTheDocument();
});
