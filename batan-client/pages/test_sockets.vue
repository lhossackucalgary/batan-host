<!-- For testing sockets & APIs only.. delete before production -->

<template lang="html">
<div v-if="$auth.loggedIn" class="">
  <b-button @click.prevent="newGame('game name here')" size="md" variant="dark">New game</b-button>
  <b-button @click.prevent="joinGame()" size="md" variant="dark">Join game</b-button>
  <b-button @click.prevent="startGame()" size="md" variant="dark">Start game</b-button>
  <br>  <br>
  <b-row>
    <b-col sm="2">
      <label>game id</label>
    </b-col>
    <b-col sm="2">
      <b-form-input :type="`number`" v-model="game_id"></b-form-input>
    </b-col>
  </b-row>
  <br>  <br>

  <b-row>
    <b-col sm="3">
      <label>settlement vertex</label>
    </b-col>
    <b-col sm="2">
      <b-form-input :type="`number`" v-model="settlementVertex"></b-form-input>
    </b-col>
  </b-row>
  <b-row>
    <b-col sm="3">
      <label>road start vert</label>
    </b-col>
    <b-col sm="2">
      <b-form-input :type="`number`" v-model="roadStartVert"></b-form-input>
    </b-col>
    <b-col sm="2">
      <label>road end vert</label>
    </b-col>
    <b-col sm="2">
      <b-form-input :type="`number`" v-model="roadEndVert"></b-form-input>
    </b-col>
  </b-row>
  <b-button @click.prevent="placeSettle()" size="md" variant="dark">place settlement</b-button>
  <b-button @click.prevent="placeRoad()" size="md" variant="dark">place road</b-button>
  <b-button @click.prevent="buySettlement()" size="md" variant="dark">buy settle</b-button>
  <b-button @click.prevent="buyCity()" size="md" variant="dark">buy city</b-button>
  <b-button @click.prevent="buyRoad()" size="md" variant="dark">buy road</b-button>
  <b-button @click.prevent="buyDev()" size="md" variant="dark">buy dev</b-button>
  <br> <br>
  <b-row>
    <b-col sm="2">
      <label>to bank:</label>
    </b-col>
    <b-col sm="2">
      <b-form-input :type="`number`" v-model="tobank"></b-form-input>
    </b-col>
    <b-col sm="2">
      <label>from bank:</label>
    </b-col>
    <b-col sm="2">
      <b-form-input :type="`number`" v-model="frombank"></b-form-input>
    </b-col>
  </b-row>
  <b-button @click.prevent="tradeBank()" size="md" variant="dark">Trade w/ bank</b-button>
  <br>  <br>
  <b-button @click.prevent="rollDice()" size="md" variant="dark">roll dice</b-button>
  <p>{{ dice }}</p>
  <br>  <br>
  <b-button @click.prevent="moveRobber()" size="md" variant="dark">mv robber</b-button>
  <br>  <br>
  <b-button @click.prevent="endTurn()" size="md" variant="dark">end turn</b-button>
  <br>  <br>
  <div class="">
    <h3>Admin</h3>
    <b-row>
      <b-col sm="4">
        <label>timeout (seconds)</label>
      </b-col>
      <b-col sm="2">
        <b-form-input :type="`number`" v-model="timeout_s"></b-form-input>
      </b-col>
      <b-col sm="2">
        <b-button @click.prevent="set_timeout_length()" size="md" variant="dark">set timeout</b-button>
      </b-col>
    </b-row>
    <b-row>
      <b-col sm="4">
        <b-form-checkbox v-model="skip_offline" name="check-button" switch>
          Skip offline players
        </b-form-checkbox>
      </b-col>
    </b-row>
    <b-row>
      <b-col sm="2">
        <label>Boot player #</label>
      </b-col>
      <b-col sm="2">
        <b-form-input :type="`number`" v-model="toboot_alias"></b-form-input>
      </b-col>
      <b-col sm="2">
        <b-button @click.prevent="boot_player()" size="md" variant="dark">boot</b-button>
      </b-col>
    </b-row>

  </div>

  <br>  <br>
  <div class="">
    <h3>Cheat Menu (acquire cards) <b-button @click.prevent="cheat_cards()" size="md" variant="dark">Get Cards</b-button></h3>
    <b-row>
      <b-col sm="2">
        <label>sheep</label>
      </b-col>
      <b-col sm="2">
        <b-form-input :type="`number`" v-model="cheat_sheep"></b-form-input>
      </b-col>
      <b-col sm="2">
        <label>wheat</label>
      </b-col>
      <b-col sm="2">
        <b-form-input :type="`number`" v-model="cheat_wheat"></b-form-input>
      </b-col>
      <b-col sm="2">
        <label>wood</label>
      </b-col>
      <b-col sm="2">
        <b-form-input :type="`number`" v-model="cheat_wood"></b-form-input>
      </b-col>
    </b-row>
    <b-row>
      <b-col sm="2">
        <label>ore</label>
      </b-col>
      <b-col sm="2">
        <b-form-input :type="`number`" v-model="cheat_ore"></b-form-input>
      </b-col>
      <b-col sm="2">
        <label>brick</label>
      </b-col>
      <b-col sm="2">
        <b-form-input :type="`number`" v-model="cheat_brick"></b-form-input>
      </b-col>
    </b-row>
  </div>

  <br> <br>
  <b-button @click.prevent="$store.dispatch('games/manualRmEndedGame', 0)" size="md" variant="dark">rm active game</b-button>

  <br> <br>
  <div class="">
    <h3>Adding fake games</h3>
    <b-row>
      <b-col>
        <label>gameId</label>
        <b-form-input :type="`number`" v-model="fake_game.gameId"></b-form-input>
      </b-col>

      <b-col>
        <label>gameName</label>
        <b-form-input :type="`string`" v-model="fake_game.gameName"></b-form-input>
      </b-col>

      <b-col>
        <label>numPlayers</label>
        <b-form-input :type="`number`" v-model="fake_game.numPlayers"></b-form-input>
      </b-col>

      <b-col>
        <label>playerWon</label>
        <b-form-input :type="`boolean`" v-model="fake_game.playerWon"></b-form-input>
      </b-col>
    </b-row>

    <b-button @click.prevent="addUserGame" variant="success">Send that bad boi</b-button>
  </div>
