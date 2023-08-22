import { urls } from './endpoints'
import { request } from './instance'

export const login = (payload: any) =>
	request.post(urls.signup, payload)
export const variations = () => request.get(urls.variations)
export const books = () => request.get(urls.books)

export const addBook = (payload: any) =>
	request.post(urls.books, payload)
export const editBook = ({
	id,
	payload
}: {
	id: number
	payload: any
}) => request.patch(urls.books + `/${id}`, payload)
export const deleteBook = ({ id }: { id: number }) =>
	request.delete(urls.books + `/${id}`)
