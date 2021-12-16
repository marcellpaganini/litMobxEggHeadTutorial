import { types } from "mobx-state-tree"

const data = {
    "name": "Chronicles of Narnia Box Set = C.S. Lewis",
    "price": 28.73,
    "image": "https://th.bing.com/th/id/OIP.o_fY1oEjb3q3ysiNikMRHQHaHa?w=212&h=212&c=7&r=0&o=5&pid=1.7"
}

export const WishListItem = types.model({
    name: types.string,
    price: types.number,
    image: ""
})