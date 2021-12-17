import { cast, Instance, types } from "mobx-state-tree"

const data: any[] = [{
    "name": "Chronicles of Narnia Box Set = C.S. Lewis",
    "price": 28.73,
    "image": "https://th.bing.com/th/id/OIP.o_fY1oEjb3q3ysiNikMRHQHaHa?w=212&h=212&c=7&r=0&o=5&pid=1.7"
},
{
    "name": "Golden Necklace",
    "price": 359.99,
    "image": "https://th.bing.com/th/id/OIP.uShNHyQssDhbS3hwYZU7GwHaHa?w=213&h=213&c=7&r=0&o=5&pid=1.7"
},
{
    "name": "Colorful Lamps",
    "price": 22.39,
    "image": "https://th.bing.com/th/id/OIP.djBzghnlt3Sx5mssKCimTwHaHa?w=180&h=180&c=7&r=0&o=5&pid=1.7"
}]


export const WishListItem = types
    .model({
        name: types.string,
        price: types.number,
        image: ""
    })
    .actions(self => ({
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

export const WishList = types
    .model({
        items: types.array(WishListItem)
    })
    .actions(self => ({
        add(item: IWishListItem) {
            self.items.push(item)
        },
        load() {
            self.items = cast(data)
        }
    }))
    .views(self => ({
        get totalPrice() {
            return self.items.reduce((sum, entry) => sum + entry.price, 0)
        }
    }))

export type IWishListItem = Instance<typeof WishListItem>  
export type IWishList = Instance<typeof WishList>  
