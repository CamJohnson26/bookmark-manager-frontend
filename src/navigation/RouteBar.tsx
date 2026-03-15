import MUIAppBar from '@mui/material/AppBar';
import {Box, Container, Toolbar, Typography} from "@mui/material";
import {ReactNode} from "react";
import {BrowserRouter, Routes, Route, NavLink} from 'react-router'

interface AppRoute {
    name: string;
    path: string;
    component: ReactNode;
}

export const RouteBar = ({title, routes}:{title: string; routes: AppRoute[]}) => {

    return <BrowserRouter>
        <MUIAppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography variant="subtitle1" component="div" paddingRight={4} fontWeight={700}>{title}</Typography>
                    <Box sx={{ flexGrow: 1 }}>
                        {routes.map((route) => (
                            <Typography
                                key={route.path}
                                component={NavLink} // Render the Typography as a React Router Link
                                to={route.path} // Specify the route
                                variant="body1" // MUI Typography variant
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
