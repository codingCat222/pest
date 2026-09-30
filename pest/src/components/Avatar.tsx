import React from 'react';

interface AvatarProps {
    name?: string;
    src?: string | null;
    className?: string;
}

export function initialsOf(name?: string) {
    if (!name) return '?';
    const parts = name.trim().split(/\s+/).filter(Boolean);
    return ((parts[0]?.[0] ?? '') + (parts.length > 1 ? parts[parts.length - 1][0] : '')).toUpperCase() || '?';
}

export const Avatar: React.FC<AvatarProps> = ({ name, src, className = 'w-8 h-8 text-xs' }) => {
    if (src) {
        return (
            <img
                src={src}
                alt={name ? `${name} profile photo` : 'Profile photo'}
                className={`${className} rounded-full object-cover shrink-0`}
            />
        );
    }
    return (
        <div className={`${className} rounded-full bg-slate-900 text-white font-bold flex items-center justify-center shrink-0`}>
            {initialsOf(name)}
        </div>
    );
};