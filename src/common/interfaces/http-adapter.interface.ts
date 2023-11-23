//esto es puero ts
export interface HttpAdapter {
    get<T>(url: string): Promise<T>
}