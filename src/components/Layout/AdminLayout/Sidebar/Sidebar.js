import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import PeopleIcon from '@mui/icons-material/People';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import CategoryIcon from '@mui/icons-material/Category';
import ReceiptIcon from '@mui/icons-material/Receipt';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AuthService from '../../../../services/AuthService';

const StyledListItemIcon = styled(ListItemIcon)({
    minWidth: '40px',
});
function Sidebar() {
    const [selectedIndex, setSelectedIndex] = React.useState(0);

    const handleListItemClick = (index) => {
        setSelectedIndex(index);
    };
    const navigate = useNavigate();
    const drawer = (
        <Box height="100%" sx={{ backgroundColor: 'rgb(28,37,54)' }}>
            <CssBaseline />
            <Toolbar>
                <Typography
                    variant="h6"
                    noWrap
                    component="a"
                    href="/dashboard"
                    sx={{
                        mr: 2,
                        display: { xs: 'none', md: 'flex' },
                        fontSize: '18px',
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.3rem',
                        color: '#fff',
                        textDecoration: 'none',
                    }}
                >
                    MANAGEMENT
                </Typography>
            </Toolbar>
            <Box sx={{ overflow: 'auto' }}>
                <List sx={{ ml: '8px' }}>
                    <Link to={'/dashboard'}>
                        <ListItem disablePadding>
                            <ListItemButton selected={selectedIndex === 0} onClick={() => handleListItemClick(0)}>
                                <StyledListItemIcon sx={{ minWidth: '40px' }}>
                                    <EqualizerIcon fontSize="medium" sx={{ color: '#fff' }} />
                                </StyledListItemIcon>
                                <ListItemText
                                    primary="Dashboard"
                                    primaryTypographyProps={{ fontSize: '16px', color: '#fff' }}
                                />
                            </ListItemButton>
                        </ListItem>
                    </Link>
                    <Link to={'/admin/users'}>
                        <ListItem disablePadding>
                            <ListItemButton selected={selectedIndex === 1} onClick={() => handleListItemClick(1)}>
                                <StyledListItemIcon>
                                    <PeopleIcon fontSize="medium" sx={{ color: '#fff' }} />
                                </StyledListItemIcon>
                                <ListItemText
                                    primary="Users"
                                    primaryTypographyProps={{ fontSize: '16px', color: '#fff' }}
                                />
                            </ListItemButton>
                        </ListItem>
                    </Link>
                    <Link to={'/admin/products'}>
                        <ListItem disablePadding>
                            <ListItemButton selected={selectedIndex === 2} onClick={() => handleListItemClick(2)}>
                                <StyledListItemIcon>
                                    <PeopleIcon fontSize="medium" sx={{ color: '#fff' }} />
                                </StyledListItemIcon>
                                <ListItemText
                                    primary="Products"
                                    primaryTypographyProps={{ fontSize: '16px', color: '#fff' }}
                                />
                            </ListItemButton>
                        </ListItem>
                    </Link>
                    <Link to={'/admin/orders'}>
                        <ListItem disablePadding>
                            <ListItemButton selected={selectedIndex === 3} onClick={() => handleListItemClick(3)}>
                                <StyledListItemIcon>
                                    <ReceiptIcon fontSize="medium" sx={{ color: '#fff' }} />
                                </StyledListItemIcon>
                                <ListItemText
                                    primary="Orders"
                                    primaryTypographyProps={{ fontSize: '16px', color: '#fff' }}
                                />
                            </ListItemButton>
                        </ListItem>
                    </Link>
                    <ListItem disablePadding>
                        <ListItemButton
                            selected={selectedIndex === 3}
                            onClick={async () => {
                                await AuthService.logout();
                                navigate('/');
                            }}
                        >
                            <StyledListItemIcon>
                                <ReceiptIcon fontSize="medium" sx={{ color: '#fff' }} />
                            </StyledListItemIcon>
                            <ListItemText
                                primary="Log out"
                                primaryTypographyProps={{ fontSize: '16px', color: '#fff' }}
                            />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Box>
        </Box>
    );

    return (
        <Drawer
            variant="permanent"
            sx={{
                display: { xs: 'none', sm: 'block' },
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: '240px' },
            }}
            open
        >
            {drawer}
        </Drawer>
    );
}

export default Sidebar;
