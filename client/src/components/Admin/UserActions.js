import axios from 'axios';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Box, IconButton, Tooltip } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';

const UserActions = ({ userId, onDelete }) => {
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const deleteUserHandler = async (deletedUserId) => {
    try {
      setIsLoading(true);
      const response = await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/admin/users/${deletedUserId}`
      );

      if (response.status === 200) {
        onDelete(deletedUserId);
        setIsLoading(false);
      }
    } catch (err) {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return;
  }

  return (
    <Box>
      <Tooltip title="تحديث بيانات">
        <IconButton onClick={() => navigate(`/users/${userId}`)}>
          <Edit />
        </IconButton>
      </Tooltip>

      <Tooltip title="الغاء الموظف">
        <IconButton onClick={() => deleteUserHandler(userId)}>
          <Delete />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default UserActions;
