import { Grid, GridItem, Img, Text, useClipboard, useToast } from '@chakra-ui/react';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
	title: 'atoms/Illustration',
} as Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// [START] - storybook-illustrations-generator
const illustrations = {
	attention: '/illustrations/attention.svg',
	book: '/illustrations/book.svg',
	certificate: '/illustrations/certificate.svg',
	clock: '/illustrations/clock.svg',
	brazil: '/illustrations/countries/brazil.svg',
	portugal: '/illustrations/countries/portugal.svg',
	spain: '/illustrations/countries/spain.svg',
	'united-states': '/illustrations/countries/united-states.svg',
	btc: '/illustrations/currencies/btc.svg',
	doge: '/illustrations/currencies/doge.svg',
	eth: '/illustrations/currencies/eth.svg',
	eur: '/illustrations/currencies/eur.svg',
	gc: '/illustrations/currencies/gc.svg',
	ltc: '/illustrations/currencies/ltc.svg',
	sc: '/illustrations/currencies/sc.svg',
	trx: '/illustrations/currencies/trx.svg',
	usd: '/illustrations/currencies/usd.svg',
	usdt: '/illustrations/currencies/usdt.svg',
	xrp: '/illustrations/currencies/xrp.svg',
	email: '/illustrations/email.svg',
	flag: '/illustrations/flag.svg',
	'chart-logo-active': '/illustrations/games/chart-logo-active.svg',
	'chart-logo-default': '/illustrations/games/chart-logo-default.svg',
	'crash-logo-active': '/illustrations/games/crash-logo-active.svg',
	'crash-logo-default': '/illustrations/games/crash-logo-default.svg',
	'dice-logo-active': '/illustrations/games/dice-logo-active.svg',
	'dice-logo-default': '/illustrations/games/dice-logo-default.svg',
	'hilo-logo-active': '/illustrations/games/hilo-logo-active.png',
	'hilo-logo-default': '/illustrations/games/hilo-logo-default.png',
	'hiloplus-logo-active': '/illustrations/games/hiloplus-logo-active.png',
	'hiloplus-logo-default': '/illustrations/games/hiloplus-logo-default.png',
	'limbo-logo-active': '/illustrations/games/limbo-logo-active.svg',
	'limbo-logo-default': '/illustrations/games/limbo-logo-default.svg',
	'roulette-logo-active': '/illustrations/games/roulette-logo-active.png',
	'roulette-logo-default': '/illustrations/games/roulette-logo-default.png',
	'whenmoonbro-logo-active': '/illustrations/games/whenmoonbro-logo-active.svg',
	'whenmoonbro-logo-default': '/illustrations/games/whenmoonbro-logo-default.svg',
	'wof-logo-active': '/illustrations/games/wof-logo-active.svg',
	'wof-logo-default': '/illustrations/games/wof-logo-default.svg',
	'glasses-glossy': '/illustrations/glasses-glossy.svg',
	globe: '/illustrations/globe.svg',
	'gold-coins': '/illustrations/gold-coins.svg',
	'heart-social': '/illustrations/heart-social.svg',
	key: '/illustrations/key.svg',
	lightning: '/illustrations/lightning.svg',
	logo: '/illustrations/logos/logo.svg',
	logo_square: '/illustrations/logos/logo_square.svg',
	'metamask-logo': '/illustrations/metamask-logo.svg',
	'money-bag': '/illustrations/money-bag.svg',
	money: '/illustrations/money.svg',
	reveal: '/illustrations/reveal.svg',
	'slider-thumb': '/illustrations/slider-thumb.svg',
	slot: '/illustrations/slot.svg',
	'wallet-connect-logo': '/illustrations/wallet-connect-logo.svg',
	'wallet-glossy': '/illustrations/wallet-glossy.svg',
};
// [END] - storybook-illustrations-generator

const template = (name: string, src: string) => `<img src="${src}" alt="${name}" />`;

const Illustration = ({ name, src }: { name: string; src: string }) => {
	const toast = useToast();
	const { onCopy } = useClipboard(template(name, src));

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
					title: `Copied ${template(name, src)} to clipboard!`,
					status: 'success',
					duration: 2000,
					isClosable: true,
				});
			}}
		>
			<Img key={name} boxSize="8" alt={name} src={src} />
			<Text mt={2} fontSize="xx-small" textAlign="center">
				{name}
			</Text>
		</GridItem>
	);
};

interface NestedObject {
	[key: string]: string | NestedObject;
}
const generateIllustrations = (illustrations: NestedObject) => {
	return (
		<Grid gap={4} templateColumns="repeat(5, 1fr)" pb={6} color="black" _dark={{ color: 'white' }}>
			{Object.entries(illustrations).map(([name, src]) => {
				if (typeof src === 'object') {
					return generateIllustrations(src);
				}

				return <Illustration key={name} name={name} src={src} />;
			})}
		</Grid>
	);
};

export const Collection: Story = {
	render: () => {
		return generateIllustrations(illustrations);
	},
};
