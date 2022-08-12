import React from "react";
import styles from "./form.module.scss";

interface FormProps {
	onSubmit: (event: any) => void
}

const sortOptions = [
	{ value: 'created_at', label: 'Created At' },
	{ value: 'updated_at', label: 'Updated At' },
	{ value: 'comments', label: 'Comments' }
]

const Form = ({ onSubmit }: FormProps) => {
	return <form onSubmit={onSubmit} className={styles.form}>
		<input defaultValue={'reactjs'} type={'text'} name={'owner'} placeholder={'owner'} required />
		<input defaultValue={'reactjs.org'} type={'text'} name={'repository'} placeholder={'repository'} required />
		<select name={'sort'}>
			{ sortOptions.map(({value, label}) => {
				return <option key={`option-sort-${label}`} value={value}>{label}</option>
			}) }
		</select>
		<select name={'direction'}>
			{ ['asc', 'desc'].map(sort => {
				return <option key={`option-direction-${sort}`} value={sort}>{sort}</option>
			}) }
		</select>
		<button type={'submit'}>Search</button>
	</form>
}

export default Form
