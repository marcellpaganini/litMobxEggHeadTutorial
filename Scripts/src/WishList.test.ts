import { IWishList, IWishListItem, WishList, WishListItem } from "./WishList"
import { getSnapshot, onSnapshot, onPatch } from "mobx-state-tree"
import { reaction } from "mobx"

it("can create an instance of a model", () => {
    const item = WishListItem.create({
        "name": "Chronicles of Narnia Box Set = C.S. Lewis",
        "price": 28.73
    })

    expect(item.price).toBe(28.73)
    expect(item.image).toBe("")

    item.changeName("Narnia")
    expect(item.name).toBe("Narnia")
})

it("can create a wishlist", () => {
    const list = WishList.create ({
        items: [
            {
                "name": "Chronicles of Narnia Box Set = C.S. Lewis",
                "price": 28.73
            }
        ]
    })

    expect(list.items.length).toBe(1)
    expect(list.items[0].price).toBe(28.73)
})

//Typescript complained about not having the changeSomething actions in the snapshot. Solution: 
//https://stackoverflow.com/questions/55729742/react-typescript-argument-of-type-x-number-any-is-not-assignable-to
it("can add new items", () => {
    const list = WishList.create()
    
    const states: any[] = []
    onSnapshot(list, snapshot => {
        states.push(snapshot)
    })
    
    list.add({
        name: "Chesterton",
        price: 10,
        image: "",
    } as Pick<IWishListItem, keyof IWishListItem>)

    expect(list.items.length).toBe(1)
    expect(list.items[0].name).toBe("Chesterton")
    list.items[0].changeName("Book of G.K Chesterton")
    expect(list.items[0].name).toBe("Book of G.K Chesterton")

    expect(getSnapshot(list)).toEqual({
        items: [
            {
                name: "Book of G.K Chesterton",
                price: 10,
                image: ""
            }
        ]
    })

    //Instead of using getSnapshot(object).toEqual(). It will write the snapshot in a new file.
    expect(getSnapshot(list)).toMatchSnapshot()

    //Even better, using onSnapshot(), create 'states' array(line 36) and add all state throughout the test.
    expect(states).toMatchSnapshot()
})

it("can add new items - 2", () => {
    const list = WishList.create()
    
    const patches: any[] = []
    onPatch(list, patch => {
        patches.push(patch)
    })
    
    list.add({
        name: "Chesterton",
        price: 10,
        image: "",
    } as Pick<IWishListItem, keyof IWishListItem>)

    list.items[0].changeName("Book of G.K Chesterton")

    //Checking for all mutations in the array.
    expect(patches).toMatchSnapshot()
})

it("can calculate the total price of a wishlist", () => {
    const list = WishList.create({
        items: [
            {
                name: "Machine Gun Preacher",
                price: 7.35,
                image: "https://th.bing.com/th/id/OIP.azTIy-2FaB6OTNK4kjecQwHaJd?w=204&h=260&c=7&r=0&o=5&pid=1.7"
            },
            {
                name: "Lego Mindstorms EV3",
                price: 349.95,
                image: "https://th.bing.com/th/id/OIP.K4faDnuviogJ21DdMUq57gHaHa?w=192&h=192&c=7&r=0&o=5&pid=1.7"
            }

        ]
    })

    expect(list.totalPrice).toBe(357.3)

    //Mobx Reaction will listen to some observable data and call a callback whenever it changes.
    let changed = 0
    reaction(() => list.totalPrice, () => changed++)

    expect(changed).toBe(0)
    console.log(list.totalPrice)
    list.items[0].changeName("Test")
    expect(changed).toBe(0)
    list.items[0].changePrice(10)
    expect(changed).toBe(1)

})
