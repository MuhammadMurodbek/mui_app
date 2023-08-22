import * as React from 'react'
import Modal from '@mui/joy/Modal'
import ModalClose from '@mui/joy/ModalClose'
import Typography from '@mui/joy/Typography'
import {
	Button,
	FormControl,
	FormHelperText,
	Input,
	ModalDialog,
	Chip,
	Stack
} from '@mui/joy'
import { MenuItem, Select } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { InfoOutlined } from '@mui/icons-material'
import { useMutation } from 'react-query'
import { editBook } from '../../api/requests'
import { toast } from 'react-hot-toast'
import { TEditModal } from '../../utils/types'

export default function EditModalComponent({
	modal,
	setModal,
	refetch
}: TEditModal) {
	const { mutate, isLoading } = useMutation(editBook)
	const {
		handleSubmit,
		control,
		formState: { errors }
	} = useForm({
		defaultValues: { status: modal?.data?.status }
	})
	const onSubmit = (data: any) => {
		mutate(
			{ id: modal?.data?.book?.id, payload: data },
			{
				onSuccess: () => {
					refetch()
					setModal({ ...data, open: false })
					toast.success('Successfully updated')
				},
				onError: (error: any) => {
					toast.error(
						error?.response?.data || 'Something went wrong'
					)
				}
			}
		)
	}
	return (
		<React.Fragment>
			<Modal
				open={modal.open}
				onClose={() => setModal({ ...modal, open: false })}
			>
				<ModalDialog
					aria-labelledby="basic-modal-dialog-title"
					aria-describedby="basic-modal-dialog-description"
					sx={{ width: 450 }}
				>
					<ModalClose
						variant="outlined"
						sx={{
							top: 'calc(-1/4 * var(--IconButton-size))',
							right: 'calc(-1/4 * var(--IconButton-size))',
							boxShadow: '0 2px 12px 0 rgba(0 0 0 / 0.2)',
							borderRadius: '50%',
							bgcolor: 'background.surface'
						}}
					/>
					<Typography
						id="basic-modal-dialog-title"
						level="h2"
						mb={3}
						endDecorator={
							<Chip color="primary" variant="outlined">
								#{modal?.data?.book?.id}
							</Chip>
						}
					>
						Edit status &nbsp;
					</Typography>
					<form onSubmit={handleSubmit(onSubmit)}>
						<Stack spacing={2}>
							<Input
								value={modal?.data?.book?.author}
								disabled
							/>
							<Input
								value={modal?.data?.book?.title}
								disabled
							/>
							<FormControl error={!!errors.status}>
								<label>Status</label>
								<Controller
									name="status"
									control={control}
									render={({
										field: { value, onChange }
									}) => (
										<Select
											value={value}
											onChange={onChange}
											defaultValue={modal?.data?.status}
											size="small"
											variant="outlined"
										>
											<MenuItem value={0}>New</MenuItem>
											<MenuItem value={1}>Reading</MenuItem>
											<MenuItem value={2}>
												Finished
											</MenuItem>
										</Select>
									)}
								/>
								{errors.status && (
									<FormHelperText>
										<InfoOutlined />
										<span>This field is required</span>
									</FormHelperText>
								)}
							</FormControl>

							<Button type="submit" loading={isLoading}>
								Save
							</Button>
						</Stack>
					</form>
				</ModalDialog>
			</Modal>
		</React.Fragment>
	)
}