</div>
</template>

<script>
import Vue from 'vue';

export default Vue.extend({
  name: "TestSockets",
  data() {
    return {
      game_id: 0,
      settlementVertex: 0,
      roadStartVert: 0,
      roadEndVert: 1,
      dice: 0,
      tobank: 1,
      frombank: 2,
      cheat_sheep: 5,
      cheat_wheat: 5,
      cheat_wood: 5,
      cheat_ore: 5,
      cheat_brick: 5,
      timeout_s: 10,
      skip_offline: false,
      toboot_alias: 2,
      fake_game : {
        gameId: 0,
        date: 0,
        gameName: "",
        numPlayers: 0,
        playerWon: false,
        playerSettlements: 0,
        playerCities: 0,
        playerRoads: 0,
        playerResourceCards: 0,
        playerVictoryPoints: 0,
        playerLargestArmy: false,
        playerLongestRoad: false,
      },
    }
  },
  created() {
    if (!this.$auth.loggedIn) {
      this.$router.push({
        path: '/'
      });
    }
  },
  watch: {
    skip_offline() {
      this.$root.socket.emit('game/admin/setSkipIfOffline', {
        game_id: this.game_id,
        skip: this.skip_offline
      });
    }
  },
  methods: {
    boot_player() {
      this.$root.socket.emit('game/admin/boot', {
        game_id: this.game_id,
        bootee: Number(this.toboot_alias)
      });
    },
    set_timeout_length() {
      this.$root.socket.emit('game/admin/settimeout', {
        game_id: this.game_id,
        timeout: this.timeout_s
      });
    },
    moveRobber() {
      this.$root.socket.emit('game/moveRobber', {
        game_id: this.game_id,
        location: 1
      });
    },
    rollDice() {
      this.$root.socket.emit('game/rollDice', {game_id: this.game_id});
    },
    buySettlement() {
      this.$root.socket.emit('game/buySettlement', {
        game_id: this.game_id,
        location: Number(this.settlementVertex),
      })
    },
    buyRoad() {
      this.$root.socket.emit('game/buyRoad', {
        game_id: this.game_id,
        start: Number(this.roadStartVert),
        end: Number(this.roadEndVert)
      })
    },
    buyCity() {
      this.$root.socket.emit('game/buyCity', {
        game_id: this.game_id,
        location: Number(this.settlementVertex),
      })
    },
    buyDev() {
      this.$root.socket.emit('game/buyDevCard', {
        game_id: this.game_id
      })
    },
    placeSettle() {
      this.$root.socket.emit('game/playInitPlaceSettle', {
        game_id: this.game_id,
        settlement: Number(this.settlementVertex)
      })
    },
    placeRoad() {
      this.$root.socket.emit('game/playInitPlaceRoad', {
        game_id: this.game_id,
        road: {
          start: Number(this.roadStartVert),
          end: Number(this.roadEndVert)
        }
      })
    },
    tradeBank() {
      this.$root.socket.emit('game/tradeBank', {game_id: this.game_id, to_bank: Number(this.tobank), from_bank: Number(this.frombank)});
    },
    playDevCard() {
      let opts = {
        destinationHexId: 17, // for army placing robber
        monopolyResource: 3, // resourceType
        targetVertices: [8, 4, 14, 19], // number[] for road builder (list is 4 long, link 0-1, link 2-3)
        yearOfPlentyResources: [1, 2] // resourceType[] length = 2
      }
    },
    endTurn() {
      this.$root.socket.emit('game/endTurn', {game_id: this.game_id});
    },
    cheat_cards() {
      this.$root.socket.emit('game/cheat', {
        game_id: this.game_id,
        cards: {
          sheep: this.cheat_sheep,
          wheat: this.cheat_wheat,
          wood: this.cheat_wood,
          ore: this.cheat_ore,
          brick: this.cheat_brick
        }
      });
    },
    newGame(game_name) {
      this.$root.socket.emit('game/newGame', {game_name: game_name});
    },
    joinGame() {
      this.$root.socket.emit('game/joinGame', {game_id: this.game_id});
    },
    startGame() {
      this.$root.socket.emit('game/startGame', {game_id: this.game_id});
    },
    addUserGame() {
      console.log("here");
      this.$root.socket.emit('test/addGame', {sub: this.$auth.user.sub, game: this.$data.fake_game});
      this.$data.fake_game = {
        gameId: 0,
        date: 0,
        gameName: "",
        numPlayers: 0,
        playerWon: false,
        playerSettlements: 0,
        playerCities: 0,
        playerRoads: 0,
        playerResourceCards: 0,
        playerVictoryPoints: 0,
        playerLargestArmy: false,
        playerLongestRoad: false,
      };
    }
  }
})
</script>

<style lang="css" scoped>
</style>
