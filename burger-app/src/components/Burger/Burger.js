import React from 'react'

import BurgerIngredient from './BurgerIngredient/BurgerIngredient'
import classes from './Burger.module.css';

const burger = (props) => {
    
    let burgerIngredients = Object.keys(props.ingredients)
        .map(ingredientType => 
            [...Array(props.ingredients[ingredientType])]
                .map((_, countOfIngredient) =>
                    <BurgerIngredient key={ingredientType + countOfIngredient} type={ingredientType} />
                )
        ).reduce((arr, currentValue) => arr.concat(currentValue));
        
        if (burgerIngredients.length === 0) { 
            burgerIngredients = <p>Please start adding ingredients!</p>;
        }

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"></BurgerIngredient>
            {burgerIngredients}
            <BurgerIngredient type="bread-bottom"></BurgerIngredient>
        </div>
    );
};

export default burger;