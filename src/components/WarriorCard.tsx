
import { Box, Button, Card, CardActions, CardContent, CardMedia, Stack, SxProps, Typography } from "@mui/material"
import BowIcon from "../assets/icons/bow-and-arrow.png"
import GunIcon from "../assets/icons/gun.png"
import StaffIcon from "../assets/icons/staff.png"
import SwordIcon from "../assets/icons/sword.png"
import { Rarity, WarriorDetails } from "../interfaces/warrior"

interface StoreItemProps {
  variant?: "default" | "store"
  cardDetails: WarriorDetails
  cardStyle?: SxProps
}

export default function WarriorCard({
  variant = "default", cardDetails, cardStyle
}: StoreItemProps) {
  
  const { photoURL, number, name, price, type, rarity } = cardDetails

  const photo = "https://preview.redd.it/the-cube-pig-from-my-personal-project-the-cute-cube-series-v0-i6q4t3ws94e91.jpg?auto=webp&s=35fa859b3b207f4990d040b0b8bc6fc3d567d09e"

  const typeIcon = {
    "melee": SwordIcon,
    "archer": BowIcon,
    "mage": StaffIcon,
    "gunner": GunIcon,
  }

  return(
    <Card
      sx={{
        borderRadius: 4,
        flex: 'none',
        width: variant === "store" ? 270 : 240,
        borderWidth: 2,
        borderStyle: 'solid',
        borderColor: rarity === 'mythic' ? 'rgb(170,59,184)' : rarity === 'legendary' ? 'rgb(214,91,42)' : '#2e2e2e',
        ...cardStyle
      }}
    >
      <Box
        sx={{
          width: '100%',
          p: 1
        }}
      >
        <CardMedia 
          component='img'
          sx={{
            width: '100%',
            aspectRatio: 1/1,
            bgcolor: '#215252',
            borderRadius: 4,
          }}
          src={photoURL === "" ? photo : photoURL}
        />
      </Box>
      <CardContent
        sx={{
          py: 0,
          pt: 0.5,
          width: '100%',
        }}
      >
        <Stack
          justifyContent='space-between'
          sx={{
            width: '100%'
          }}
          gap={1}
        >
          <Stack direction='row' gap={0.5}  justifyContent='space-between'>
            <Stack direction='row' alignItems='center' gap={1}>
              <Typography variant="body1" sx={{color: "#afafaf", fontSize: { xs: 14, md: 16} }}>#{number}</Typography>
              <RarityChip rarity={rarity} />
            </Stack>
            {
              variant === "store" &&
                <Typography variant="h5" color="primary.light">${price}</Typography>
            }
          </Stack>
          <Typography 
            variant="h5" 
            fontWeight={600} 
            fontFamily="Bloxat" 
            noWrap
            sx={{ fontSize: { xs: 20, md: 24} }}
          >
            {name}
          </Typography>
        </Stack>

        <Stack direction='row' gap={1}>
          <Box
            component='img'
            src={typeIcon[type]}
            sx={{
              width: { xs: 18, md: 22},
              height: { xs: 18, md: 22},
              opacity: 0.7,
            }}
          />
          <Typography 
            textTransform='capitalize' 
            fontWeight={600} 
            sx={{ opacity: 0.7, fontSize: { xs: 14, md: 16} }}
          >
            {type}
          </Typography>
        </Stack>

      </CardContent>
      <CardActions>
        {
          variant === "store" &&
            <Button
              variant="contained"
              fullWidth
            >
              Add to Cart
            </Button>
        }
      </CardActions>
    </Card>
  )
}


interface RarityChipProps {
  rarity?: Rarity
}

function RarityChip({rarity = 'common'}: RarityChipProps) {

  const rarityColor = {
    'common': 'linear-gradient(180deg, rgba(34,237,98,1) 0%, rgba(55,158,77,1) 98%)',
    'rare': 'linear-gradient(180deg, rgba(34,151,237,1) 0%, rgba(55,105,158,1) 98%)',
    'mythic': 'linear-gradient(180deg, rgba(237,34,198,1) 0%, rgba(170,59,184,1) 98%)',
    'legendary':
      //legendary gold:
      //'linear-gradient(180deg, rgba(237,207,34,1) 0%, rgba(158,112,55,1) 100%)' 
      //legendary orange: 
      'linear-gradient(180deg, rgba(231,138,57,1) 0%, rgba(214,91,42,1) 100%)'
  }

  return(
    <Stack
      sx={{
        background: rarityColor[rarity],
        opacity: 0.9,
        px: 1,
        py: 0.2,
        borderRadius: 1,
        height: 'min-content'
      }}
    >
      <Typography textTransform='capitalize' sx={{ fontSize: { xs: 14, md: 16} }}>{rarity}</Typography>
    </Stack>
  )
}