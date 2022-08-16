
export type SortType = 'comments' | 'created_at' | 'updated_at';
export type DirectionType = 'asc' | 'desc';

export interface Filter {
	sort: SortType,
	direction: DirectionType
}
