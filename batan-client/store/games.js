import Vue from 'vue'

function reviver(key, value) {
  if (typeof value === 'object' && value !== null) {
    if (value.dataType === 'Map') {
      return new Map(value.value)
    }
  }
  return value
}

function parseJson(str) {
  return JSON.parse(str, reviver)
}

export const state = () => ({
  available_games: {},
  active_games: {},
  active_game: '',
  alert: false,
  awaiting_game_creation: false,
});

export const mutations = {

  changeGame(state, new_active_game) {
    if (new_active_game === '') {
      state.active_game = '';
    } else if (Object.keys(state.active_games).includes(String(new_active_game.game_id))){
      state.active_game = new_active_game;
    }
  },
  created(state, game) {
    // Updates available_games by overwriting game
    if (!game.started) {
      Vue.set(state.available_games, game.game_id, game);
    } else {
      if (Object.keys(state.available_games).includes(String(game.game_id))) {
        Vue.delete(state.available_games, game.game_id);
      }
    }
  },
  active(state, game) {
    // TODO: Permit partial updates -- Challenge: potentially complex w/ Vue reactivity
    game.game_info.board = parseJson(game.game_info.board);
    // The below line may be needed in case Map in obj is not updated reactively by Vue
    // game.game_info.board.roadsMap = Object.fromEntries(game.game_info.board.roadsMap);
    Vue.set(state.active_games, game.game_id, game);
    if (state.active_game == '') {
      state.active_game = game;
    }
    state.alert = false;
    for(let index of Object.keys(state.active_games)){

      if(state.active_games[index].alerts == true){
        state.alert = true;
      }
    }
  },
  manualRmEndedGame(state, game_id) {
    if (Object.keys(state.active_games).includes(String(game_id))) {
      Vue.delete(state.active_games, game_id);
    }
  },
  joined(state, game) {
    // courtesy notice, no action taken until game is started
    // can maybe be listened for in snackbar?
    console.log(`You successfully joined the game.. ${game.game_id}`)
  },
  actionFailed(state, data) {
    // courtesy notice, no action taken
    // can maybe be listened for in snackbar?
    console.log(data.description);
  },
  turnStart(state, data) {
    console.log(data);
  },

}

export const actions = {
  manualRmEndedGame (context, game_id) {
    // ONLY CALL AFTER GAME ENDED (WINNER !== 0)
    if (Object.keys(context.state.active_games).includes(String(game_id))) {
      setTimeout( () => {
        context.commit('manualRmEndedGame', game_id);
        // Find new active game (if not none)
        let keys = Object.keys(context.state.active_games);
        if (keys.length > 0) {
          context.commit('changeGame', context.state.active_games[keys[0]]);
        } else  {
          context.state.alert = false;
          context.commit('changeGame', '');
        }
      }, 0);
    }
    this.$router.push({
      path: '/lobby'
    });
  }
}
