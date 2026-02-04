import { useEffect, useMemo, useState } from 'react'

export function useCart() {
    const [cart, setCart] = useState(() => {
        try {
            const saveCart = localStorage.getItem('cart');
            return saveCart ? JSON.parse(saveCart): [];
        } catch (error) {
            console.error("Failed to Load Cart from local Storage", error);
            return [];
        }
    })
    // Persist cart TO storage;
    useEffect(()=>{
        try {
            localStorage.setItem('cart', JSON.stringify(cart));
        } catch (error) {
            console.error("Failed to save cart to local storage", error);
        }
    },[cart])
    //sync across the tab
    useEffect(()=>{
        const handleStorage = (e) => {
            if(e.key === 'cart'){
                try {
                    const newCart = JSON.parse(e.newValue || '[]')
                    setCart(newCart);
                } catch (error) {
                    console.error("failed to parse Cart from local Storage", error)
                }
            }
        }
        window.addEventListener('storage', handleStorage);
        return(()=>{
            window.removeEventListener('storage', handleStorage);
        })
    },[])

    //add product to cart
    const addToCart = (product) =>{
        setCart(currentCart =>{
            const existingItem = currentCart.find(item => item.id ===product.id)
            if(existingItem){
                return currentCart.map(item => item.id ===product.id?{
                    ...item,quantity: item.quantity + 1
                }:item)
            }
            return [...currentCart, {...product, quantity:1}]
        }
             
        )
    }
    // remove from Cart
    const removecart = (productId) => {
        setCart(currentCart => currentCart.filter(item => item.id !==productId))
    }
    //update to cart
    const updateQuantity = (productId, quantity) =>{ 
        if(quantity < 1) return
        setCart(currentCart => currentCart.map(item => item.id ===productId ? {...item, quantity} : item))
    };
    //useMemo = will only recompute the memoized value when one of the deps has changed.
    const total = useMemo(()=>{
        return Number(cart.reduce((sum, item)=>{
            const itemTotal = item.price * (item.quantity || 0);
            return sum + itemTotal;
        }, 0).toFixed(2))
    }, [cart])
    return {
        cart,
        setCart,
        removecart,
        addToCart,
        updateQuantity,
        total,
    }
  
}
