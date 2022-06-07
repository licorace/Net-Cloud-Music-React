import * as actionTypes from './constants'

import { getSongDetail } from '@/services/player'

export const changeCurrentSongAction = (currentSong) => ({
  type: actionTypes.CHANGE_CURRENT_SONG,
  currentSong
})

export const changePlayListAction = (playList) => ({
  type: actionTypes.CHANGE_PLAY_LIST,
  playList
})

export const changeCurrentSongIndexAction = (index) => ({
  type: actionTypes.CHANGE_CURRENT_SONG_INDEX,
  index
})

// 这个是全局控制是否播放的
export const changeToPlayOrPauseAction = (isPlaying) => ({
  type: actionTypes.CHANGE_TO_PLAY_OR_PAUSE,
  isPlaying
})

const setCache = (key, StorageKey, getState) => {
  const reduxState = getState().getIn([key])
  const stateOfPlayer = {}
  reduxState.map((item, index) => {
    return (stateOfPlayer[index] = item)
  })
  window.localStorage.setItem(StorageKey, JSON.stringify(stateOfPlayer))
}

export const getSongDetailAction = (ids) => {
  return (dispatch, getState) => {
    // 1.根据ids查找playList中是否已经有了该歌曲
    const playList = getState().getIn(['player', 'playList'])
    const songIndex = playList.findIndex((song) => song.id === ids)

    // 2.判断是否找到歌曲
    if (songIndex !== -1) {
      // 查找歌曲
      dispatch(changeCurrentSongIndexAction(songIndex))
      const song = playList[songIndex]
      dispatch(changeCurrentSongAction(song))

      setCache('player', 'stateOfPlayer', getState)
    } else {
      // 没有找到歌曲

      // 请求歌曲数据
      getSongDetail(ids).then((res) => {
        const song = res.songs && res.songs[0]
        if (!song) return

        // 1.将最新请求到的歌曲添加到播放列表中
        const newPlayList = [...playList]
        newPlayList.push(song)

        // 2.更新redux中的值
        dispatch(changePlayListAction(newPlayList))
        dispatch(changeCurrentSongIndexAction(newPlayList.length - 1))
        dispatch(changeCurrentSongAction(song))

        setCache('player', 'stateOfPlayer', getState)
      })
    }
  }
}
