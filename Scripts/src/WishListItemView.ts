import { MobxLitElement } from '@adobe/lit-mobx';
import { css, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { IWishListItem, WishList } from './WishList';

const itemsRow = ({ name, price, image }: IWishListItem) =>
html`
<tr>
<td>${name}</td>
<td>${price}</td>
<td><img src='${image}' style="width:50%; height:50%;"></td>
</tr>
`;

const itemTable = (items: IWishListItem[] = []) =>
    html`
    <table>
        <thead>
            <th>Name</th>
            <th>Price</th>
            <th>Image</th>
        </thead>
    
        <tbody>
            ${items.map(itemsRow)}
        </tbody>
    </table>
    <br /><br />
    `;

@customElement('wish-list-item-view')
export class WishListView extends MobxLitElement {

    giftList = WishList.create();
    
    firstUpdated = () => {
        this.giftList.load();
    }

    render = () =>
        (this.giftList)
        ? itemTable(this.giftList.items)
        : 'Loading';
}