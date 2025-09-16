import {forwardRef } from 'react';

const Input = forwardRef(function Input({
    type = 'text',
    className = '',
    error = false,
    ...props
}, ref) {
    const baseClasses = 'block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-1 sm:text-sm transition-colors duration-200 bg-white text-gray-900';

    const errorClasses = error
        ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
        : 'border-gray-300 focus:ring-purple-500 focus:border-purple-500';

    const classes = `${baseClasses} ${errorClasses} ${className}`;

    return (
        <input
            {...props}
            type={type}
            className={classes}
            ref={ref}
    />
  );
});

export default Input;
