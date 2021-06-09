import React from 'react';
import * as ReactDOM from 'react-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import fetchMock from 'fetch-mock';
import App from './App';


describe('App', () => {

  beforeEach(() => {
    fetchMock.restore();
  })

  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('should render initial UI as expected', () => {
    render(<App />);
    const table = screen.getByRole('table', {name: /data-table/i});
    const searchForm = screen.getByRole('form', {name: /search-form/i});
    const searchInput = screen.getByPlaceholderText(/search by name/i);
    const listIdDropdown = screen.getByRole('combobox');

    expect(searchForm).toBeInTheDocument();
    expect(searchInput).toHaveValue('');

    expect(listIdDropdown).toBeInTheDocument();
    expect(listIdDropdown).toHaveLength(5);
    expect(listIdDropdown).toHaveDisplayValue('All');
    expect(listIdDropdown).not.toHaveDisplayValue([1, 2, 3, 4]);

    expect(table).toBeInTheDocument();
    expect(table).toHaveTextContent(/list id/i);
    expect(table).toHaveTextContent(/id/i);
    expect(table).toHaveTextContent(/name/i);
  });

  it('should display all the data initially', async () => {
    render(<App />);
    const tableBody = screen.getAllByRole('rowgroup')[1];

    const url = 'https://fetch-hiring.s3.amazonaws.com/hiring.json';
    fetchMock.once(url, 200);

    await waitFor(() => {
      expect(tableBody).toHaveTextContent('Item');
    });
    expect(tableBody).toHaveTextContent('1');
    expect(tableBody).toHaveTextContent('2');
    expect(tableBody).toHaveTextContent('3');
    expect(tableBody).toHaveTextContent('4');
  });

  it('should show correct data when selecting List ID in dropdown', async () => {
    render(<App />);
    const listIdDropdown = screen.getByRole('combobox');
    const tableBody = screen.getAllByRole('rowgroup')[1];

    const url = 'https://fetch-hiring.s3.amazonaws.com/hiring.json';
    fetchMock.once(url, 200);

    userEvent.selectOptions(listIdDropdown, '1');
        
    await waitFor(() => {
      expect(tableBody).toHaveTextContent('Item');
    });

    const dataRows = screen.getAllByTestId('data-row');
    dataRows.forEach((row) => {
      expect(row.firstChild).toHaveTextContent('1');
      expect(row.firstChild).not.toHaveTextContent('2');
      expect(row.firstChild).not.toHaveTextContent('3');
      expect(row.firstChild).not.toHaveTextContent('4');
    });
  });
    
  it('should show correct data on search input', async () => {
    render(<App />);
    const searchInput = screen.getByPlaceholderText(/search by name/i);
    const tableBody = screen.getAllByRole('rowgroup')[1];
    
    const url = 'https://fetch-hiring.s3.amazonaws.com/hiring.json';
    fetchMock.once(url, 200);

    userEvent.type(searchInput, 'item 276');

    await waitFor(() => {
      expect(tableBody).toHaveTextContent(276);
    });
    expect(tableBody).toHaveTextContent(1);
    expect(tableBody).toHaveTextContent('Item 276');
    expect(tableBody).not.toHaveTextContent('Item 684');
  });

  it('should show correct data on search input and selecting List ID in dropdown', async () => {
    render(<App />);
    const searchInput = screen.getByPlaceholderText(/search by name/i);
    const listIdDropdown = screen.getByRole('combobox');
    const tableBody = screen.getAllByRole('rowgroup')[1];
    
    const url = 'https://fetch-hiring.s3.amazonaws.com/hiring.json';
    fetchMock.once(url, 200);

    userEvent.selectOptions(listIdDropdown, '1');
        
    await waitFor(() => {
      expect(tableBody).toHaveTextContent('Item');
    });

    expect(tableBody).toHaveTextContent('1');
    expect(tableBody).toHaveTextContent('Item 0');
    expect(tableBody).toHaveTextContent('Item 415');

    userEvent.type(searchInput, '415');

    expect(tableBody).not.toHaveTextContent('Item 0');
    expect(tableBody).toHaveTextContent('Item 415');
  });
});
