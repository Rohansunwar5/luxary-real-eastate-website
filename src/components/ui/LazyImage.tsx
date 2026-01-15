import React, { useState, useEffect } from 'react';

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    src: string;
    alt: string;
    priority?: boolean;
    className?: string;
    imgClassName?: string;
    sizes?: string;
}

const LazyImage: React.FC<LazyImageProps> = ({
    src,
    alt,
    priority = false,
    className = "",
    imgClassName = "",
    sizes,
    ...props
}) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [currentSrc, setCurrentSrc] = useState(src);
    const [srcSet, setSrcSet] = useState<string | undefined>(undefined);

    useEffect(() => {
        // Check if it's an Unsplash URL to optimize
        if (src.includes('images.unsplash.com')) {
            const baseUrl = src.split('?')[0];
            const params = new URLSearchParams(src.split('?')[1]);

            const getUrl = (width: number, quality: number = 80) => {
                const newParams = new URLSearchParams(params);
                newParams.set('w', width.toString());
                newParams.set('q', quality.toString());
                newParams.set('auto', 'format');
                return `${baseUrl}?${newParams.toString()}`;
            };

            setSrcSet(`
        ${getUrl(300, 60)} 300w,
        ${getUrl(600, 70)} 600w,
        ${getUrl(900, 75)} 900w,
        ${getUrl(1200, 80)} 1200w,
        ${getUrl(2000, 80)} 2000w
      `);
        } else {
            setSrcSet(undefined);
        }
    }, [src]);

    return (
        <div className={`overflow-hidden relative ${className}`}>
            {/* Placeholder */}
            <div
                className={`absolute inset-0 bg-stone-200 dark:bg-stone-800 transition-opacity duration-700 ease-in-out ${isLoaded ? 'opacity-0' : 'opacity-100'
                    }`}
            />

            <img
                src={currentSrc}
                srcSet={srcSet}
                sizes={sizes || "(max-width: 768px) 100vw, 50vw"}
                alt={alt}
                loading={priority ? 'eager' : 'lazy'}
                decoding={priority ? 'sync' : 'async'}
                // @ts-ignore - React 19 / Modern browsers support fetchpriority but types might lag
                fetchPriority={priority ? 'high' : 'auto'}
                onLoad={() => setIsLoaded(true)}
                className={`transition-opacity duration-700 ease-in-out ${isLoaded ? 'opacity-100' : 'opacity-0'
                    } ${imgClassName}`}
                {...props}
            />
        </div>
    );
};

export default LazyImage;
