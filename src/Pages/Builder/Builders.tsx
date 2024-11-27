import React, { useState } from 'react';
import { Box, TextField, InputAdornment, Grid, Button, Card, CardContent, CardMedia, Typography, Divider } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddBuilders from './AddBuilders';
import  {Add as Plus } from '@mui/icons-material';
import { More } from '../../assets';

interface Builder {
  builderId: number;
  builderName: string;
  builderImage: string;
  builderOccupation: string;
  builderDescription: string;
  builderProjects: string[];
}

interface BuildersProps {
  buildersData: Builder[];
}

const Builders: React.FC<BuildersProps> = ({ buildersData }) => {
  const [isAddBuilderOpen, setIsAddBuilderOpen] = useState(false);
  const [searchText, setSearchText] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleAddBuilderOpen = () => {
    setIsAddBuilderOpen(true);
    
  };

  const handleAddBuilderClose = () => {
    setIsAddBuilderOpen(false);
  };

  const filteredBuilders = buildersData.filter((builder) =>
    builder.builderName.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <>
      {/* Search Bar and Button */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <TextField
          placeholder="Search for builders..."
          variant="outlined"
          size="small"
          onChange={handleSearch}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
            sx: {
              width: { xs: '100%', sm: '350px' },
              height: '40px',
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
              borderRadius: '8px',
            },
          }}
        />
        <Button
          variant="contained"
          color="primary"
          startIcon={<img src={More} alt="Add Builderss" style={{ width: '20px', filter: 'invert(100%)' }} />}
          sx={{ ml: 2, textTransform: 'none', fontWeight: 'bold' }}
          onClick={handleAddBuilderOpen}
        >

          Add New Builder
        </Button>
      </Box>

      {/* Builders Grid */}
      <Grid container spacing={3}>
        {filteredBuilders.map((builder) => (
          <Grid item key={builder.builderId} xs={12} sm={6} md={4} lg={3}>
            <Card
              sx={{
                boxShadow: '0px 10px 25px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.3s ease',
                borderRadius: '15px',
                '&:hover': { transform: 'translateY(-10px)' },
                overflow: 'hidden',
                position: 'relative',
              }}
            >
              {/* Builder Image */}
              <CardMedia
                component="img"
                height="200"
                image={`http://dprstorage.b-cdn.net${builder.builderImage}`}
                alt={builder.builderName}
                draggable={false}
                sx={{
                  borderRadius: '15px 15px 0 0',
                  objectFit: 'cover',
                }}
              />

              {/* Card Content */}
              <CardContent sx={{ padding: '16px 20px' }}>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 600,
                    fontSize: '18px',
                    color: '#333',
                    mb: 0.5,
                    textTransform: 'capitalize',
                    textAlign: 'left',
                  }}
                >
                  {builder.builderName}
                </Typography>

                <Typography
                  variant="caption"
                  sx={{
                    fontSize: '14px',
                    fontStyle: 'italic',
                    color: '#888',
                    mb: 1,
                  }}
                >
                  {builder.builderOccupation}
                </Typography>

                {/* Builder Description */}
                <Typography
                  variant="body2"
                  sx={{
                    color: '#555',
                    fontSize: '14px',
                    lineHeight: '1.6',
                    mb: 2,
                    height: '48px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    textAlign: 'left',
                  }}
                >
                  {builder.builderDescription.slice(0, 20)+`...`}
                </Typography>

                <Divider sx={{ my: 2 }} />

                {/* Projects */}
                <Typography
                  variant="subtitle2"
                  sx={{ fontWeight: 'bold', fontSize: '14px', mb: 1, textAlign: 'left' }}
                >
                  Projects:
                </Typography>
                {builder.builderProjects.slice(0, 2).map((project, index) => (
                  <Typography
                    key={index}
                    variant="body2"
                    sx={{
                      fontSize: '13px',
                      color: '#444',
                      ml: 1,
                      mb: 0.5,
                      textAlign: 'left',
                    }}
                  >
                    • {project}
                  </Typography>
                ))}

                {builder.builderProjects.length > 2 && (
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: '13px',
                      color: '#007BFF',
                      cursor: 'pointer',
                      mt: 1,
                      ml: 1,
                      '&:hover': { textDecoration: 'underline' },
                    }}
                  >
                    + {builder.builderProjects.length - 2} more projects
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Add Builder Modal */}
      <AddBuilders open={isAddBuilderOpen} onClose={handleAddBuilderClose} />
    </>
  );
};

export default Builders;
