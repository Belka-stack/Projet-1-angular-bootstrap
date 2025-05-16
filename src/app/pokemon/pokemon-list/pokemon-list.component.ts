import { Component, computed, inject, signal } from '@angular/core';
import { PokemonService } from '../../pokemon.service';
import { Pokemon } from '../../pokemon.model';
import { PokemonBorderDirective } from '../../pokemon-border.directive';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';


@Component({
  selector: 'app-pokemon-list',
  imports: [PokemonBorderDirective, DatePipe, RouterLink],
  templateUrl: './pokemon-list.component.html',
  styles: `.pokemon-card { cursor: pointer}`,
})
export class PokemonListComponent {
  readonly #pokemonService = inject(PokemonService);
  readonly PokemonList = toSignal(this.#pokemonService.getPokemonList(), {
    initialValue: [],
  });

  readonly searchTerm = signal('');

  readonly pokemonListFiltered = computed(() => { 
    const searchTerm = this.searchTerm();
    const pokemonList = this.PokemonList();

    return pokemonList.filter((pokemon : Pokemon) => pokemon.name.toLowerCase().includes(searchTerm.trim().toLowerCase()))
});

readonly loading = computed(() => this.PokemonList().length === 0);
  
  size(pokemon: Pokemon) {
    if (pokemon.life < 15) {
      return 'Petit';
    }

    if (pokemon.life > 25) {
      return 'Grand';
    }
    
      return 'Moyen';
  }

}

