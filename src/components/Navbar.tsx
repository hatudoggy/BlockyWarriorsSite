import { Menu, ShoppingCart } from "@mui/icons-material";
import { AppBar, Box, Button, Container, Drawer, IconButton, List, ListItem, ListItemButton, ListItemText, Stack, Toolbar, Typography } from "@mui/material";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BWLogo from "./BWLogo";


const links = [
  {label: "Home", link: ""},
  {label: "Store", link: "store"}
]

export default function Navbar() {

  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const navigate = useNavigate()
  const location = useLocation()
  const drawerWidth = 240

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  }

  const handleCartToggle = () => {
    setCartOpen((prevState) => !prevState);
  }

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Stack 
        direction='row'
        alignItems='center'
        gap={1}
      >
        <BWLogo />
        <Typography
          fontFamily='Bloxat'
        >
          Blocky Warriors
        </Typography>
      </Stack>
      <List>
        {links.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }} onClick={()=>navigate(`../${item.link}`)}>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return(
    <>
      <AppBar 
        component="nav"
        elevation={0}
        enableColorOnDark={false}
        position="static"
        sx={{
          bgcolor: 'transparent'
        }}
      >
        <Container>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <Menu />
            </IconButton>
            <Box
              flexGrow={1}
              justifyContent='center'
              sx={{ display: { xs: 'flex', sm: 'none' } }}
            >
              <BWLogo />
            </Box>
            <Box
              width={25}
              sx={{ display: { sm: 'none' } }}
            >
              <IconButton
                onClick={handleCartToggle}
              >
                <ShoppingCart />
              </IconButton>
            </Box>
            <Stack 
              direction='row'
              alignItems='center'
              gap={1}
              sx={{ flexGrow: 1, display: { xs: 'none', sm: 'flex' } }}
            >
              <BWLogo />
              <Typography
                variant="h6"
                fontFamily='Bloxat'
              >
                Blocky Warriors
              </Typography>
            </Stack>
            <Stack direction='row' gap={2} sx={{ display: { xs: 'none', sm: 'flex' } }}>
              {links.map((item) => (
                <Button 
                  key={item.label} 
                  sx={{
                    color: location.pathname === `/${item.link}` ? '#fff' : '#aaa',
                    borderBottom: location.pathname === `/${item.link}` ? '1px solid white' : 'none',
                    borderRadius: 0,
                  }}
                  onClick={()=>navigate(`../${item.link}`)}
                >
                  {item.label}
                </Button>
              ))}
              <Button
                variant="contained"
              >
                Login
              </Button>
              <IconButton
                onClick={handleCartToggle}
              >
                <ShoppingCart />
              </IconButton>
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>
      <nav>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Drawer
        variant="temporary"
        open={cartOpen}
        onClose={handleCartToggle}
        anchor="right"
        sx={{
          '& .MuiDrawer-paper': { width: { xs: 300, md: 450}},
        }}
      >
        <CartDrawer 
          onToggle={()=>handleCartToggle()}
        />
      </Drawer>
    </>
  )
}


interface CartDrawerProps {
  onToggle: () => void
}

function CartDrawer({onToggle}: CartDrawerProps) {

  return(
    <Box onClick={onToggle}>
      <Stack 
        width='100%'
        height='100%'
        p={3}
        gap={1}
      >
        <Typography variant="h6" fontWeight={600}>
          Shopping Cart
        </Typography>


      </Stack>
    </Box>
  )
}