export default class PaginationHelper {
    static metadata(limit: number, offset: number, totalRecord: number) {
        return {
            limit: limit,
            offset: offset,
            total: totalRecord,
            totalPages: Math.ceil(totalRecord / limit),
        }
    }
}
