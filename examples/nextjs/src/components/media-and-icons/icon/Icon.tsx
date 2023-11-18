import { type HTMLChakraProps, chakra, forwardRef } from '@chakra-ui/react';
import type { PropsWithChildren } from 'react';

import type { IconName } from 'types/icon-name';

import { Use } from './elements/Use';

export interface IconProps extends HTMLChakraProps<'svg'> {
	name: IconName;
}

export const Icon = forwardRef<PropsWithChildren<IconProps>, 'svg'>(
	({ children, name, ...rest }, ref) => {
		return (
			<chakra.svg ref={ref} {...rest}>
				<Use name={name} />
				{children}
			</chakra.svg>
		);
	}
);
