import React from 'react';

import classes from './Order.module.css';

const Order = (props) => {
    const ingredients = [];

    for (let ingredientName in props.ingredients) {
        ingredients.push({
            name: ingredientName,
            amount: props.ingredients[ingredientName]
        })
    }

    const ingredientsOutput = ingredients.map(ig => {
        return <span style={{
            textTransform: 'capitalize', 
            display: 'inline-block',
            border: '1px solid #ccc',
            margin: '0 8px',
            padding: '5px'}} key={ig.name} >{ig.name} ({ig.amount}x)</span>
    })

    return (
        <div className={classes.Order}>
        <p>{ingredientsOutput}</p>
            <p>Price: <strong>EUR {props.price}</strong></p>
        </div>);
}

export default Order;