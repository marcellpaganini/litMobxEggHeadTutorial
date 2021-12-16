import { WishListItem } from "./WishList";

it("can create an instance of a model", () => {
    const item = WishListItem.create({
        "name": "Chronicles of Narnia Box Set = C.S. Lewis",
        "price": 28.73,
        "image": "https://th.bing.com/th/id/OIP.o_fY1oEjb3q3ysiNikMRHQHaHa?w=212&h=212&c=7&r=0&o=5&pid=1.7"
    })

    expect(item.price).toBe(28.73)
})