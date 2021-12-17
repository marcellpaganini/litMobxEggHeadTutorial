import { IWishList, IWishListItem, WishList, WishListItem } from "./WishList"
import { getSnapshot, onSnapshot } from "mobx-state-tree"

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
    list.add({
        name: "Chesterton",
        price: 10,
        image: "",
    } as Pick<IWishListItem, keyof IWishListItem>)
    /*const states: any[] = []
    onSnapshot(list, snapshot => {
        states.push(snapshot)
    })*/

    

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
    //expect(states).toMatchSnapshot()
})