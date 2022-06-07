import { Map } from 'immutable'

import * as actionTypes from './constants'

const defaultState = Map({
  playList: [],
  currentSongIndex: 0,
  currentSong: {},
  isPlaying: false
})

function reducer(state = defaultState, action) {
  switch (action.type) {
    case actionTypes.CHANGE_CURRENT_SONG:
      return state.set('currentSong', action.currentSong)
    case actionTypes.CHANGE_PLAY_LIST:
      return state.set('playList', action.playList)
    case actionTypes.CHANGE_CURRENT_SONG_INDEX:
      return state.set('currentSongIndex', action.index)
    case actionTypes.CHANGE_TO_PLAY_OR_PAUSE:
      return state.set('isPlaying', action.isPlaying)
    default:
      return state
  }
}

export default reducer
