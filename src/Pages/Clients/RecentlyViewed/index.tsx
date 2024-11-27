import React from 'react';
import {
    Container,
    Box,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Divider,
    IconButton,
    Tooltip,
    Chip,
} from '@mui/material';
import { History as HistoryIcon, ArrowUpward, ArrowDownward } from '@mui/icons-material';

const RecentlyViewed: React.FC = () => {
    const recentlyViewedClients = [
        { id: 1, name: 'Client A', lastViewed: '2023-10-01', email: 'clienta@example.com', status: 'Active' },
        { id: 2, name: 'Client B', lastViewed: '2023-10-02', email: 'clientb@example.com', status: 'Inactive' },
        { id: 3, name: 'Client C', lastViewed: '2023-10-03', email: 'clientc@example.com', status: 'Pending' },
    ];

    const [sortDirection, setSortDirection] = React.useState<'asc' | 'desc'>('asc');

    const handleSort = () => {
        setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    };

    return (
        <Container maxWidth="lg">
            {/* Header Section */}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 4 }}>
                <Typography variant="h5" sx={{ fontWeight: 600, color: '#333', fontSize: '1.5rem' }}>
                    Recently Viewed Clients
                </Typography>
                <Tooltip title="View history" arrow>
                    <IconButton
                        color="primary"
                        sx={{
                            backgroundColor: '#f0f4f8',
                            borderRadius: '12px',
                            padding: '10px',
                            '&:hover': { backgroundColor: '#e1e7f1' },
                        }}
                    >
                        <HistoryIcon sx={{ fontSize: '1.8rem', color: '#007bff' }} />
                    </IconButton>
                </Tooltip>
            </Box>

            {/* Divider */}
            <Divider sx={{ mb: 3 }} />

            {/* Table Section */}
            <TableContainer component={Paper} sx={{ boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)', borderRadius: '12px', overflow: 'hidden' }}>
                <Table sx={{ minWidth: 700 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell
                                onClick={handleSort}
                                sx={{
                                    fontWeight: 'bold',
                                    backgroundColor: '#f9f9f9',
                                    color: '#555',
                                    cursor: 'pointer',
                                    padding: '12px',
                                    fontSize: '0.9rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                            >
                                Client Name
                                {sortDirection === 'asc' ? (
                                    <ArrowUpward sx={{ fontSize: '1rem', ml: 1 }} />
                                ) : (
                                    <ArrowDownward sx={{ fontSize: '1rem', ml: 1 }} />
                                )}
                            </TableCell>
                            <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f9f9f9', color: '#555', padding: '12px', fontSize: '0.9rem' }}>
                                Last Viewed
                            </TableCell>
                            <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f9f9f9', color: '#555', padding: '12px', fontSize: '0.9rem' }}>
                                Email
                            </TableCell>
                            <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f9f9f9', color: '#555', padding: '12px', fontSize: '0.9rem' }}>
                                Status
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {recentlyViewedClients.map((client) => (
                            <TableRow key={client.id} sx={{ '&:hover': { backgroundColor: '#f4f4f4' }, cursor: 'pointer' }}>
                                <TableCell sx={{ padding: '10px', fontSize: '0.85rem', color: '#333' }}>{client.name}</TableCell>
                                <TableCell sx={{ padding: '10px', fontSize: '0.85rem', color: '#666' }}>{client.lastViewed}</TableCell>
                                <TableCell sx={{ padding: '10px', fontSize: '0.85rem', color: '#007bff' }}>{client.email}</TableCell>
                                <TableCell sx={{ padding: '10px', fontSize: '0.85rem' }}>
                                    <Chip
                                        label={client.status}
                                        color={
                                            client.status === 'Active'
                                                ? 'success'
                                                : client.status === 'Inactive'
                                                ? 'default'
                                                : 'warning'
                                        }
                                        size="small"
                                        sx={{ fontWeight: 500 }}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                        {recentlyViewedClients.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={4} align="center" sx={{ padding: '20px', color: '#999', fontSize: '0.9rem' }}>
                                    <Typography>No recently viewed clients</Typography>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Footer Section */}
            <Box sx={{ mt: 2, textAlign: 'right' }}>
                <Typography variant="caption" sx={{ color: '#999', fontSize: '0.75rem' }}>
                    Showing {recentlyViewedClients.length} recently viewed clients
                </Typography>
            </Box>
        </Container>
    );
};

export default RecentlyViewed;
