import React, { useState } from 'react';
import { Box, Typography, Button, styled } from '@mui/material';
import { FeedImages, More, UploadIcon } from '../../assets';
import AddBuilderss from './AddBuilders';

const CenteredBox = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '80vh',
});

const NoBuilderss: React.FC = () => {
    const [isAddBuildersOpen, setIsAddBuildersOpen] = useState(false);

    const handleAddBuildersOpen = () => {
        setIsAddBuildersOpen(true);
    };

    const handleAddBuildersClose = () => {
        setIsAddBuildersOpen(false);
    };

    return (
        <>
            <CenteredBox>
                <Box sx={{ textAlign: 'center' }}>
                    {/* <img src={FeedImages.nodata} alt="No Builderss" style={{ height: '100px' }} /> */}
                    <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
                        There are no Builderss
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<img src={More} alt="Add Builderss" style={{ width: '20px', filter: 'invert(100%)' }} />}
                        sx={{ mt: 1 }}
                        onClick={handleAddBuildersOpen}
                    >
                        Add New Builderss
                    </Button>
                </Box>
            </CenteredBox>

            <AddBuilderss open={isAddBuildersOpen} onClose={handleAddBuildersClose} />
        </>
    );
};

export default NoBuilderss;
