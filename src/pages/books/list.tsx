import { Box, Card, Grid, IconButton, Stack, Typography } from "@mui/joy";
import ProductCard from "./card";
import { Add } from "@mui/icons-material";
import { Divider } from "@mui/material";
import { useQuery } from "react-query";
import { books as getAllBooks } from "../../api/requests";
import ModalComponent from "../../component/add.modal";
import { useState } from "react";

export default function BooksList() {
  const {
    data: books,
    refetch,
    isLoading,
  } = useQuery("books", getAllBooks, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    select: (res) => res?.data,
  });
  const [modal, setModal] = useState<boolean>(false);
  return (
    <>
      <Card sx={{ width: "80%", marginTop: 2, marginX: "auto" }}>
        <Grid
          container
          justifyContent="space-between"
          alignItems={"center"}
          sx={{ marginY: 1, marginX: 2 }}
        >
          <Typography fontWeight={"bold"}>Books</Typography>
          <Stack direction="row" spacing={2}>
            <IconButton
              size="sm"
              variant="soft"
              color="primary"
              onClick={() => setModal(!modal)}
            >
              <Add />
              <Typography paddingX={1}>Add book</Typography>
            </IconButton>
          </Stack>
        </Grid>

        <Divider />
        {isLoading && (
          <Stack width="100%" justifyContent="center" textAlign="center">
            <Box>
              <Typography>Loading...</Typography>
            </Box>
          </Stack>
        )}
        <Grid container spacing={3} gap={2} sx={{ margin: 2 }}>
          {books?.data?.length > 0 && !isLoading ? (
            books?.data?.map((item: any, index: number) => (
              <ProductCard data={item} key={index} refetch={refetch} />
            ))
          ) : (
            <Stack width="100%" justifyContent="center" textAlign="center">
              <Box>
                <Typography>No available data...</Typography>
              </Box>
            </Stack>
          )}
        </Grid>
      </Card>
      <ModalComponent modal={modal} setModal={setModal} refetch={refetch} />
    </>
  );
}
