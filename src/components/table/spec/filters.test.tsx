import React from 'react'
import {render, fireEvent, waitFor, screen} from '@testing-library/react'
import Filters from "../filters";

describe('Filters component', () => {
	const mockOnClick = jest.fn(e => e.preventDefault());
	test('check svg attribute when its a current filter', () => {
		const { container } = render(<Filters onClick={mockOnClick} filter={{ sort: 'comments', direction: 'asc' }} labelTooltip={'comments'} type={'comments'} />)
		const SVGs = container.getElementsByTagName('svg')
		expect(SVGs.length).toBe(2)
		expect(SVGs[0].querySelector('path[opacity="1"]')).toBeTruthy()
		expect(SVGs[1].querySelector('path[opacity="0.3"]')).toBeTruthy()
	})
	test('check svg attribute when its a not current filter', () => {
		const { container } = render(<Filters onClick={mockOnClick} filter={{ sort: 'created_at', direction: 'asc' }} labelTooltip={'comments'} type={'comments'} />)
		const SVGs = container.getElementsByTagName('svg')
		expect(SVGs.length).toBe(2)
		expect(SVGs[0].querySelector('path[opacity="0.3"]')).toBeTruthy()
		expect(SVGs[1].querySelector('path[opacity="0.3"]')).toBeTruthy()
	})
})
