import React from 'react'
import {render, fireEvent, waitFor, screen} from '@testing-library/react'
import Form from "../index";

describe('Form component', () => {
	const mockOnSubmit = jest.fn(e => e.preventDefault());
	beforeEach(() => {
		mockOnSubmit.mockClear()
	})
	test('basic submit', () => {
		const { container, getByText } = render(<Form onSubmit={mockOnSubmit} />)
		const inputs = container.getElementsByTagName('input')
		expect(inputs.length).toBe(2)
		expect(inputs[0].value).toBe('reactjs')
		expect(inputs[1].value).toBe('reactjs.org')
		fireEvent.click(getByText(/Search/i));
		expect(mockOnSubmit).toBeCalled()
	});
	test('submit failed on empty input', () => {
		const { container, getByText } = render(<Form onSubmit={mockOnSubmit} />)
		const inputs = container.getElementsByTagName('input')
		inputs[0].value = ''
		expect(inputs.length).toBe(2)
		fireEvent.click(getByText(/Search/i));
		expect(mockOnSubmit).not.toBeCalled()
	});
})
