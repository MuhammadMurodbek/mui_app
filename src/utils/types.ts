export type TConfirmModal = {
	question: string
	isLoading?: boolean
	open: boolean
	setOpen: React.Dispatch<React.SetStateAction<boolean>>
	onConfirm: () => void
}

export type TAddModal = {
	modal: boolean
	setModal: React.Dispatch<React.SetStateAction<boolean>>
	refetch: () => void
}

export type TEditModal = {
	modal: {
		data: {
			book: any
			status: number
		}
		open: boolean
	}
	setModal: React.Dispatch<
		React.SetStateAction<{
			data: {
				book: any
				status: number
			}
			open: boolean
		}>
	>
	refetch: () => void
}
export type TCardComponent = {
	data: { book: any; status: number }
	refetch: () => void
}
export type IApiError = {
	message: string
	description: string
	statusCode: string | number
}
