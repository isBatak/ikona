import { type HTMLChakraProps, chakra, forwardRef } from '@chakra-ui/react';
import type { PropsWithChildren } from 'react';

import type { IconName } from '../../../../.fanta/types/icon-name';
import { hash } from '../../../../.fanta/hash';

export interface IconProps extends HTMLChakraProps<'svg'> {
	name: IconName;
}

export const Icon = forwardRef<PropsWithChildren<IconProps>, 'svg'>(
	({ children, name, ...rest }, ref) => {
		return (
			<chakra.svg ref={ref} {...rest}>
				<use href={`/icons/sprite.${hash}.svg#${name}`} />
				{children}
			</chakra.svg>
		);
	}
);
