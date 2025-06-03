import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';

export default function TextLink({ className = '', children, ...props }) {
    return (
        <Link
            className={cn(
                'text-blue-600 underline underline-offset-4 transition-colors duration-300 ease-out hover:text-blue-950',
                className,
            )}
            {...props}
        >
            {children}
        </Link>
    );
}
