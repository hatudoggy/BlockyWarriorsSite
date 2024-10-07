import { Box, Button, Container, Divider, Stack, Typography, useMediaQuery, useTheme } from "@mui/material"
import Navbar from "../components/Navbar"
import { generateTextShadow } from "../utils/designUtils"
import horizonMap from "../assets/images/world_horizon_2.jpeg"
import { Rarity, WarriorDetails } from "../interfaces/warrior"
import WarriorCard from "../components/WarriorCard"
import { Refresh } from "@mui/icons-material"
import WizardChar from "../assets/images/Wizard.png"
import ArcherChar from "../assets/images/Archer.png"
import { HashLink } from 'react-router-hash-link'
import { storeItems } from "../data/store"
import { ReactNode, useState } from "react"
import RecruitImage from "../assets/images/Recruit2.jpeg"
import FightImage from "../assets/images/Fight.jpeg"
import DownloadBG from "../assets/images/ForestBG.jpg"

export default function Landing() {


  return (
    <>
      <Navbar />
      <Container 
        sx={{
          overflowX: 'hidden'
        }}
      >
        <Box
          component="main"
        >

          <Hero />
          <Divider />
          <Showcase />
          <Steps />
          <Map />
          <Download />
        </Box>

        <Footer />
      </Container>
    </>
  )
}



function Footer() {
  return(
    <Box
      component="footer"
      sx={{
        minHeight: 100
      }}
    >

    </Box>
  )
}


function Hero() {
  const theme = useTheme()
  const mobile = useMediaQuery('(min-width:800px)')

  return(
    <Box
      component="section"
      id="hero"
      sx={{
        minHeight: "93vh",
        display: "grid",
        placeItems: "center"
      }}
    >
      <Stack
        sx={{
          textAlign: 'center',
          translate:  mobile ? "0px -90px" : "0px -30px",
          position: 'relative'
        }}
        gap={1}
      >
        <Typography 
          variant={mobile ? "h1" : "h2"} 
          fontFamily="Bloxat"
          sx={{
            //color: '#edf8e9',
            WebkitTextStroke: `1px ${theme.palette.primary.main}`,
            textShadow: generateTextShadow(theme.palette.primary.main, 135, 8),
            filter: "drop-shadow(0 0 70px rgba(135, 255, 135, 0.35))",
            zIndex: 2
          }}
        >
          Blocky Warriors
        </Typography>
        <Typography 
          variant={mobile ? "h4" : "h6"} 
          fontFamily="Bloxat"
          sx={{
            color: '#edf8e9',
            filter: "drop-shadow(0 0 40px rgba(255, 255, 255, 0.35))",
            zIndex: 2
          }}
        >
          Recruit. Train. Fight
        </Typography>
        <Stack direction='row' justifyContent='center' gap={1} mt={4}>
          <Button
            variant="contained"
            sx={{
              borderRadius: 3,
              filter: "drop-shadow(0 0 34px rgba(62, 156, 87, 0.2))"
            }}
          >
            Join Now!
          </Button>
          <HashLink to="#steps">
            <Button
              variant="outlined"
            >
              Learn More
            </Button>
          </HashLink>

        </Stack>

        <Box 
          component='img'
          src={WizardChar}
          sx={{
            position: 'absolute',
            translate: "50% 50%",
            width: mobile ? 350 : 150,
            right: mobile ? 50 : 30,
            bottom:  mobile ? -30 : 220,
            filter: "drop-shadow(0 0 70px rgba(135, 181, 255, 0.2))"
          }}
        />
        <Box 
          component='img'
          src={ArcherChar}
          sx={{
            position: 'absolute',
            zIndex: mobile ? 0 : 1,
            translate: "-50% 50%",
            width: mobile ? 350 : 150,
            left: mobile ? 70 : 40,
            bottom: mobile ? -20 : 230,
            filter: "drop-shadow(0 0 70px rgba(179, 255, 135, 0.2))"
          }}
        />
      </Stack>
    </Box>
  )
}

