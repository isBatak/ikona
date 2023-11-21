'use client'
import { ChakraProvider } from '@chakra-ui/react';
import type { PropsWithChildren } from 'react';

export interface ProvidersProps {
}

export function Providers(props: PropsWithChildren<ProvidersProps>) {
  return <ChakraProvider>{props.children}</ChakraProvider>;
}