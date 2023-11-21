'use client'
import { Grid, GridItem, Text, useClipboard, useToast } from "@chakra-ui/react";

import { icons } from "../../.fanta/icons";
import { Icon } from "@/components/media-and-icons/icon/Icon";
import { IconName } from "../../.fanta/types/icon-name";

const IconPreview = ({ name }: { name: IconName } ) => {
  const toast = useToast();
  const { onCopy } = useClipboard(`<Icon name="${name}" />`);

  return (
    <GridItem
      key={name}
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

export default function Home() {
  return (
    <Grid gap={4} templateColumns="repeat(5, 1fr)" pb={6} color="black" _dark={{ color: 'white' }}>
      {icons.map((name) => (
        <IconPreview name={name} key={name} />
      ))}
    </Grid>
  )
}
