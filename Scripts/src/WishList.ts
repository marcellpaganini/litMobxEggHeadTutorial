import { Instance, types } from "mobx-state-tree"

const data = {
    "name": "Chronicles of Narnia Box Set = C.S. Lewis",
    "price": 28.73,
    "image": "https://th.bing.com/th/id/OIP.o_fY1oEjb3q3ysiNikMRHQHaHa?w=212&h=212&c=7&r=0&o=5&pid=1.7"
}

export const WishListItem = types.model({
    name: types.string,
    price: types.number,
    image: ""
}).actions(self => ({
    changeName(newName: string) {
        self.name = newName
    },

    changePrice(newPrice: number) {
        self.price = newPrice
    },

    changeImage(newImage: string) {
        self.image = newImage
    }
})) 

type IWishListItem = Instance<typeof WishListItem>  

export const WishList = types.model({
    items: types.array(WishListItem)
}).actions(self => ({
    add(item: IWishListItem) {
        self.items.push(item)
    }
}))