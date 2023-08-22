import {
	Navigate,
	RouterProvider,
	createBrowserRouter
} from 'react-router-dom'
import Login from './pages/auth/login'
import Root, { loader } from './pages/root'
import BooksList from './pages/books/list'
import BookInfo from './pages/books/book.info'
import ErrorPage from './pages/errors/error-page'
const router = createBrowserRouter([
	{
		path: '/sign-in',
		element: <Login />
	},
	{
		path: '/',
		loader: loader,
		element: <Root />,
		errorElement: <ErrorPage />,
		children: [
			{
				index: true,
				element: <Navigate to={'/books'} replace />
			},
			{
				path: '/books',
				element: <BooksList />
			},
			{
				path: '/books/:id',
				element: <BookInfo />
			}
		]
	}
])
function App() {
	return (
		<>
			<RouterProvider router={router} />
		</>
	)
}
export default App
