/* React imports */
import { useState, useEffect } from "react";

/* third-party component imports */
import Tooltip from "@mui/material/Tooltip";

export default function ManagedTooltip({
  disabled,
  children,
  ...tooltipProps
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (disabled) setOpen(false);
  }, [disabled]);

  return (
    <Tooltip
      {...tooltipProps}
      open={open}
      onOpen={() => !disabled && setOpen(true)}
      onClose={() => setOpen(false)}
    >
      {children}
    </Tooltip>
  );
}
