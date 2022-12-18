import { render, screen, cleanup, afterEach, fireEvent, waitFor } from '@testing-library/react';
import { toBeInTheDocument } from '@testing-library/jest-dom/dist/matchers';

import App from '../App';

test('renders header', () => {
    render(<App />)
});

describe('LoggedInApp sections',()=>{
    test('home section',()=>{
        const tree = renderer.create(<Home />).toJSON();
        expect(tree).toMatchSnapshot();
    });
    test('table of crypto coins loads in home',async ()=>{
        render(<Home />)
        const table = screen.getByTestId('home-table');
        expect(table).toBeInTheDocument();
    });
    test('portfolio section',()=>{
        const tree = renderer.create(<Portfolio />).toJSON();
        expect(tree).toMatchSnapshot();
    })
    test('trade section',()=>{
        const tree = renderer.create(<Trade />).toJSON();
        expect(tree).toMatchSnapshot();
    })
});
