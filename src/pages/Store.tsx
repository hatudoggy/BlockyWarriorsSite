import { Box, Container, Snackbar, Stack, Typography, useMediaQuery } from "@mui/material"
import Navbar from "../components/Navbar"
import { WarriorDetails } from "../interfaces/warrior"
import WarriorCard from "../components/WarriorCard"
import { storeItems } from "../data/store"
import { useContext, useState } from "react"
import { CartContext } from "./App"
import { Carousel } from "react-bootstrap"
import Banner1 from "../assets/images/banner1.png"
import Banner2 from "../assets/images/banner2.png"


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
        
        <StoreSlideshow />
        
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


function StoreSlideshow() {

  const slides = [Banner1, Banner2]

  return(
    <Box
      sx={{
        px: {xs: 0, md: 6},
        pt: 1,
        pb: 4,
      }}
    >
      <Carousel
        style={{
          overflow: 'hidden',
          borderRadius: 10,
        }}
      >
        {
          slides.map((slide) =>
            <Carousel.Item>
              <Box
                component="img"
                src={slide}
                sx={{
                  width: '100%',
                  height: {xs: 200, sm: 300, md: 500},
                  objectFit: 'cover'
                }}
              />
              {/* <Carousel.Caption>
                <h3>First slide label</h3>
                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
              </Carousel.Caption> */}
            </Carousel.Item>
          )
        }
      </Carousel>
    </Box>
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
  const { addItem } = useContext(CartContext) as CartContext
  const [cartSnackbar, setCartSnackbar] = useState(false)

  return(
    <>
      <Stack gap={2}>
        <Typography variant="h4" fontSize={30} fontWeight={600}>{title}</Typography>
        
        <Stack direction={mobile ? 'row' : 'column'} alignItems='center' flexWrap={layout === 'scrollable' ? 'nowrap' : 'wrap'} gap={mobile ? 1.5 : 2}>
          {
            itemList.map((item, idx)=>
              <WarriorCard 
                key={idx}
                variant="store"
                cardDetails={item}
                addToCartClick={()=>{
                  addItem(item)
                  setCartSnackbar(true)
                }}
              />
            )
          }
        </Stack>
      </Stack>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right"
        }}
        open={cartSnackbar}
        onClose={() => setCartSnackbar(false)}
        key={"bottom" + "center"}
        autoHideDuration={1000}
        message="Added item to cart"
      />
    </>
  )
}




