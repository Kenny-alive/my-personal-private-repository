import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import About from './About';

describe('About component', () => {
  test('renders correctly with heading, links and back button', () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'About This App'
    );

    const githubLink = screen.getByRole('link', { name: /sergey kudrin/i });
    expect(githubLink).toHaveAttribute(
      'href',
      'https://github.com/Kenny-alive'
    );
    expect(githubLink).toHaveAttribute('target', '_blank');
    expect(githubLink).toHaveClass('text-indigo-600');

    const rsSchoolLink = screen.getByRole('link', {
      name: /rs school react course/i,
    });
    expect(rsSchoolLink).toHaveAttribute(
      'href',
      'https://rs.school/courses/reactjs'
    );
    expect(rsSchoolLink).toHaveAttribute('target', '_blank');

    const backButton = screen.getByRole('link', { name: /back to app/i });
    expect(backButton).toHaveAttribute('href', '/');
  });
});
