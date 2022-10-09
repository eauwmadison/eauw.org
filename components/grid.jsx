/* third-party component imports */
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

export default function Grid({ children, ...gridProps }) {
  return (
    <Grid2
      container
      direction="row"
      alignItems="flex-start"
      spacing={3}
      {...gridProps}
    >
      {children}
    </Grid2>
  );
}

// number represents the number of columns the item should span
// across the 12-column grid at the specified breakpoint.
export const Item = ({ children, ...itemProps }) => {
  return (
    <Grid2 item xs={12} sm={6} md={4} lg={3} {...itemProps}>
      {children}
    </Grid2>
  );
};
