import { cn } from '@/shared/lib/cn';
import { NavLink } from 'react-router-dom';

const items = [
    { label: 'Statistics', to: '/statistics' },
    { label: 'Build team', to: '/build-team' },
];

export const Navigation = () => {
    return (
        <nav className="flex items-center gap-2">
            {items.map((item) => (
                <NavLink
                    key={item.to}
                    to={item.to}
                    className={({ isActive }) =>
                        cn(
                            'relative flex items-center px-3 py-2 text-sm font-medium transition-colors',
                            isActive
                                ? 'text-foreground'
                                : 'text-muted-foreground hover:text-foreground',
                        )
                    }
                >
                    {({ isActive }) => (
                        <>
                            {item.label}

                            {isActive && (
                                <span className="absolute bottom-0 left-0 h-0.5 w-full bg-red-600" />
                            )}
                        </>
                    )}
                </NavLink>
            ))}
        </nav>
    );
};
