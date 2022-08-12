import ArrowSVG from "../../svg/arrow";
import styles from "./filters.module.scss"

interface FiltersProps {
	onClick: any;
	filter: any;
	type: string;
	labelTooltip: string;
}

const Filters = ({ type, onClick, filter, labelTooltip }: FiltersProps) => {
	return <div className={styles.wrapper} title={`sort ${labelTooltip} by ASC or DESC`}>
		<ArrowSVG onClick={() => onClick('asc')} active={type === filter.sort && 'asc' === filter.direction}/>
		<ArrowSVG onClick={() => onClick('desc')}  active={type === filter.sort && 'desc' === filter.direction} rotate={180} />
	</div>
}

export default Filters
