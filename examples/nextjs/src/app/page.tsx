'use client'
import { Grid, GridItem, Heading, Text, useClipboard, useToast } from "@chakra-ui/react";

import { icons } from "../../.ikona/icons";
import { illustrations } from "../../.ikona/illustrations";
import { Icon } from "@/components/media-and-icons/icon/Icon";
import { IconName } from "../../.ikona/types/icon-name";
import { IllustrationPath } from "../../.ikona/types/illustration-path";
import { Illustration } from "@/components/media-and-icons/illustration/Illustration";

const IconPreview = ({ name }: { name: IconName } ) => {
  const toast = useToast();
  const { onCopy } = useClipboard(`<Icon name="${name}" />`);

  return (
    <GridItem
      sx={{ '& > svg': { boxSize: '30px' } }}
      alignItems="center"
      flexDir="column"
      display="flex"
      p={2}
      bg="whiteAlpha.400"
      borderRadius="md"
      shadow="base"
      _hover={{
        bg: 'whiteAlpha.500',
      }}
      cursor="pointer"
      colSpan={1}
      onClick={() => {
        onCopy();
        toast({
          title: `Copied "<Icon name="${name}" />" to clipboard!`,
          status: 'success',
          duration: 2000,
          isClosable: true,
        });
      }}
    >
      <Icon key={name} name={name} />
      <Text mt={2} fontSize="xx-small" textAlign="center">
        {name}
      </Text>
    </GridItem>
  );
}

const IllustrationPreview = ({ src }: { src: IllustrationPath } ) => {
  const toast = useToast();
  const { onCopy } = useClipboard(`<Illustration path="${src}" />`);

  return (
    <GridItem
      sx={{ '& > svg': { boxSize: '30px' } }}
      alignItems="center"
      flexDir="column"
      display="flex"
      p={2}
      bg="whiteAlpha.400"
      borderRadius="md"
      shadow="base"
      _hover={{
        bg: 'whiteAlpha.500',
      }}
      cursor="pointer"
      colSpan={1}
      onClick={() => {
        onCopy();
        toast({
          title: `Copied "<Illustration src="${src}" />" to clipboard!`,
          status: 'success',
          duration: 2000,
          isClosable: true,
        });
      }}
    >
      <Illustration src={src} />
      <Text mt={2} fontSize="xx-small" textAlign="center">
        {src}
      </Text>
    </GridItem>
  );
}

export default function Home() {
  return (
    <>
      <Heading>Icons:</Heading>
      <Grid gap={4} templateColumns="repeat(5, 1fr)" pb={6} color="black" _dark={{ color: 'white' }}>
        {icons.map((name) => (
          <IconPreview name={name} key={name} />
        ))}
      </Grid>
      <Heading>Illustrations:</Heading>
      <Grid gap={4} templateColumns="repeat(5, 1fr)" pb={6} color="black" _dark={{ color: 'white' }}>
        {illustrations.map((src) => (
          <IllustrationPreview src={src} key={src} />
        ))}
      </Grid>
    </>
  )
}
