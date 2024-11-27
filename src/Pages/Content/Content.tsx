import React, { useState, useEffect } from 'react';
import {
  Container,
  Tabs,
  Tab,
  Box,
  useTheme,
  IconButton,
  Typography,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import AddMessageModal from './AddMessageModal';
import Messages from './Messages';
import Files from './Files';
import Pages from './Pages';


const Content = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { type } = useParams<{ type: string }>();

  const [activeTab, setActiveTab] = useState<string>('Messages');
  const [isAddMessageModalOpen, setAddMessageModalOpen] = useState(false);

  const openAddMessageModal = () => setAddMessageModalOpen(true);
  const closeAddMessageModal = () => setAddMessageModalOpen(false);

  useEffect(() => {
    // Sync tab state with URL on initial load or route change
    switch (type) {
      case '':
        setActiveTab('Messages');
        break;
      case 'files':
        setActiveTab('Files');
        break;
      case 'pages':
        setActiveTab('Pages');
        break;
      default:
        setActiveTab('Messages');
        navigate('/content');
    }
  }, [type, navigate]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setActiveTab(newValue);
    const route = newValue.toLowerCase().replace(/\s/g, '-');
    navigate(`/content/${route}`);
  };

  return (
    <Box sx={{ px: { xs: 2, sm: 4, md: 6, lg: 8 }, py: 1 }}>
      <Container maxWidth="md" sx={{ px: 4 }}>
        <Typography
          variant="h3"
          color="textPrimary"
          sx={{ mb: 2, fontWeight: 800, textAlign: 'left' }}
        >
          Content
        </Typography>
      </Container>

      <Container maxWidth="md" sx={{ px: 4 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              variant="scrollable"
              scrollButtons="auto"
              aria-label="Content Tabs"
              sx={{
                backgroundColor: '#ffffff',
                padding: '10px 15px',
                '& .MuiTabs-flexContainer': {
                  justifyContent: { xs: 'center', sm: 'flex-start' },
                },
                '& .MuiTabs-indicator': {
                  backgroundColor: theme.palette.primary.main,
                  marginBottom: '7px',
                },
                '& .MuiTab-root': {
                  color: '#000000',
                  textTransform: 'none',
                  minWidth: 'auto',
                  fontSize: '12px',
                  fontWeight: 600,
                  marginRight: '15px',
                  '&:hover': {
                    color: '#00000097',
                    transition: 'all 0.3s ease',
                  },
                },
                '& .Mui-selected': {
                  color: theme.palette.primary.main,
                },
              }}
            >
              <Tab key={'Messages'} label={'Messages'} value={'Messages'} onClick={() => navigate('/content')} />
              <Tab key={'Files'} label={'Files'} value={'Files'} onClick={() => navigate('/content/files')} />
              <Tab key={'Pages'} label={'Pages'} value={'Pages'} onClick={() => navigate('/content/pages')} />
            </Tabs>
          </Box>

          {/* Add New Message Button */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: 'primary.main',
              borderRadius: '5px',
              padding: '2px 14px',
              cursor: 'pointer',
            }}
            onClick={openAddMessageModal}
          >
            <IconButton>
              <AddIcon sx={{ color: 'white', fontSize: 20, fontWeight: 600 }} />
            </IconButton>
            <Typography
              variant="caption"
              color="white"
              sx={{ fontSize: '12px', fontWeight: 600 }}
            >
              Add New Message
            </Typography>
          </Box>
        </Box>

        {/* Tab Content */}
        <Box sx={{ backgroundColor: '#ffffff', px: 1, py: 4 }}>
          {activeTab === 'Messages' && <Messages />}
          {activeTab === 'Files' && <Files />}
          {activeTab === 'Pages' && <Pages />}
        </Box>

        <AddMessageModal open={isAddMessageModalOpen} onClose={closeAddMessageModal} />
      </Container>
    </Box>
  );
};

export default Content;
