import * as React from 'react';
import Box from '@mui/material/Box';

const CorrIcon = () => {
  return (
    <React.Fragment>
      <Box
        component="img"
        sx={{
          height: 35,
          width: 35,
        }}
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAABG0lEQVR4nO3cQYoCQQwF0H8Y5/53UOZO2dXQwjQ4yGyTst+DgLiS+h2RSjABAAAAAAAAALiI7yRL5TiDRwYQRl7OoN3zg1StS1cEstpDEEj1H7xAqv+wBVL9B7x9IJ9ct9vXefDH67/vjQyk+wktHSKQmtwhKmMCOa4LBJLnGdy7wwAAAADgX9aAct7lWQPKvIvNdgZUNXAe0j2xKxNDgdTkiWH3E1o6RCC1U4f8rsvsvu4Ta0BryxrfIVerTAtEZUwg1oByhmENCAAAAGA2a0CxBrQG3y63Mw+pgfOQ7gFRGVAJpCZPDLuf0NIhAqldOuTdP+bsuBYUv7JW+1fPx2yddB9ICeQ1EJUxHWINKNaAAAAAAAAAAIBcyw/i6C6SOhh2egAAAABJRU5ErkJggg=="
      />
    </React.Fragment>
  );
};

export default CorrIcon;
