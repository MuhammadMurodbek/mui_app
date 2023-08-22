import AspectRatio from "@mui/joy/AspectRatio";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Chip from "@mui/joy/Chip";
import Link from "@mui/joy/Link";
import Typography from "@mui/joy/Typography";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import { status } from "../../helpers/status.check";
import { EditNoteOutlined, RemoveCircle } from "@mui/icons-material";
import { ButtonGroup, CardActions } from "@mui/joy";
import EditModalComponent from "../../component/edit.modal";
import { useState } from "react";
import { useMutation } from "react-query";
import { deleteBook } from "../../api/requests";
import ConfirmModal from "../../component/confirm.modal";
import { toast } from "react-hot-toast";
import { TCardComponent } from "../../utils/types";

export default function ProductCard({ data, refetch }: TCardComponent) {
  const { mutate, isLoading } = useMutation(deleteBook);
  const [modal, setModal] = useState({ data: data, open: false });
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  return (
    <>
      <Card sx={{ width: 290, maxWidth: "100%", boxShadow: "lg" }}>
        <CardOverflow>
          <AspectRatio sx={{ minWidth: 200 }}>
            <img
              src={data?.book?.cover}
              srcSet={data?.book?.cover}
              loading="lazy"
              alt=""
            />
          </AspectRatio>
        </CardOverflow>
        <CardContent>
          <Typography level="body-xs">Author: {data?.book?.author}</Typography>
          <Link
            href="#product-card"
            fontWeight="md"
            color="neutral"
            textColor="text.primary"
            overlay
            endDecorator={<ArrowOutwardIcon />}
          >
            Title: {data?.book?.title}
          </Link>

          <Typography
            level="title-lg"
            sx={{ mt: 1, fontWeight: "md" }}
            endDecorator={
              <Chip component="span" size="sm" variant="soft" color="neutral">
                pages: {data?.book?.pages}
              </Chip>
            }
          >
            Published: {data?.book?.published}
          </Typography>
          <Typography
            level="title-lg"
            sx={{ mt: 1, fontWeight: "md" }}
            endDecorator={
              <Chip
                component="span"
                size="sm"
                variant="soft"
                color={status[data?.status]?.type || "danger"}
              >
                {status[data?.status]?.name}
              </Chip>
            }
          >
            Status:
          </Typography>
        </CardContent>
        <CardOverflow sx={{ bgcolor: "background.level2" }}>
          <CardActions buttonFlex="1">
            <ButtonGroup
              variant="outlined"
              sx={{ bgcolor: "background.surface" }}
            >
              <Button
                size="sm"
                startDecorator={
                  <EditNoteOutlined sx={{ fontSize: 15 }} color="info" />
                }
                onClick={() => setModal({ ...modal, open: true })}
              >
                Edit
              </Button>
              <Button
                size="sm"
                startDecorator={
                  <RemoveCircle sx={{ fontSize: 15 }} color="warning" />
                }
                onClick={() => setDeleteModal(true)}
              >
                Delete
              </Button>
            </ButtonGroup>
          </CardActions>
        </CardOverflow>
      </Card>
      <ConfirmModal
        question="Are you sure you want to delete this book?"
        onConfirm={() =>
          mutate(
            { id: data?.book?.id },
            {
              onSuccess: () => {
                toast.success("Successfully deleted.");
                setDeleteModal(false);
                refetch();
              },
              onError: (err: any) => {
                toast.error(err.message);
              },
            }
          )
        }
        isLoading={isLoading}
        open={deleteModal}
        setOpen={setDeleteModal}
      />
      <EditModalComponent modal={modal} setModal={setModal} refetch={refetch} />
    </>
  );
}
