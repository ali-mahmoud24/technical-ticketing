import { useRef } from 'react';

import { useLocation } from 'react-router-dom';

import {
  Button,
  CardActions,
  CardContent,
  Typography,
  Card,
  Box,
  useMediaQuery,
} from '@mui/material';
import PrintIcon from '@mui/icons-material/Print';

import { useReactToPrint } from 'react-to-print';

const TicketItem = () => {
  const isNonMobile = useMediaQuery('(min-width:992px)');

  const { state } = useLocation();
  const { engineerName, administration, sector, repairType, date, time } =
    state;

  const pageStyle = `
  @media print {
    html, body {
      height: 100vh; /* Use 100% here to support printing more than a single page*/
      margin: 0 !important;
      padding: 0 !important;
      overflow: hidden;
      color: black;
      direction: rtl;

      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
  }
`;
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'طلب تصليح',
    // onAfterPrint: () => alert('تمت الطباعة بنجاح'),
  });

  return (
    <>
      <Card
        ref={componentRef}
        variant="filled"
        sx={{
          width: isNonMobile ? '60vw' : '70vw',
          margin: '0 auto',
          borderRadius: '20px',
          border: '2px solid black',
          backgroundColor: '#fff',
          color: '#000',
        }}
      >
        <style>{pageStyle}</style>
        <CardContent>
          <Typography variant="h3" margin={'20px 0'}>
            المهندس : {engineerName}
          </Typography>

          <article>
            <Typography variant="h3">نوع العطل:</Typography>

            <Typography margin={'20px 0'} variant="h5">
              {repairType}
            </Typography>
          </article>

          <Box
            component={'article'}
            sx={{
              width: '80%',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <article>
              <Typography variant="h3" marginBottom={'20px'}>
              الإدارة:
              </Typography>
              <Typography variant="h5">{administration}</Typography>
            </article>

            <article>
              <Typography variant="h3" marginBottom={'20px'}>
                القطاع:
              </Typography>
              <Typography variant="h5">{sector}</Typography>
            </article>
          </Box>

          <Box
            component={'article'}
            sx={{
              width: '80%',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Box component={'article'}>
              <Typography variant="h3" margin={'20px 0'}>
                التاريخ:
              </Typography>
              <Typography variant="h5">{date}</Typography>
            </Box>
            <Box component={'article'}>
              <Typography variant="h3" margin={'20px 0'}>
                الوقت:
              </Typography>
              <Typography variant="h5">{time}</Typography>
            </Box>
          </Box>
        </CardContent>
        <CardActions
          sx={{
            displayPrint: 'none',
          }}
        >
          <Button
            sx={{
              width: '100%',
              fontSize: '1rem',
              color: '#fff',
              backgroundColor: 'rgb(47, 88, 205)',
              borderRadius: '10px',
              '&:hover': {
                color: '#000',
                backgroundColor: 'rgba(47, 88, 205, 0.95)',
              },
            }}
            startIcon={<PrintIcon />}
            onClick={handlePrint}
          >
            اطبع التذكرة
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

export default TicketItem;
