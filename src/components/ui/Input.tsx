import { ComponentProps } from 'react';

type InputProps = ComponentProps<'input'>;

export const Input = (props: InputProps) => {
    return (
        <input
            className="w-full rounded-md border border-neutral-700 bg-neutral-800 px-3 py-2 text-white placeholder:text-neutral-500 focus:border-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-900 focus:ring-white"
            {...props}
        />
    );
};