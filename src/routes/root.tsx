import {
	useLoaderData,
	useNavigate
} from 'react-router-dom'

export function loader() {
	const key = localStorage.getItem('key')
	return { key }
}

export default function Root() {
	const navigate = useNavigate()
	const { key }: any = useLoaderData()
	if (!key) {
		window.location.replace('/sign-in')
		localStorage.clear()
	}
	return navigate('/')
}
