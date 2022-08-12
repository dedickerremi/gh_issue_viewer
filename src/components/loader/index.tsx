import React from 'react'
import LoaderSVG from "../../svg/loader";
import styles from './loader.module.scss'

const Loader = () => {
	return <div className={styles.wrapper}>
		<LoaderSVG />
	</div>
}

export default Loader
