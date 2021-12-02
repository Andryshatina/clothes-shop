import React from "react";
import SHOP_DATA from "./shop.data";

import CollectionPreview from "../collection-preview/collection-preview.component";

class ShopPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            collections: SHOP_DATA
        }
    }

    render() {
        const collection = this.state.collections
        return (
            <div className='shop-page'>
                {
                    collection.map(({id, ...otherProps}) => (
                        <CollectionPreview key={id} {...otherProps}/>
                    ))
                }
            </div>
        );
    }
}

export default ShopPage