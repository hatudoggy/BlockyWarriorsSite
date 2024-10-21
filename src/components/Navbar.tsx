import { Add, Delete, Menu, Remove, ShoppingCart, ShoppingCartCheckout, Token } from "@mui/icons-material";
import { AppBar, Badge, Box, Button, CardMedia, Container, Drawer, IconButton, List, ListItem, ListItemButton, ListItemText, Stack, Toolbar, Typography } from "@mui/material";
import { useContext, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BWLogo from "./BWLogo";
import { CartContext } from "../pages/App";
import { WarriorDetails } from "../interfaces/warrior";
import { rarityColor, typeIcon } from "./WarriorCard";


const links = [
  {label: "Home", link: ""},
  {label: "Store", link: "store"}
]

export default function Navbar() {

  const { cart } = useContext(CartContext) as CartContext
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

  
  const onLogin = () => {
    alert("Simulate user logging in")
  }


  const cartItemNumber = useMemo(() =>
    cart.reduce((acc, val) =>
      acc + (val.quantity)
      , 0 )
  , [cart])


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
      <Button variant='contained' onClick={()=>onLogin()}>
        Login
      </Button>
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
                <Badge badgeContent={cartItemNumber} color="primary" max={99}>
                  <ShoppingCart />
                </Badge>
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
                onClick={()=>onLogin()}
              >
                Login
              </Button>
              <IconButton
                onClick={handleCartToggle}
              >
                <Badge badgeContent={cartItemNumber} color="primary" max={99}>
                  <ShoppingCart />
                </Badge>
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
          //onToggle={()=>handleCartToggle()}
        />
      </Drawer>
    </>
  )
}


interface CartDrawerProps {
  //onToggle: () => void
}

function CartDrawer({
  //onToggle
}: CartDrawerProps) {

  const { cart, addItem, removeItem, deleteItem } = useContext(CartContext) as CartContext

  const totalPrice = useMemo(() =>
    Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    }).format(
      cart.reduce((acc, val) =>
        acc + (val.itemDetails.price * val.quantity)
        , 0 )
    )
  , [cart])

  const proceedCheckout = () => {
    alert("Simulate successful checkout of customer")
  }

  return(
    <Box
      width='100%'
      height='100%'
      sx={{
        overflowY: 'hidden'
      }}
    >
      <Stack 
        width='100%'
        height='100%'
        sx={{
          p: { xs: 1.5, md: 3},
          gap: {xs: 2, md: 2}
        }}
      >
        <Typography variant="h5" fontWeight={600}>
          Shopping Cart
        </Typography>

        <Stack
          sx={{
            flex: 1,
            gap: {xs: 1, md: 2},
            overflowY: 'auto'
          }}
        >
          {
            cart.length !== 0 ? 
              cart.map(
                item => 
                  <CartItem 
                    key={item.itemDetails.number}
                    itemDetails={item.itemDetails}
                    quantity={item.quantity}
                    onAdd={()=>addItem(item.itemDetails)}
                    onRemove={()=>removeItem(item.itemDetails.number)}
                    onDelete={()=>deleteItem(item.itemDetails.number)}
                  />
              )
              :
              <Stack 
                py={8}
                alignItems='center'
                gap={1}
              >
                <Token 
                  sx={{
                    fontSize: 120,
                    color: "GrayText"
                  }}
                />
                <Stack>
                  <Typography variant="h6" textAlign='center' color="GrayText">No warriors in the cart yet</Typography>
                  <Typography color="GrayText" textAlign='center' maxWidth={300}>
                    Any warriors you have added to cart will be shown here
                  </Typography>
                </Stack>
              </Stack>
          }
        </Stack>

        <Stack>
          <Stack 
            direction='row' 
            justifyContent='space-between'
            pb={2}
          >
            <Typography variant="h6">Total</Typography>
            <Typography variant="h6" color="primary.light">
              {totalPrice}
            </Typography>
          </Stack>

          <Button 
            variant="contained" 
            size="large"
            startIcon={<ShoppingCartCheckout />}
            onClick={()=>proceedCheckout()}
          >
            Checkout
          </Button>
        </Stack>
      </Stack>
    </Box>
  )
}


interface CartItemProps {
  itemDetails: WarriorDetails
  quantity: number
  onAdd?: () => void
  onRemove?: () => void
  onDelete?: () => void
}

function CartItem(props: CartItemProps) {

  const {itemDetails, quantity, onAdd, onRemove, onDelete} = props
  const photo = "https://preview.redd.it/the-cube-pig-from-my-personal-project-the-cute-cube-series-v0-i6q4t3ws94e91.jpg?auto=webp&s=35fa859b3b207f4990d040b0b8bc6fc3d567d09e"

  const newPrice = Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }).format(itemDetails.price * quantity)

  return(
    <Stack direction='row' justifyContent='space-between'>
      <Stack direction='row' alignItems='center' gap={1.5}>
        <CardMedia 
          component='img'
          sx={{
            flex: 'none',
            width: { xs: 60, md: 80},
            height: { xs: 60, md: 80},
            //aspectRatio: 1/1,
            bgcolor: '#215252',
            borderRadius: 4,
          }}
          src={itemDetails.photoURL === "" ? photo : itemDetails.photoURL}
        />

        <Stack gap={0.5}>

          <Typography 
            fontWeight={500}
            sx={{
              fontSize: {xs: 18, md: 20}
            }}
          >
            {itemDetails.name}
          </Typography>

          <Stack direction='row' alignItems='center' gap={1}>
            <Box
              sx={{
                width: { xs: 14, md: 16},
                height: { xs: 14, md: 16},
                borderRadius: 20,
                opacity: 0.7,
                background: rarityColor[itemDetails.rarity]
              }}
            />
            <Typography 
              textTransform='capitalize'
              sx={{
                fontSize: {xs: 14, md: 16}
              }}
            >
              {itemDetails.rarity}
            </Typography>
          </Stack>


          <Stack direction='row' alignItems='center' gap={1}>
            <Box
              component='img'
              src={typeIcon[itemDetails.type]}
              sx={{
                width: { xs: 16, md: 20},
                height: { xs: 16, md: 20},
                opacity: 0.7,
              }}
            />
            <Typography 
              textTransform='capitalize'
              sx={{
                fontSize: {xs: 14, md: 16}
              }}
            >
              {itemDetails.type}
            </Typography>
          </Stack>

        </Stack>
      </Stack>

      <Stack direction='row' alignItems='center' gap={2}>
        <Stack justifyContent='center' alignItems='end' height='100%'>
          <Typography
            sx={{
              fontSize: {xs: 16, md: 18}
            }}
          >
            {newPrice}
          </Typography>
          <Typography
            sx={{
              fontSize: {xs: 14, md: 16}
            }}
          >
            x{quantity}
          </Typography>
        </Stack>
        
        <Stack>
          <IconButton onClick={onAdd}>
            <Add fontSize="small"/>
          </IconButton>
          <IconButton onClick={onDelete}>
            <Delete fontSize="small" color="error"/>
          </IconButton>
          <IconButton onClick={onRemove}>
            <Remove fontSize="small" />
          </IconButton>
        </Stack>

      </Stack>
    </Stack>
  )
}