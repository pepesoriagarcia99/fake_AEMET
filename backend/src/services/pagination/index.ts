import { IncomingHttpHeaders } from 'http';

export default (headers: IncomingHttpHeaders, list: Array<any>) => {
    const page: number = headers.page ? JSON.parse(headers.page as string) : 1;
    const pageSize: number = headers.pagesize ? JSON.parse(headers.pagesize as string) : 100;

    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    const pageItems = list.slice(startIndex, endIndex);

    return pageItems;
};
