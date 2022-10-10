import * as React from "react";
import Box from "@mui/material/Box";

import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: 10,
};

export default function CardModal(props) {
  const { title, date, creator, status, importance, description } = props;
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <button type="button" onClick={handleOpen} className="more">
        ver mas
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="card modal">
            <h3>{title}</h3>
            <h6>{date}</h6>
            <h5>{creator}</h5>
            <button type="button" className={status.toLowerCase()}>
              {status}
            </button>
            <button type="button" className={importance.toLowerCase()}>
              {importance}
            </button>
            <p>{description}</p>
          </div>
        </Box>
      </Modal>
    </>
  );
}
