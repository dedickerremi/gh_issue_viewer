import React from "react";
import styles from "./table.module.scss";
import {nanoid} from "nanoid";
import {DateTime} from "luxon";
import Filters from "./filters";
import {IssueGithub} from "../../types/IssueGithub";
import {Filter, SortType} from "../../types/Filter";

interface TableProps {
	issues: IssueGithub[];
	updateFilter: (type: SortType) => any;
	filter: Filter;
}

const Table = ({ issues, updateFilter, filter }: TableProps) => {
	const elements = [
		{
			header: 'title',
			cell: (issue: IssueGithub) => <a href={issue.html_url} >{ issue.title }</a>
		},
		{
			header: 'comments',
			filter: <Filters labelTooltip={'comments'} type={'comments'} onClick={updateFilter('comments')} filter={filter} />,
			cell: (issue: IssueGithub) => issue.comments
		},
		{
			header: 'created',
			accessor: 'created_at',
			filter: <Filters labelTooltip={'created'} type={'created_at'} onClick={updateFilter('created_at')} filter={filter}/>,
			cell: (issue: IssueGithub) => DateTime.fromISO(issue.created_at).toFormat('dd-MM-yyyy')
		},
		{
			header: 'updated',
			accessor: 'updated_at',
			filter: <Filters labelTooltip={'updated'} type={'updated_at'} onClick={updateFilter('updated_at')} filter={filter}/>,
			cell: (issue: IssueGithub) => DateTime.fromISO(issue.created_at).toFormat('dd-MM-yyyy')
		}
	]
	return <table className={styles.table}>
		<thead>
			<tr>
				{
					elements.map(({ header, filter }, index) => {
						return <th key={`th-${index}`}>
							{header}{filter}
						</th>
					})
				}
			</tr>
		</thead>
		<tbody>
		{ issues.map((issue: any) => {
			const id = nanoid()
			return <tr key={`issue-${id}`}>
				{
					elements.map(({ cell, filter }, index) => {
						return <td key={`td-${id}-${index}`}>
							{ cell(issue) }
						</td>
					})
				}
			</tr>
		})}
		</tbody>
	</table>
}

export default Table
