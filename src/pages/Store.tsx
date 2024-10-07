import { Box, Container, Stack, Typography, useMediaQuery } from "@mui/material"
import Navbar from "../components/Navbar"
import { WarriorDetails } from "../interfaces/warrior"
import WarriorCard from "../components/WarriorCard"
import { storeItems } from "../data/store"
import StoreBanner from "../assets/images/RockBG.webp"


export default function Store() {

  const allWarriors = storeItems

  const basicWarriorsItems = [0, 1, 2, 3]
  const basicWarriors = allWarriors.filter((_item, idx)=> basicWarriorsItems.includes(idx))


  const limitedOffers = 
    allWarriors
      .filter((item) => item.rarity == 'mythic' || item.rarity == 'legendary')
      .map(value => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value)
      .slice(0, 4)



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

        {/* <Box
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
        </Box> */}

        
        <Box
          sx={{
            width: "100%",
            height: 150,
            my: 3,
            mb: 8,
            mx: { xs: 0, md: 2 },
            borderRadius: 4,
            overflow: 'hidden'
          }}
        >
          <Box 
            component="img"
            src={StoreBanner}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: 'cover',
              objectPosition: 'center center',
              filter: 'blur(4px)'
            }}
          />
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
  const mobile = useMediaQuery('(min-width:800px)')

  return(
    <Stack gap={2}>
      <Typography variant="h4" fontSize={30} fontWeight={600}>{title}</Typography>
      
      <Stack direction={mobile ? 'row' : 'column'} alignItems='center' flexWrap={layout === 'scrollable' ? 'nowrap' : 'wrap'} gap={mobile ? 1.5 : 2}>
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




