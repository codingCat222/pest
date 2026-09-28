export interface PaginationDto {
  page?: number;
  pageSize?: number;
}

export interface PaginatedResult<T> {
  entries: T[];
  total: number;
  page: number;
  pageSize: number;
}

export function parsePagination(query: Record<string, any>): { skip: number; take: number; page: number; pageSize: number } {
  const page = query.page ? Math.max(1, parseInt(query.page, 10)) : 1;
  const pageSize = query.pageSize ? Math.max(1, parseInt(query.pageSize, 10)) : 25;
  return { skip: (page - 1) * pageSize, take: pageSize, page, pageSize };
}
