import { type HTMLChakraProps, chakra, forwardRef } from '@chakra-ui/react';

import type { IllustrationPath } from '../../../../.fanta/types/illustration-path';

export interface IllustrationProps extends Omit<HTMLChakraProps<'img'>, 'src'> {
	src: IllustrationPath;
	svg?: boolean;
}

export const Illustration = forwardRef<IllustrationProps, 'img'>((props, ref) => (
	<chakra.img ref={ref} {...props} />
));

export interface SvgIllustrationProps extends Omit<HTMLChakraProps<'image'>, 'href'> {
	href: IllustrationPath;
}

export const SvgIllustration = forwardRef<SvgIllustrationProps, 'image'>((props, ref) => (
	<chakra.image ref={ref} {...props} />
));
