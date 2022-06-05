import * as actionTypes from './constants'

import { getSongDetail } from '@/services/player'

export const changeCurrentSongAction = (songs) => ({
  type: actionTypes.CHANGE_CURRENT_SONG,
  currentSong: songs
})

export const getSongDetailAction = (ids) => {
  return (dispatch) => {
    getSongDetail(ids).then((res) => {
      dispatch(changeCurrentSongAction(res.songs[0]))
    })
  }
}
