import React from "react";
import styles from './error.module.scss'

interface ErrorProps {
	message: string
}

const Error = ({ message }: ErrorProps) => {
	return <div className={styles.wrapper}>
		<h4 className={styles.title} >Something wrong happened</h4>
		<p>{ message }</p>
	</div>
}

export default Error
