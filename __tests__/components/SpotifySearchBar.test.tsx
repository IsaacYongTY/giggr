import React from 'react';
import { render } from '@testing-library/react';

import SpotifySearchBar from '../../components/common/SpotifySearchBar';

function renderSpotifySearchBar() {
    const utils = render(
        <SpotifySearchBar setFormValue={jest.fn()} database="database1" />
    );
    return { ...utils };
}

describe('<SpotifySearchBar />', () => {
    it('should display loader when the input is valid', () => {
        renderSpotifySearchBar();
    });
    it.todo('should hide loader after the data is loaded');
    it.todo('should be disabled when the data is loading');
});
