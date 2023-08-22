import PropTypes from 'prop-types'
import {
	Avatar,
	Badge,
	Box,
	IconButton,
	Stack,
	SvgIcon,
	Tooltip
} from '@mui/material'
import {
	BlenderOutlined,
	LogoutOutlined,
	Man2
} from '@mui/icons-material'
import { useQuery } from 'react-query'
import { variations } from '../api/requests'
import { Button, Typography } from '@mui/joy'
import ConfirmModal from '../component/confirm.modal'
import { useState } from 'react'

const SIDE_NAV_WIDTH = 280
const TOP_NAV_HEIGHT = 64

const TopNav = () => {
	const [open, setOpen] = useState<boolean>(false)
	const { data: user } = useQuery('myself', variations, {
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		select: (res) => res?.data?.data
	})
	const handleLogOut = () => {
		localStorage.clear()
		window.location.replace('/sign-in')
	}

	return (
		<>
			<ConfirmModal
				question="Are you sure you want to log out?"
				onConfirm={handleLogOut}
				open={open}
				setOpen={setOpen}
			/>
			<Box
				component="header"
				sx={{
					backdropFilter: 'blur(6px)',
					backgroundColor: 'white',
					position: 'sticky',
					left: {
						lg: `${SIDE_NAV_WIDTH}px`
					},
					top: 0,
					boxShadow: '0 0 10px -6px',
					width: '100%',
					zIndex: (theme) => theme.zIndex.appBar
				}}
			>
				<Stack
					alignItems="center"
					direction="row"
					justifyContent="space-between"
					spacing={2}
					sx={{
						minHeight: TOP_NAV_HEIGHT,
						px: 2
					}}
				>
					<Stack
						alignItems="center"
						direction="row"
						spacing={2}
					>
						<Avatar
							sx={{
								cursor: 'pointer',
								height: 40,
								width: 40
							}}
							src="/assets/avatars/avatar-anika-visser.png"
						/>
						<Typography>{user?.name}</Typography>
					</Stack>
					<Stack
						alignItems="center"
						direction="row"
						spacing={2}
					>
						<Tooltip title="Contacts">
							<IconButton>
								<SvgIcon fontSize="small">
									<Man2 />
								</SvgIcon>
							</IconButton>
						</Tooltip>
						<Tooltip title="Notifications">
							<IconButton>
								<Badge
									badgeContent={4}
									color="success"
									variant="dot"
								>
									<SvgIcon fontSize="small">
										<BlenderOutlined />
									</SvgIcon>
								</Badge>
							</IconButton>
						</Tooltip>
						<Tooltip title="Log out">
							<Button
								startDecorator={<LogoutOutlined />}
								variant="outlined"
								color="danger"
								onClick={() => setOpen(true)}
							>
								Log out
							</Button>
						</Tooltip>
					</Stack>
				</Stack>
			</Box>
		</>
	)
}
export default TopNav
TopNav.propTypes = {
	onNavOpen: PropTypes.func
}
