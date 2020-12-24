<template>
	<div class="pokemon">
		<ListItem v-bind="mainsInfo" />
		<ul>
			<li v-for="(stat, index) in stats" :key="index">
				{{ parseStatName(stat.stat.name) }}: {{ stat.base_stat }}
			</li>
		</ul>
	</div>
</template>

<script>
import ListItem from '@/components/List/ListItem.vue';
import { state } from '@/store';
import { parsePokemonInfo} from '@/utils';

const statsNames = {
	hp: 'HP',
	attack: 'Attack',
	defense: 'Defense',
	speed: 'Speed',
	'special-attack': 'Sp.atk',
	'special-defense': 'Sp. def',
}

export default {
	name: 'PokemonDescription',
	components: {
		ListItem,
	},
	props: {
		id: {
			type: Number,
			required: true,
		},
	},
	data(){
		return {
			mainsInfo: null,
			stats: [],
		};
	},
	created() {
		const pokemonInfo = state.list.find(pokemon => pokemon.id === this.id);
		
		if (pokemonInfo) {
			const infoParsed = parsePokemonInfo(pokemonInfo);

			const { stats, ...rest} = infoParsed;

			this.mainsInfo = rest;
			this.stats = stats;
		}
	},
	method: {
		parseStatName(name) {
			return statsNames[name] || name;
		},
	},
};
</script>

<style lamg="scss" scoped>
	.stats {
		padding: 0 24px;
	}
</style>