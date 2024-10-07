import { Box, Button, Container, Divider, Paper, Stack, Typography, useMediaQuery, useTheme } from "@mui/material"
import Navbar from "../components/Navbar"
import { generateTextShadow } from "../utils/designUtils"
import horizonMap from "../assets/images/world_horizon_2.jpeg"
import { WarriorDetails } from "../interfaces/warrior"
import WarriorCard from "../components/WarriorCard"
import { Refresh } from "@mui/icons-material"
import WizardChar from "../assets/images/Wizard.png"
import ArcherChar from "../assets/images/Archer.png"

export default function Landing() {


  return (
    <>
      <Navbar />
      <Container>
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
          translate: "0px -90px",
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
            textShadow: generateTextShadow(theme.palette.primary.main, 135, 8)
          }}
        >
          Blocky Warriors
        </Typography>
        <Typography 
          variant={mobile ? "h4" : "h6"} 
          fontFamily="Bloxat"
          sx={{
            color: '#edf8e9'
          }}
        >
          Recruit. Train. Fight
        </Typography>
        <Stack direction='row' justifyContent='center' gap={1} mt={4}>
          <Button
            variant="contained"
          >
            Join Now!
          </Button>
          <Button
            variant="outlined"
            onClick={() => window.location.replace("/#steps")}
          >
            Learn More
          </Button>
        </Stack>

        <Box 
          component='img'
          src={WizardChar}
          sx={{
            position: 'absolute',
            translate: "50% 50%",
            width: 350,
            right: 50,
            bottom: -30
          }}
        />
        <Box 
          component='img'
          src={ArcherChar}
          sx={{
            position: 'absolute',
            translate: "-50% 50%",
            width: 350,
            left: 70,
            bottom: -20
          }}
        />
      </Stack>
    </Box>
  )
}

function Showcase() {

  const showcaseCards: WarriorDetails[] = [
    {photoURL: "", number: 1, name: "Starter Knight", price: 50, type: "melee", rarity: "common"},
    {photoURL: "", number: 2, name: "Starter Mage", price: 50, type: "mage", rarity: "common"},
    {photoURL: "", number: 3, name: "Starter Archer", price: 50, type: "archer", rarity: "common"},
  ]


  return(
    <Box
      component="section"
      id="showcase"
      py={14}
    >
      <Stack alignItems='center' gap={5}>
        <Stack gap={1}>
          <Typography 
            variant="h4" 
            textAlign='center' 
            fontWeight={600}
            sx={{
              fontSize: { xs: 28, sm: 40, md: 40}
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
              fontSize: { xs: 14, sm: 18, md: 18}
            }}
          >
            Explore the store to collect rare and powerful warriors, each with their own unique abilities. 
            Strengthen your army by unlocking legendary heroes and take your team to the next level!
          </Typography>
        </Stack>
        <Stack direction='row' gap={3}>
          {
            showcaseCards.map((item, idx) =>
              <WarriorCard 
                key={idx}
                cardDetails={item}
              />
            )
          }
        </Stack>
        <Button 
          variant="outlined"
          startIcon={<Refresh />}
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
        imgURL="https://mir-s3-cdn-cf.behance.net/project_modules/hd/1bfea1120852851.60b9d25c68ed3.png"
        title="Recruit"
        description="In Blocky Warriors, building a powerful army begins with choosing your warriors. Hand-pick from a variety of unique characters, each with their own strengths and abilities. From agile archers to fierce knights, your choices will shape the future of your kingdom."
      />
      <StepCard 
        imgURL="https://mir-s3-cdn-cf.behance.net/project_modules/hd/1bfea1120852851.60b9d25c68ed3.png"
        title="Train"
        description="Victory comes through preparation. Strengthen your recruits by training them in combat techniques, strategy, and tactics. As they grow, so do their skills, making your army an unstoppable force on the battlefield."
        direction="row-reverse"
      />
      <StepCard 
        imgURL="https://mir-s3-cdn-cf.behance.net/project_modules/hd/1bfea1120852851.60b9d25c68ed3.png"
        title="Fight"
        description="Lead your warriors into epic battles against rival factions, monsters, and bosses. Every decision you make on the battlefield will determine your path to glory. Fight with courage, and watch your warriors claim victory in your name."
      />

    </Stack>
  )
}


interface StepCardProps {
  imgURL: string
  title: string
  description: string
  direction?: 'row' | 'row-reverse'
}

function StepCard({
  imgURL,
  title,
  description,
  direction = "row"
}: StepCardProps) {
  const mobile = useMediaQuery('(min-width:800px)')

  return(
    <Stack width='100%' direction={mobile ? direction : "column"} gap={4}>
      <Box
        component='img'
        src={imgURL}
        sx={{
          width: mobile ? 400 : "100%",
          aspectRatio: 1/1,
          bgcolor: "#51212",
          borderRadius: 8
        }}
      >
      </Box>
      <Stack 
        flex={1}
        gap={2.5}
        justifyContent='center'
      >
        <Typography variant={mobile ? "h4" : "h5"} fontWeight={600} color="primary.light">{title}</Typography>
        <Typography 
          variant={mobile ? "h6" : "body1"}
          sx={{
            lineHeight: 2
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
              fontSize: { xs: 28, sm: 40, md: 40}
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
              fontSize: { xs: 14, sm: 18, md: 18}
            }}
          >
            Join a global community of warriors! 
            Battle alongside or against players from every corner of the world, forging alliances and rivalries as you rise to the top. 
            The battlefield knows no borders, and your next challenger could be halfway across the globe!
          </Typography>

        </Stack>

        <Box
          component='img'
          src={horizonMap}
          sx={{
            width: { xs: "100%", md: "80%"},
            aspectRatio: 5/3,
            objectFit: 'cover',
            objectPosition: 'center -60px',
            borderRadius: 6
          }}
        ></Box>
      </Stack>
    </Box>
  )
}

function Download() {

  return(
    <Box
      component="section"
      id="download"
    >

    </Box>
  )
}