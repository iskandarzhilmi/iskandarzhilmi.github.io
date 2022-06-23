import * as React from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { Logo } from './Logo';

export const App = () => (
  // <ChakraProvider theme={theme}>
    
  //   <Box textAlign='center' fontSize='xl'>
  //     <Grid minH='100vh' p={3}>
  //       <ColorModeSwitcher justifySelf='flex-end' />
  //       <VStack spacing={8}>
  //         <Logo h='40vmin' pointerEvents='none' />
  //         <Text>
  //           Edit <Code fontSize='xl'>src/App.tsx</Code> and save to reload.
  //         </Text>

  //         <Link
  //           color='teal.500'
  //           href='https://chakra-ui.com'
  //           fontSize='2xl'
  //           target='_blank'
  //           rel='noopener noreferrer'
  //         >
  //           Learn Chakra
  //         </Link>
  //       </VStack>
  //     </Grid>
  //   </Box>
  // </ChakraProvider>

  const applyScrollReveal = () => {
    ScrollReveal().reveal('.reveal', {
      delay: 500,
      duration: 1000,
      distance: '100px',
      origin: 'bottom',
      reset: false,
      useDelay: 'always',
    });
  };
  window.onload = applyScrollReveal;
  return (
    <div className='App'>
      <h1 className='reveal'>Iskandar Zulqarnain Hilmi</h1>
      <h6 className='reveal'>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>

        <p>
          Etiam a metus eget turpis auctor porta in a purus. Vivamus
          pellentesque consequat nibh nec aliquam. Proin pharetra commodo
          imperdiet. Nunc a semper dui, in malesuada lacus. Donec malesuada elit
          ac lobortis vestibulum.
        </p>
      </h6>
      <p className='reveal'>
        <Row>
          <Col>
            <a
              href='https://www.linkedin.com/in/iskandarzhilmi/'
              target='_blank'
              rel='noopener noreferrer'
            >
              <img
                src='https://img.icons8.com/color/48/000000/linkedin.png'
                alt='linkedin'
              />
            </a>
          </Col>

          <Col>
            <a
              href='
            https://www.danieltan.dev/'
              target='_blank'
              rel='noopener noreferrer'
            >
              <img
                src='https://img.icons8.com/color/48/000000/github.png'
                alt='github'
              />
            </a>
          </Col>
        </Row>
      </p>

      <img
        src='https://i.imgur.com/KuPVaOr.jpeg'
        alt='profile'
        className='profile'
      />

      <img src={logo} className='App-logo reveal' alt='logo' />
      <img src={logo} className='App-logo reveal' alt='logo' />
      <img src={logo} className='App-logo reveal' alt='logo' />
      <img src={logo} className='App-logo reveal' alt='logo' />
      <img src={logo} className='App-logo reveal' alt='logo' />
      <img src={logo} className='App-logo reveal' alt='logo' />
      <img src={logo} className='App-logo reveal' alt='logo' />
      <p>
        Edit <code>src/App.tsx</code> and save to reload.
      </p>
    </div>
  );
);
