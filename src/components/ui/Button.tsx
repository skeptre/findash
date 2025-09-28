import { ComponentProps } from 'react';

type ButtonProps = ComponentProps<'button'>;

export const Button = ({ children, ...props }: ButtonProps) => {
    return (
        <button
            className="w-full rounded-md bg-white px-3 py-2 text-black font-semibold transition-colors hover:bg-neutral-200"
            {...props}
        >
            {children}
        </button>
    );
};