import React from 'react';
import { Box, Typography, Button, styled } from '@mui/material';
import { More, TabsIcons } from '../../assets';

import AddIcon from '@mui/icons-material/Add';


const CenteredBox = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '80vh',
});

const NoUsers: React.FC = () => {
    const [isAddUsersOpen, setIsAddUsersOpen] = React.useState(false);

    const handleAddUsersOpen = () => {
        setIsAddUsersOpen(true);
    };

    const handleAddUsersClose = () => {
        setIsAddUsersOpen(false);
    };

    return (
        <>
        <CenteredBox>
            <Box sx={{ textAlign: 'center' }}>
                <img src={TabsIcons.UsersIcon} alt="No Users" style={{height : '65px'}} />
                <Typography variant="h5" gutterBottom sx={{fontWeight: 'bold'}}>
                    There are no channel partners
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<img src={More} alt="Add Builderss" style={{ width: '20px', filter: 'invert(100%)' }} />}
                    sx={{ mt: 1 }}
                    onClick={handleAddUsersOpen}  
                >
                    Add New Channel Partner
                </Button>
            </Box>
        </CenteredBox>
        </>
    );
};

export default NoUsers;
