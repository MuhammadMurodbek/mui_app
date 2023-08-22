import { Outlet, useLoaderData } from 'react-router-dom'
import Appbar from '../layout/main.layout'

export function loader() {
	const key = localStorage.getItem('key')
	return { key }
}

const Root = () => {
	const { key }: any = useLoaderData()
	if (!key) {
		window.location.replace('/sign-in')
		localStorage.clear()
	}
	return (
		<div id="detail">
			<Appbar />
			<Outlet />
		</div>
	)
}
export default Root
