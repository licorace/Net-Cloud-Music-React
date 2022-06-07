import * as actionTypes from './constants'

import { getSongDetail, getLyric } from '@/services/player'
import { getRandomNumber } from '@/utils/math-utils'
import { parseLyric } from '@/utils/parse-lyric'

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

export const changeSequenceAction = (sequence) => ({
  type: actionTypes.CHANGE_SEQUENCE,
  sequence
})

export const changeLyricsListAction = (lyricList) => ({
  type: actionTypes.CHANGE_LYRIC_LIST,
  lyricList
})

export const changeCurrentLyricIndexAction = (currentLyricIndex) => ({
  type: actionTypes.CHANGE_CURRENT_LYRIC_INDEX,
  currentLyricIndex
})

export const changeCurrentIndexAndSongAction = (tag) => {
  return (dispatch, getState) => {
    const playList = getState().getIn(['player', 'playList'])
    const sequence = getState().getIn(['player', 'sequence'])
    let currentSongIndex = getState().getIn(['player', 'currentSongIndex'])

    switch (sequence) {
      case 1: {
        let randomIndex = getRandomNumber(playList.length)
        while (randomIndex === currentSongIndex) {
          randomIndex = getRandomNumber(playList.length)
        }
        currentSongIndex = randomIndex
        break
      } // 随机播放

      default: // 顺序播放,因为单曲循环和顺序播放的点击上一首和下一首的逻辑是一样的,因此合并了,只是说单曲循环的结束动作需要另行设置
        currentSongIndex += tag
        if (currentSongIndex >= playList.length) currentSongIndex = 0
        if (currentSongIndex < 0) currentSongIndex = playList.length - 1
    }

    const currentSong = playList[currentSongIndex]
    dispatch(changeCurrentSongAction(currentSong))
    dispatch(changeCurrentSongIndexAction(currentSongIndex))

    // 请求歌词
    dispatch(getLyricAction(currentSong.id))

    // 将更新后的数据保存到localStorage中去
    setCache('player', 'stateOfPlayer', getState)
  }
}

// 这个是控制存入localStorage的
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
    let song = null
    if (songIndex !== -1) {
      // 查找歌曲
      dispatch(changeCurrentSongIndexAction(songIndex))
      song = playList[songIndex]
      dispatch(changeCurrentSongAction(song))
      // 3.请求该歌曲的歌词
      dispatch(getLyricAction(song.id))

      // 4.将更新后的数据保存到localStorage中去
      setCache('player', 'stateOfPlayer', getState)
    } else {
      // 没有找到歌曲
      // 请求歌曲数据
      getSongDetail(ids).then((res) => {
        song = res.songs && res.songs[0]
        if (!song) return

        // 1.将最新请求到的歌曲添加到播放列表中
        const newPlayList = [...playList]
        newPlayList.push(song)

        // 2.更新redux中的值
        dispatch(changePlayListAction(newPlayList))
        dispatch(changeCurrentSongIndexAction(newPlayList.length - 1))
        dispatch(changeCurrentSongAction(song))

        // 3.请求该歌曲的歌词
        dispatch(getLyricAction(song.id))

        // 4.将更新后的数据保存到localStorage中去
        setCache('player', 'stateOfPlayer', getState)
      })
    }
  }
}

export const getLyricAction = (id) => {
  return (dispatch) => {
    getLyric(id).then((res) => {
      const lyric = res?.lrc?.lyric
      const lyricList = parseLyric(lyric)
      dispatch(changeLyricsListAction(lyricList))
    })
  }
}
