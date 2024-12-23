import MUIAppBar from '@mui/material/AppBar';
import {Box, Button, Container, IconButton, Menu, MenuItem, Toolbar, Typography} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import {ReactNode, useState} from "react";
import {BrowserRouter, Routes, Route, NavLink, Link} from 'react-router'

interface Route {
    name: string;
    path: string;
    component: ReactNode;
}

export const RouteBar = ({title, routes}:{title: string; routes: Route[]}) => {

    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return <BrowserRouter>
        <MUIAppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography variant="h6" component="div" paddingRight={4} fontWeight={700}>{title}</Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{ display: { xs: 'block', md: 'none' } }}
                        >
                            {routes.map((route) => (
                                <MenuItem key={route.path} onClick={handleCloseNavMenu}>
                                    <Typography sx={{ textAlign: 'center' }}>{route.name}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {routes.map((route) => (
                            <Typography
                                key={route.path}
                                component={NavLink} // Render the Typography as a React Router Link
                                to={route.path} // Specify the route
                                variant="h6" // MUI Typography variant
                                color="white" // Use primary color for the text
                                style={{ textDecoration: 'none', paddingRight: '8px' }} // Remove underline if needed
                            >
                                {route.name}
                            </Typography>
                        ))}
                    </Box>
                </Toolbar>
            </Container>
        </MUIAppBar>
        <Routes>
            {
                routes.map(route => {
                    return <Route path={route.path} element={route.component}></Route>
                })
            }
        </Routes>
    </BrowserRouter>
}