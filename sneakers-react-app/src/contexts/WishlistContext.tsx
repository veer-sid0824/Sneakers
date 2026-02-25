import React, { createContext, useContext, useState, useEffect } from 'react';

export interface WishlistItem {
    id: string | number;
    name: string;
    price: number;
    image: string;
    brand?: string;
    isRare?: boolean;
    type: 'sneaker' | 'shoe' | 'player';
    playerId?: string | number;
    position?: string;
    team?: string;
}

interface WishlistContextType {
    wishlist: WishlistItem[];
    addToWishlist: (item: WishlistItem) => void;
    removeFromWishlist: (id: string | number, type: 'sneaker' | 'shoe' | 'player') => void;
    isInWishlist: (id: string | number, type: 'sneaker' | 'shoe' | 'player') => boolean;
    toggleWishlist: (item: WishlistItem) => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [wishlist, setWishlist] = useState<WishlistItem[]>(() => {
        const saved = localStorage.getItem('sneakers_wishlist');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('sneakers_wishlist', JSON.stringify(wishlist));
    }, [wishlist]);

    const addToWishlist = (item: WishlistItem) => {
        setWishlist(prev => {
            if (prev.some(i => i.id === item.id && i.type === item.type)) return prev;
            return [...prev, item];
        });
    };

    const removeFromWishlist = (id: string | number, type: 'sneaker' | 'shoe' | 'player') => {
        setWishlist(prev => prev.filter(item => !(item.id === id && item.type === type)));
    };

    const isInWishlist = (id: string | number, type: 'sneaker' | 'shoe' | 'player'): boolean => {
        return wishlist.some(item => item.id === id && item.type === type);
    };

    const toggleWishlist = (item: WishlistItem) => {
        if (isInWishlist(item.id, item.type)) {
            removeFromWishlist(item.id, item.type);
        } else {
            addToWishlist(item);
        }
    };

    return (
        <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist, toggleWishlist }}>
            {children}
        </WishlistContext.Provider>
    );
};

export const useWishlist = () => {
    const context = useContext(WishlistContext);
    if (context === undefined) {
        throw new Error('useWishlist must be used within a WishlistProvider');
    }
    return context;
};
