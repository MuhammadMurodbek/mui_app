import { Box, Card, Typography } from '@mui/joy'

export default function BooksList() {
	return (
		<Card
			sx={{ width: '80%', marginTop: 2, marginX: 'auto' }}
		>
			<Box sx={{ marginY: 1 }}>
				<Typography fontWeight="bold">BOOKS</Typography>
			</Box>
			<Box>
				Lorem ipsum dolor sit amet, consectetur adipisicing
				elit. Sequi, sunt quod. Doloremque maiores cum
				libero officia. Inventore ipsa corporis eligendi
				cupiditate doloribus? Ratione facilis repudiandae
				similique, magnam vitae tempora accusamus.
			</Box>
		</Card>
	)
}