function Showcase() {

  const randomizeItems = (item: WarriorDetails[]) => {
    return item
      .map(value => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value)
  }


  const [showcaseData, setShowcaseData] = useState(randomizeItems(storeItems).slice(0, 3))

  const refreshShowcase = () => {
    setShowcaseData(
      randomizeItems(storeItems).slice(0, 3)
    )
  }


  const typeGlow = (rarity: Rarity, glow: number) => {
    switch(rarity) {
      case "legendary": {
        return `drop-shadow(0 0 70px rgba(240, 126, 91, ${glow}))`
      }
      case "mythic": {
        return `drop-shadow(0 0 70px rgba(207, 91, 222, ${glow}))`
      }
      default: {
        return `drop-shadow(0 0 70px rgba(135, 181, 255, ${glow}))`
      }
    }
  }

  return(
    <Box
      component="section"
      id="showcase"
      pt={14}
      pb={6}
    >
      <Stack alignItems='center' gap={5}>
        <Stack gap={1}>
          <Typography 
            variant="h4" 
            textAlign='center' 
            fontWeight={600}
            sx={{
              fontSize: { xs: 28, sm: 40, md: 40},
              filter: 'drop-shadow(0 0 50px rgba(135, 181, 255, 0.6))'
            }}
          >
            Collect Rare Warriors
          </Typography>
          <Typography
            variant="h6" 
            fontSize={18} 
            textAlign='center' 
            lineHeight={2} 
            maxWidth={750}
            sx={{
              fontSize: { xs: 14, sm: 18, md: 18},
              filter: 'drop-shadow(0 0 50px rgba(135, 181, 255, 0.4))'
            }}
          >
            Explore the store to collect rare and powerful warriors, each with their own unique abilities. 
            Strengthen your army by unlocking legendary heroes and take your team to the next level!
          </Typography>
        </Stack>
        <Stack 
          direction='row' 
          justifyContent='center' 
          position='relative'
        >

          <WarriorCard 
            cardDetails={showcaseData[0]}
            cardStyle={{
              position: 'absolute',
              zIndex: 0,
              scale: 0.85,
              translate: {xs: "-90px 0px", md: "-170px 0px"},
              filter: typeGlow(showcaseData[0].rarity, 0.2),
              width: {xs: 200, md: 240}
            }}
          />

          <WarriorCard 
            cardDetails={showcaseData[1]}
            cardStyle={{
              position: 'relative',
              zIndex: 2,
              filter: typeGlow(showcaseData[1].rarity, 0.2),
              width: {xs: 200, md: 240}
            }}
          />
        
          <WarriorCard 
            cardDetails={showcaseData[2]}
            cardStyle={{
              position: 'absolute',
              zIndex: 0,
              scale: 0.85,
              translate: {xs: "90px 0px", md: "170px 0px"},
              filter: typeGlow(showcaseData[2].rarity, 0.2),
              width: {xs: 200, md: 240}
            }}
          />

        </Stack>
        <Button 
          variant="outlined"
          startIcon={<Refresh />}
          onClick={()=>refreshShowcase()}
        >
          Reveal More Warriors
        </Button>
      </Stack>
    </Box>
  )
}

function Steps() {

  return(
    <Stack
      component="section"
      id="steps"
      gap={5}
      sx={{
        gap: { xs: 10, sm: 5, md: 5},
        py: { xs: 2, sm: 5, md: 10},
        px: { xs: 2, sm: 5, md: 10}
      }}
    >
      <StepCard 
        graphics={RecruitImage}
        title="Recruit"
        description="In Blocky Warriors, building a powerful army begins with choosing your warriors. Hand-pick from a variety of unique characters, each with their own strengths and abilities. From agile archers to fierce knights, your choices will shape the future of your kingdom."
      />
      <StepCard 
        graphics="https://mir-s3-cdn-cf.behance.net/project_modules/hd/1bfea1120852851.60b9d25c68ed3.png"
        title="Train"
        description="Victory comes through preparation. Strengthen your recruits by training them in combat techniques, strategy, and tactics. As they grow, so do their skills, making your army an unstoppable force on the battlefield."
        direction="row-reverse"
      />
      <StepCard 
        graphics={FightImage}
        title="Fight"
        description="Lead your warriors into epic battles against rival factions, monsters, and bosses. Every decision you make on the battlefield will determine your path to glory. Fight with courage, and watch your warriors claim victory in your name."
      />

    </Stack>
  )
}


interface StepCardProps {
  graphics: string | ReactNode
  title: string
  description: string
  direction?: 'row' | 'row-reverse'
}

