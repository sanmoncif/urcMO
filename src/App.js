import { RecoilRoot } from 'recoil';
import Router from './Router/Router.tsx';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';

const defaultTheme = extendTheme({});

function App() {
  return (
    <RecoilRoot>
      <ChakraProvider theme={defaultTheme}>
        <Router />
      </ChakraProvider>
    </RecoilRoot>
  );
}

export default App;