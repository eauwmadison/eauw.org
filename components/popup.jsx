/* adapted from https://mui.com/material-ui/react-modal/#unstyled */

import { forwardRef, useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { Box, styled } from "@mui/system";
import ModalUnstyled from "@mui/base/ModalUnstyled";
import Fade from "@mui/material/Fade";

const BackdropUnstyled = forwardRef((props, ref) => {
  const { open, className, ...other } = props;
  return (
    <div
      className={clsx({ "MuiBackdrop-open": open }, className)}
      ref={ref}
      {...other}
    />
  );
});

BackdropUnstyled.displayName = "BackdropUnstyled";
BackdropUnstyled.propTypes = {
  className: PropTypes.string.isRequired,
  open: PropTypes.bool
};

const Modal = styled(ModalUnstyled)`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Backdrop = styled(BackdropUnstyled)`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const style = (theme) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  backgroundColor: theme.palette.mode === "dark" ? "#0A1929" : "white",
  boxShadow: 24,
  padding: "16px 32px 24px 32px"
});

export default function Popup({ popup }) {
  const [open, setOpen] = useState(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        components={{ Backdrop }}
      >
        <Fade in={open} timeout={300}>
          <Box sx={style}>
            <h2 id="transition-modal-title">{popup.title}</h2>
            <span
              id="transition-modal-description"
              style={{ marginTop: "16px" }}
            ></span>
            <div dangerouslySetInnerHTML={{__html: popup.contentHTML}} />
            {/* {popup.contentHTML} */}
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