function StepCard({
  graphics,
  title,
  description,
  direction = "row"
}: StepCardProps) {
  const mobile = useMediaQuery('(min-width:800px)')

  return(
    <Stack width='100%' direction={mobile ? direction : "column"} gap={4}>
      {
        typeof graphics === "string" ?
          <Box position='relative'>
            <Box
              component='img'
              src={graphics}
              sx={{
                position: 'relative',
                width: mobile ? 350 : "100%",
                aspectRatio: 1/1,
                bgcolor: "#512122",
                borderRadius: 8,
                zIndex: 2
              }}
            />
            <Box
              component='img'
              src={graphics}
              sx={{
                position: 'absolute',
                left: 0,
                width: mobile ? 350 : "100%",
                aspectRatio: 1/1,
                bgcolor: "#512122",
                borderRadius: 8,
                zIndex: 0,
                filter: 'blur(70px)',
                opacity: 0.4
              }}
            />
          </Box>
          :
          graphics
      }
      <Stack 
        flex={1}
        gap={2.5}
        justifyContent='center'
      >
        <Typography 
          variant={mobile ? "h4" : "h5"} 
          fontWeight={600} 
          color="primary.light"
          sx={{
            filter: "drop-shadow(0 0 40px rgba(135, 255, 135, 0.7))",
            zIndex: 2
          }}
        >
          {title}
        </Typography>
        <Typography 
          variant={mobile ? "h6" : "body1"}
          sx={{
            lineHeight: 2,
            zIndex: 2,
            filter: "drop-shadow(0 0 40px rgba(255, 255, 255, 0.4))",
          }}
        >
          {description}
        </Typography>
      </Stack>
    </Stack>
  )
}


function Map() {

  return(
    <Box
      component="section"
      id="map"
      mt={14}
    >
      <Stack alignItems='center' gap={4}>
        <Stack alignItems='center' gap={1.5}>

          <Typography 
            variant="h4" 
            textAlign='center' 
            fontWeight={600}
            sx={{
              fontSize: { xs: 28, sm: 40, md: 40},
              filter: "drop-shadow(0 0 40px rgba(255, 255, 255, 0.3))"
            }}
          >
            Connect with Warriors Worldwide!
          </Typography>

          <Typography 
            variant="h6" 
            fontSize={18} 
            textAlign='center' 
            lineHeight={2} 
            maxWidth={850}
            sx={{
              fontSize: { xs: 14, sm: 18, md: 18},
              filter: "drop-shadow(0 0 40px rgba(255, 255, 255, 0.3))"
            }}
            zIndex={2}
          >
            Join a global community of warriors! 
            Battle alongside or against players from every corner of the world, forging alliances and rivalries as you rise to the top. 
            The battlefield knows no borders, and your next challenger could be halfway across the globe!
          </Typography>

        </Stack>

        <Box 
          position='relative'
          sx={{
            width: { xs: "100%", md: "80%"}
          }}
        >
          <Box
            component='img'
            src={horizonMap}
            sx={{
              width: "100%",
              aspectRatio: 5/3,
              objectFit: 'cover',
              objectPosition: 'center -60px',
              borderRadius: 6,
              position: 'relative',
              zIndex: 2,
            }}
          />
          <Box
            component='img'
            src={horizonMap}
            sx={{
              width: "100%",
              aspectRatio: 5/3,
              objectFit: 'cover',
              objectPosition: 'center -60px',
              borderRadius: 6,
              position: 'absolute',
              left: 0,
              zIndex: 0,
              filter: 'blur(100px)',
              opacity: 0.9
            }}
          />
        </Box>

      </Stack>
    </Box>
  )
}

function Download() {

  return(
    <Box
      component="section"
      id="download"
      pt={24}
      pb={4}
      sx={{
        display: "grid",
        placeItems: "center"
      }}
    >
      <Stack
        height={360}
        sx={{
          width: {xs: '100%', md: '80%'},
          overflow: 'hidden',
          borderRadius: 5,
          position: 'relative'
        }}
      >
        <Stack height='100%' justifyContent='center' alignItems='center' p={3} gap={2} zIndex={1}>
          <Typography 
            variant="h3" 
            fontWeight={600} 
            fontFamily='Bloxat'
            textAlign='center' 
            sx={{
              fontSize: { xs: 28, sm: 40, md: 40}
            }}
          >
            Join Us Now!
          </Typography>
          <Typography
            variant="h6" 
            fontSize={18} 
            textAlign='center' 
            lineHeight={2} 
            maxWidth={850}
            sx={{
              fontSize: { xs: 14, sm: 18, md: 18}
            }}
          >
            Become a part of the Blocky Warriors community and start your journey to 
            recruit, train, and lead your ultimate team of warriors. 
            Adventure awaits—will you answer the call?
          </Typography>
          <Button
            variant="contained"
          >
            Get Started
          </Button>
        </Stack>
        <Box 
          component='img'
          src={DownloadBG}
          width='100%'
          height='100%'
          position='absolute'
          zIndex={0}
          sx={{
            objectFit: 'cover',
            filter: 'blur(30px)'
          }}
        />
      </Stack>
    </Box>
  )
}