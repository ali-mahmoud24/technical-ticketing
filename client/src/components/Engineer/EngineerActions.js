import axios from 'axios';

import { useEffect, useState } from 'react';

import { Box, CircularProgress, Fab } from '@mui/material';
import { Check, Save } from '@mui/icons-material';
import { green } from '@mui/material/colors';

const EngineerActions = ({ params, rowId, setRowId }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const changeTicketStatusHandler = async () => {
    const status = params.row.status;
    const ticketId = params.row.id;

    let closeTime;
    let updatedTicketData;
    if (status === 'Completed') {
      closeTime = new Date();
      updatedTicketData = { status, closeTime };
    } else {
      updatedTicketData = { status };
    }

    try {
      setIsLoading(true);

      const response = await axios.patch(
        `${process.env.REACT_APP_BACKEND_URL}/engineer/tickets/${ticketId}`,
        updatedTicketData
      );

      if (response.status === 200) {
        setSuccess(true);
        setRowId(null);
        setIsLoading(false);
        window.location.reload();
      }
    } catch (err) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (rowId === params.id && success) setSuccess(false);
  }, [rowId, params.id, success]);

  return (
    <Box
      sx={{
        m: 1,
        position: 'relative',
      }}
    >
      {success ? (
        <Fab
          color="primary"
          sx={{
            width: 40,
            height: 40,
            bgcolor: green[500],
            '&:hover': { bgcolor: green[700] },
          }}
        >
          <Check />
        </Fab>
      ) : (
        <Fab
          color="primary"
          sx={{
            width: 40,
            height: 40,
          }}
          disabled={params.id !== rowId || isLoading}
          onClick={changeTicketStatusHandler}
        >
          <Save />
        </Fab>
      )}
      {isLoading && (
        <CircularProgress
          size={52}
          sx={{
            color: green[500],
            position: 'absolute',
            top: -6,
            left: -6,
            zIndex: 1,
          }}
        />
      )}
    </Box>
  );
};

export default EngineerActions;
