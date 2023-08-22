import * as React from "react";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Typography from "@mui/joy/Typography";
import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  ModalDialog,
  Stack,
} from "@mui/joy";
import { useForm } from "react-hook-form";
import { InfoOutlined } from "@mui/icons-material";
import { useMutation } from "react-query";
import { addBook } from "../../api/requests";
import { toast } from "react-hot-toast";
import { TAddModal } from "../../utils/types";

export default function ModalComponent({
  modal,
  setModal,
  refetch,
}: TAddModal) {
  const { mutate, isLoading } = useMutation(addBook);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: any) => {
    mutate(data, {
      onSuccess: () => {
        refetch();
        setModal(false);
        toast.success("Successfully created.");
      },
      onError: (error: any) => {
        toast.error(error?.response?.data?.message || "Something went wrong");
      },
    });
  };
  return (
    <React.Fragment>
      <Modal open={modal} onClose={() => setModal(false)}>
        <ModalDialog
          aria-labelledby="basic-modal-dialog-title"
          aria-describedby="basic-modal-dialog-description"
          sx={{ width: 450 }}
        >
          <ModalClose
            variant="outlined"
            sx={{
              top: "calc(-1/4 * var(--IconButton-size))",
              right: "calc(-1/4 * var(--IconButton-size))",
              boxShadow: "0 2px 12px 0 rgba(0 0 0 / 0.2)",
              borderRadius: "50%",
              bgcolor: "background.surface",
            }}
          />
          <Typography id="basic-modal-dialog-title" level="h2" mb={3}>
            Add new book
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2}>
              <FormControl error={!!errors.isbn}>
                <FormLabel>ISBN</FormLabel>
                <Input
                  autoFocus
                  required
                  placeholder="Book number..."
                  type="number"
                  error={!!errors.isbn}
                  {...register("isbn", { required: true })}
                />
                {errors.isbn && (
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
  );
}
