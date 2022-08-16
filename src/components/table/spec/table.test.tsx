import React from 'react'
import {render, fireEvent, waitFor, screen} from '@testing-library/react'
import Table from "../index";
import {IssueGithub} from "../../../types/IssueGithub";

let mockedId = 0
jest.mock('nanoid', () => ({
	nanoid: jest.fn(() => `nano-id-${mockedId++}`)
}));


describe('Table Form', function () {
	const mockOnUpdateFilter = jest.fn();
	beforeAll(() => {
		mockOnUpdateFilter.mockClear()
	})
	it('with no data', () => {
		const { debug, container } = render(<Table issues={[]} updateFilter={mockOnUpdateFilter} filter={{ sort: '', direction: ''}} />)
		const rowData = container.getElementsByTagName('tr')
		debug()
		expect(rowData.length).toBe(1)
	})
	const issuesData: IssueGithub[] = [
		{ title: 'Issue 1', comments: '0', created_at: '01-08-2002', updated_at: '01-08-2002', state: 'open', html_url: 'html_url'},
		{ title: 'Issue 2', comments: '7', created_at: '08-01-2020', updated_at: '08-01-2020', state: 'open', html_url: 'html_url'}
	]
	it('with data', () => {
		const { debug, container } = render(<Table issues={issuesData} updateFilter={mockOnUpdateFilter} filter={{ sort: '', direction: ''}} />)
		const rowData = container.getElementsByTagName('tr')
		expect(rowData.length).toBe(3)
	})
});
