/* adapted from https://mui.com/material-ui/react-modal/#unstyled */

/* React imports */
import { forwardRef, useState } from "react";

/* third-party component imports */
import ModalUnstyled from "@mui/base/ModalUnstyled";
import Fade from "@mui/material/Fade";
import styled from "@mui/system/styled";

/* misc. library imports */
import clsx from "clsx";

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

export default function Popup({ popup }) {
  const [open, setOpen] = useState(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <ModalUnstyled
        className="modal-container"
        aria-labelledby="transition-modal-title"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        components={{ Backdrop }}
      >
        <Fade in={open} timeout={300}>
          <div className="modal">
            <h2 id="transition-modal-title">{popup.title}</h2>
            <div dangerouslySetInnerHTML={{ __html: popup.contentHTML }} />

            <div className="buttons">
              <button className="btn btn-light" onClick={handleClose}>
                Close
              </button>
              <a className="btn" href={popup.link}>
                {popup.buttonText}
              </a>
            </div>
          </div>
        </Fade>
      </ModalUnstyled>
    </div>
  );
}
