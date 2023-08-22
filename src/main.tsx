import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {
	QueryClient,
	QueryClientProvider
} from 'react-query'
import Toast from './component/toaster/index.tsx'

ReactDOM.createRoot(
	document.getElementById('root')!
).render(
	<React.StrictMode>
		<QueryClientProvider client={new QueryClient()}>
			<Toast />
			<App />
		</QueryClientProvider>
	</React.StrictMode>
)
