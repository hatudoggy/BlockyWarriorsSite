import { Box, Container, Paper, Stack, Typography } from "@mui/material"
import Navbar from "../components/Navbar"
import { WarriorDetails } from "../interfaces/warrior"
import WarriorCard from "../components/WarriorCard"



export default function Store() {

  const basicWarriors: WarriorDetails[] = [
    {photoURL: "", number: 1, name: "Starter Knight", price: 50, type: "melee", rarity: "common"},
    {photoURL: "", number: 2, name: "Starter Mage", price: 50, type: "mage", rarity: "common"},
    {photoURL: "", number: 3, name: "Starter Archer", price: 50, type: "archer", rarity: "common"},
    {photoURL: "", number: 4, name: "Starter Ranger", price: 50, type: "gunner", rarity: "common"},
  ]

  const limitedOffers: WarriorDetails[] = [
    {photoURL: "", number: 12, name: "Starter Knight", price: 50, type: "melee", rarity: "mythic"},
    {photoURL: "", number: 64, name: "Starter Mage", price: 50, type: "mage", rarity: "common"},
    {photoURL: "", number: 44, name: "Starter Archer", price: 50, type: "archer", rarity: "legendary"},
    {photoURL: "", number: 23, name: "Starter Ranger", price: 50, type: "gunner", rarity: "common"},
  ]

  const allWarriors: WarriorDetails[] = [
    {photoURL: "", number: 54, name: "Starter Knight", price: 50, type: "melee", rarity: "common"},
    {photoURL: "", number: 13, name: "Starter Mage", price: 50, type: "mage", rarity: "common"},
    {photoURL: "", number: 32, name: "Starter Archer", price: 50, type: "archer", rarity: "common"},
    {photoURL: "", number: 43, name: "Starter Ranger", price: 50, type: "gunner", rarity: "common"},
  ]


  return (
    <>
      <Navbar />
      <Container>
        <Typography 
          variant="h4"
          fontSize={38}
          fontWeight={600}
          sx={{
            mt: 2
          }}
        >
          Store
        </Typography>

        <Box
          sx={{
            width: "100%",
            height: 500,
            my: 3,
            mb: 8,
            px: 4
          }}
        >
          <Paper
            sx={{
              borderRadius: 4,
              width: "100%",
              height: "100%"
            }}
          ></Paper>
        </Box>
        
        <Stack gap={8}>
          <StoreSection 
            title="Basic Warriors"
            itemList={basicWarriors}
          />

          <StoreSection 
            title="Limited Offers"
            itemList={limitedOffers}
          />
          <StoreSection 
            title="All Warriors"
            layout="grid"
            itemList={allWarriors}
          />
        </Stack>

        <Box
          component='footer'
          sx={{
            height: 100
          }}
        >

        </Box>
      </Container>
    </>
  )
}


interface StoreSectionProps {
  title: string
  layout?: 'scrollable' | 'grid'
  itemList: WarriorDetails[]
}

function StoreSection(props: StoreSectionProps) {

  const { title, itemList, layout = 'scrollable' } = props

  return(
    <Stack gap={2}>
      <Typography variant="h4" fontSize={30} fontWeight={600}>{title}</Typography>
      
      <Stack direction='row' flexWrap={layout === 'scrollable' ? 'nowrap' : 'wrap'} gap={1.5}>
        {
          itemList.map((item, idx)=>
            <WarriorCard 
              key={idx}
              variant="store"
              cardDetails={item}
            />
          )
        }
      </Stack>
    </Stack>
  )
}




