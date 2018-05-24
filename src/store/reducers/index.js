import { combineReducers } from 'redux';

import BurgerBuilderReducer from './burgerBuilder';
import OrderReducer from './order';

const rootReducer = combineReducers({
    burgerBuilder: BurgerBuilderReducer,
    order: OrderReducer
});

export default rootReducer;
