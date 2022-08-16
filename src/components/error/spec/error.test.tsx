import React from 'react'
import {render, fireEvent, waitFor, screen} from '@testing-library/react'
import Error from "../index";

describe('Error component', () => {
	test('test', () => {
		const { container } = render(<Error message={'Not found'} />)
		const elem = container.getElementsByClassName('wrapper')
		expect(elem).toBeTruthy()
		const errorMessage = screen.findByDisplayValue('Not found')
		expect(errorMessage).toBeTruthy()
	});
})
