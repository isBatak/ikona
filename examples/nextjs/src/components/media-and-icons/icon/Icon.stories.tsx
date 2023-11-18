import { Grid, GridItem, Text, useClipboard, useToast } from '@chakra-ui/react';
import type { Meta, StoryObj } from '@storybook/react';

import { Icon } from '@ui/components/atoms/icon/Icon';

const meta = {
	title: 'atoms/Icon',
} as Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// [START] - storybook-icons-generator
const icons = [
	'add',
	'arrow-down-lined',
	'arrow-up-lined',
	'arrow-up',
	'attention',
	'blogger',
	'calendar',
	'cancel',
	'cash',
	'chat',
	'checkmark',
	'chevron-down',
	'close-outline-version',
	'close',
	'copy',
	'daily',
	'edit',
	'fairness',
	'games-icon',
	'gift',
	'half',
	'image',
	'infinity',
	'info',
	'jackpot',
	'lock-closed',
	'lock-opened',
	'log-out',
	'max',
	'min',
	'monthly',
	'multiply-twice',
	'network-high',
	'network-low',
	'network-mid',
	'network',
	'password-eye-disabled',
	'password-eye',
	'percent',
	'percent25',
	'percent50',
	'profile',
	'reward',
	'search',
	'settings',
	'skip',
	'slider-bubble',
	'stopwatch',
	'submit',
	'swap',
	'thunder',
	'trash',
	'unavailable',
	'user',
	'wallet',
	'weekly',
	'wine-glasses',
	'withdraw',
] as const;
// [END] - storybook-icons-generator

export const Collection: Story = {
	render: () => (
		<Grid gap={4} templateColumns="repeat(5, 1fr)" pb={6} color="black" _dark={{ color: 'white' }}>
			{icons.map((name) => {
				const toast = useToast();
				const { onCopy } = useClipboard(`<Icon name={${name}} />`);

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
								title: `Copied "<Icon name={${name}} />" to clipboard!`,
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
			})}
		</Grid>
	),
};
