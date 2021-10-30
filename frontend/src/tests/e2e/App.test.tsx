import React from 'react';
import {render} from '@testing-library/react';
import App from '../../App/App';
import {store} from "../../redux/store/store";
import UnhandledErrorBoundary from "../../components/boundary/UnhandledErrorBoundary";
import {Provider} from "react-redux";

test('app render', () => {
    render(
        <Provider store={store}>
            <UnhandledErrorBoundary>
                <App/>
            </UnhandledErrorBoundary>
        </Provider>
    );
    // const linkElement = screen.getByText(/learn react/i);
    // expect(linkElement).toBeInTheDocument();
});
