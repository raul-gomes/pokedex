import PokeAPI from '@/services/pokeapi';

import state from './state';
import mutations from './mutations';

export default {
	async getPokemons(){
		const {
			setList,
			setIsPokemonSearch,
			setPokemonSearched,
			setListError,
			setListHasNext,
			setListCompleted,
			updateOffset,
		} = mutations;

		try {
			setIsPokemonSearch(false);
			setListError(false);

			const pokemonList = await PokeAPI.getPokemons({ limit: state.limit, offset: state.offset });

			if (pokemonList?.result?.length) {
				const prepareInfo = pokemonList.results.map(item => PokeAPI.getPokemonByName(item.name));
				const pokemonsInfo = await Promise.all(prepareInfo);

				setList(pokemonsInfo);
			}

			if (pokemonList?.next){
				setListHasNext(true);
				updateOffset();
			} else {
				setListHasNext(false);
				setListCompleted(true);
			}
			
		} catch (error) {
			setListError(true);
		}
	},

	async getPokemonByName(name){
		const { setIsPokemonSearch } = mutations

		const pokemon = await PokeAPI.getPokemonByName(name)

		if (pokemon) {
			setPokemonSearched(pokemon)
		}
	},

	async searchPokemon(name){
		const {
			setIsPokemonSearch,
			setIsSearching,
			setPokemonSearched,
			setSearchHasError,
			resetList,
		} = mutations;

		if (!name) {
			resetList();
		}

		try {
			setSearchHasError(false);
			setIsSearching(true);
			setIsPokemonSearch(true);

			const pokemon = state.list.find(info => info.name.toLowerCase() === name.toLowerCase());

			if (pokemon){
				setPokemonSearched(pokemon);
				return;
			}

			await this.getPokemonByName(name);
		}catch (error) {
			setSearchHasError(true);
		} finally {
			setIsSearching(false);
		}
	},
};