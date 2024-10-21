import { createContext, useState } from "react";
import { createHashRouter, RouterProvider } from "react-router-dom";
import Landing from "./Landing";
import Store from "./Store";
import { WarriorDetails } from "../interfaces/warrior";


export const CartContext = createContext<CartContext | null>(null)

export interface CartItem {
  itemDetails: WarriorDetails
  quantity: number
}

export interface CartContext {
  cart: CartItem[]
  addItem: (item: WarriorDetails) => void
  removeItem: (number: Number) => void
  deleteItem: (number: Number) => void
}

const router = createHashRouter([
  {
    path: "/",
    element: <Landing />
  },
  {
    path: "store",
    element: <Store />
  },
])

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addItem = (item: WarriorDetails) => {
    setCart( prevCart => {
        if (prevCart.some(cartItem => cartItem.itemDetails == item)) {
          return prevCart.map(cartItem => {
            if (cartItem.itemDetails == item) {
              return {
                ...cartItem,
                quantity: cartItem.quantity + 1
              }
            } else {
              return cartItem
            }
          })
        } else {
          return [
            ...prevCart, 
            {
              itemDetails: item,
              quantity: 1
            }
          ]
        }
      }
    )
  }

  const removeItem = (number: Number) => {
    setCart( prevCart => {
      if (prevCart.some(cartItem => cartItem.itemDetails.number == number)) {
        const item = prevCart.find(cartItem => cartItem.itemDetails.number == number)
        if(item && item.quantity > 1) {
          return prevCart.map(cartItem => {
            if (cartItem == item) {
              return {
                ...cartItem,
                quantity: cartItem.quantity - 1
              }
            } else {
              return cartItem
            }
          })
        } else {
          return prevCart.filter( item => item.itemDetails.number != number)
        }
      } else {
        return prevCart
      }
    }
  )
  }

  const deleteItem = (number: Number) => {
    setCart( prevCart =>
      prevCart.filter( item => item.itemDetails.number != number)
    )
  }

  return(
    <CartContext.Provider 
      value={{
        cart, 
        addItem, 
        removeItem,
        deleteItem
      }}
    >
      <RouterProvider router={router} />
    </CartContext.Provider>
  )
}