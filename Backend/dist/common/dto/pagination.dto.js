"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parsePagination = parsePagination;
function parsePagination(query) {
    const page = query.page ? Math.max(1, parseInt(query.page, 10)) : 1;
    const pageSize = query.pageSize ? Math.max(1, parseInt(query.pageSize, 10)) : 25;
    return { skip: (page - 1) * pageSize, take: pageSize, page, pageSize };
}
