import * as React from "react";
import Button from "@mui/joy/Button";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import { Stack } from "@mui/material";
import { TConfirmModal } from "../../utils/types";

export default function ConfirmModal({
  question,
  onConfirm,
  isLoading,
  open,
  setOpen,
}: TConfirmModal) {
  return (
    <React.Fragment>
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={open}
        onClose={() => setOpen(false)}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Sheet
          variant="outlined"
          sx={{
            maxWidth: 500,
            borderRadius: "md",
            p: 3,
            boxShadow: "lg",
          }}
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
          <Typography
            component="h4"
            id="modal-title"
            level="h4"
            textColor="inherit"
            fontWeight="lg"
            mb={4}
            mt={1}
          >
            {question}
          </Typography>
          <Stack direction="row" justifyContent="space-between">
            <Button
              loading={isLoading}
              variant="soft"
              onClick={onConfirm}
              size="sm"
            >
              Confirm
            </Button>
            <Button onClick={() => setOpen(false)} variant="outlined" size="sm">
              Cancel
            </Button>
          </Stack>
        </Sheet>
      </Modal>
    </React.Fragment>
  );
}
