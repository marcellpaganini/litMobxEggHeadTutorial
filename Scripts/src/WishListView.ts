import { MobxLitElement } from '@adobe/lit-mobx';
import { css, html } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('wish-list-view')
export class WishListView extends MobxLitElement {
    render = () =>
        html`
            <div style="background-color: lightblue; padding: 2%;">
            <h1>Mobx-Lit page rendered!</h1> 
            <h3>Wish List View</h3>
            </div>
        `;
}