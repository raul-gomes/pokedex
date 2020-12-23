import { info } from 'node-sass';
import state from './state';

export default {
	get pokemonsInfo() {
		return state.list.map(infor => ({
			id: info.id,
			name: info.name,
			type: info.types.map(({ type }) => type.name),
			sprite: info.sprite.front_default || 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png',
		}));
	},
};