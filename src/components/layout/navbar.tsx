import * as React from 'react';
import type { NextPage } from 'next'
import Grid from '@mui/material/Grid';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { Menu,Button,MenuItem } from '@mui/material';
import Fade from '@mui/material/Fade';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import Link from '@mui/material/Link';
import HomeIcon from '@mui/icons-material/Home';
import ListItemButton from '@mui/material/ListItemButton';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import StoreMallDirectoryIcon from '@mui/icons-material/StoreMallDirectory';
import ListAltIcon from '@mui/icons-material/ListAlt';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import { FoodBankOutlined } from '@mui/icons-material';
import SensorsIcon from '@mui/icons-material/Sensors';
import InventoryIcon from '@mui/icons-material/Inventory';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));





const Navbar: NextPage = ({children}) => {
  const [openEl, setOpenEl] = React.useState<null | HTMLElement>(null);
  const openMenu = Boolean(openEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setOpenEl(event.currentTarget);
  };
  const handleClose = () => {
    setOpenEl(null);
  };

  
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };



  const [openSub, setOpenSub] = React.useState(true);

  const handleClickSub = () => {
    setOpenSub(!openSub);
  };

  

  return (
    <div>
      <Grid item xs={12} md={12}>
      <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
             sx={{ mr: 2, ...(open && { display: 'none' }) }} 
             onClick={handleDrawerOpen}
           >
             <MenuOpenIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Punto de Venta
          </Typography>
          <Button
              sx={{ mr: 60 }}
            id="demo-customized-button"
            aria-controls="demo-customized-menu"
            aria-haspopup="true"
            aria-expanded={openMenu ? 'true' : undefined}
            variant="contained"
            disableElevation
            onClick={handleClick}
            endIcon={openMenu ? <ExpandLess /> : <ExpandMore />}
          >
            PDC-CTM
          </Button>
          <Menu
            id="fade-menu"
            MenuListProps={{
              'aria-labelledby': 'fade-button',
            }}
            anchorEl={openEl}
            open={openMenu}
            onClose={handleClose}
            TransitionComponent={Fade}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
            <MenuItem onClick={handleClose}>Logout</MenuItem>
          </Menu>
          <Button
          sx={{ mr: 5 }}
            id="demo-customized-button"
            aria-controls="demo-customized-menu"
            aria-haspopup="true"
            aria-expanded={openMenu ? 'true' : undefined}
            variant="contained"
            disableElevation
            onClick={handleClick}
            endIcon={ openMenu ? <ExpandLess /> : <ExpandMore />}
          >
            S
          </Button>
          <Menu
            id="fade-menu"
            MenuListProps={{
              'aria-labelledby': 'fade-button',
            }}
            anchorEl={openEl}
            open={openMenu}
            onClose={handleClose}
            TransitionComponent={Fade}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
            <MenuItem onClick={handleClose}>Logout</MenuItem>
          </Menu>

          <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"

              color="inherit"
            >
              <ErrorOutlineOutlinedIcon />
           </IconButton>
       
        </Toolbar>
           
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        
        <List >
        <Link href="/tabla" color="inherit" underline="none">
                  <ListItem button  >
              <ListItemIcon>
                <HomeIcon/>
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
            </Link>
        </List>
       
        <List>
        <ListItemButton onClick={handleClickSub}>
        <ListItemIcon>
          <StoreMallDirectoryIcon/>
        </ListItemIcon>
        <ListItemText primary="Tienda" />
        {openSub ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openSub} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <ListAltIcon />
            </ListItemIcon>
            <ListItemText primary="Lista de Precios" />
          </ListItemButton>
        </List>
        <List component="div" disablePadding>
        <Link href="/productos" color="inherit" underline="none">
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <FastfoodIcon />
            </ListItemIcon>
            <ListItemText primary="Productos" />
          </ListItemButton>
          </Link>
        </List>
        <List component="div" disablePadding>
        <Link href="/clasificacion" color="inherit" underline="none">
    
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <SensorsIcon />
            </ListItemIcon>
            <ListItemText primary="clasificacion" />
          </ListItemButton>
    </Link>
        </List>
        <List component="div" disablePadding>
        <Link href="/sucursales" color="inherit" underline="none">
    
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <InventoryIcon />
            </ListItemIcon>
            <ListItemText primary="Sucursales" />
          </ListItemButton>
    </Link>
        </List>     
      </Collapse> </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        {children}
        </Main>
    </Box>
      </Grid>


    </div>
  )
}

export default Navbar
