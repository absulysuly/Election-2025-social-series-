import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ElectionHubPage from '../components/serious/pages/ElectionHubPage';

describe('ElectionHubPage', () => {
  it('renders the main heading', () => {
    render(
      <MemoryRouter>
        <ElectionHubPage />
      </MemoryRouter>
    );
    
    // Check if the main heading is rendered
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('دليل الناخب');
  });

  it('renders all info steps', () => {
    render(
      <MemoryRouter>
        <ElectionHubPage />
      </MemoryRouter>
    );
    
    // Check if all 4 info steps are rendered
    const stepTitles = screen.getAllByText(/\d\./);
    expect(stepTitles).toHaveLength(4);
  });

  it('contains links to external resources', () => {
    render(
      <MemoryRouter>
        <ElectionHubPage />
      </MemoryRouter>
    );
    
    // Check for external links
    const ihecLinks = screen.getAllByRole('link', { name: /ihec\.iq/i });
    expect(ihecLinks.length).toBeGreaterThan(0);
  });
});
