import React, {
  memo,
  useState,
  useEffect,
  useRef,
  useCallback,
  forwardRef
} from 'react'
import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'

import { Slider, message } from 'antd'
import classnames from 'classnames'

import HYAppPlayPanel from '../app-player-panel'
import { getSizeImage, getPlaySong } from '@/utils/format-utils'
import dayjs from 'dayjs'

import {
  changePlayListAction,
  changeCurrentSongAction,
  changeCurrentSongIndexAction,
  changeToPlayOrPauseAction,
  changeSequenceAction,
  changeCurrentIndexAndSongAction,
  getLyricAction,
  changeCurrentLyricIndexAction
} from '../store/actionCreators'

import { PlaybarWrapper, Control, PlayInfo, Operator } from './style'

const HYAppPlayerBar = memo(
  forwardRef(() => {
    // props and state
    const [currentTime, setCurrentTime] = useState(0)
    const [progress, setProgress] = useState(0)
    const [isChanging, setIsChanging] = useState(false)

    const [isLoaded, setIsLoaded] = useState(false)
    const [isLoadedCount, setIsLoadedCount] = useState(0)
    const [showPanel, setShowPanel] = useState(false)

    // 控制playbar是否显示的标志符
    const [isShow, setIsShow] = useState(false)

    // redux hooks
    const { currentSong, isPlaying, sequence, lyricList, currentLyricIndex } =
      useSelector(
        (state) => ({
          currentSong: state.getIn(['player', 'currentSong']),
          isPlaying: state.getIn(['player', 'isPlaying']),
          sequence: state.getIn(['player', 'sequence']),
          lyricList: state.getIn(['player', 'lyricList']),
          currentLyricIndex: state.getIn(['player', 'currentLyricIndex'])
        }),
        shallowEqual
      )
    const dispatch = useDispatch()

    // other hooks
    const audioRef = useRef()
    const playbarRef = useRef()
    const playOrPauseRef = useRef()

    useEffect(() => {
      const value = window.localStorage.getItem('stateOfPlayer')
      if (value) {
        const stateOfPlayer = JSON.parse(value)
        dispatch(changePlayListAction(stateOfPlayer.playList))
        dispatch(changeCurrentSongAction(stateOfPlayer.currentSong))
        dispatch(changeCurrentSongIndexAction(stateOfPlayer.currentSongIndex))
      }

      // dispatch(getSongDetailAction(1847468261))
    }, [])

    useEffect(() => {
      audioRef.current.src = getPlaySong(currentSong.id)
      dispatch(getLyricAction(currentSong.id))
    }, [currentSong])

    useEffect(() => {
      const isShowValue = window.localStorage.getItem('isShowValue')
      // 这里是判断在刷新之前isShow是处于lock还是unlock状态,'true'是lock状态,那么就要重新执行一次showPlayer,
      // 因为每次刷新之后,isShow都会变成false状态,false是unlock状态,那么就不需要执行showPlayer,因为每次刷新之后,isShow都会变成false状态
      if (isShowValue === 'true') {
        showPlayBar()
      }
    }, [])

    // other handle
    const picUrl = currentSong?.al?.picUrl
    const singerName = (currentSong.ar && currentSong.ar[0].name) || '未知歌手'
    const duration = currentSong.dt || 0
    const showDuration = dayjs(duration).format('mm:ss')
    const showCurrentTime = dayjs(currentTime).format('mm:ss')

    // handle function
    const playMusic = useCallback(() => {
      const value = playOrPauseRef.current.classList.value
      // console.log(value.indexOf('ply'))
      if (value.indexOf('pause') === -1) {
        playOrPauseRef.current.classList.replace('ply', 'pause')
        audioRef.current.autoplay = false
      } else {
        playOrPauseRef.current.classList.replace('pause', 'ply')
      }
      isPlaying ? audioRef.current.pause() : audioRef.current.play()
      dispatch(changeToPlayOrPauseAction(!isPlaying))

      if (isLoadedCount === 0) {
        setIsLoaded(true)
      }
      setIsLoadedCount(isLoadedCount + 1)
    }, [isPlaying, isLoaded, isLoadedCount])

    const timeUpdate = (e) => {
      const currentTime = e.target.currentTime
      if (!isChanging) {
        setCurrentTime(currentTime * 1000)
        setProgress(((currentTime * 1000) / duration) * 100)
      }

      // 获取当前歌词
      let i = 0
      for (; i < lyricList.length; i++) {
        const lyricItem = lyricList[i]
        if (currentTime * 1000 < lyricItem.time) {
          break
        }
      }

      if (currentLyricIndex !== i - 1) {
        // console.log(currentLyricIndex)
        dispatch(changeCurrentLyricIndexAction(i - 1))
        const content = lyricList[i - 1] && lyricList[i - 1].content
        message.open({
          key: 'lyric',
          content,
          duration: 0,
          className: 'lyric-class'
        })
      }
    }

    const sliderChange = useCallback(
      (value) => {
        setIsChanging(true)
        const currentTime = (value / 100) * duration
        setCurrentTime(currentTime)
        setProgress(value)
      },
      [duration]
    )

    const sliderAfterChange = useCallback(
      (value) => {
        const currentTime = ((value / 100) * duration) / 1000
        audioRef.current.currentTime = currentTime
        setCurrentTime(currentTime * 1000)
        setIsChanging(false)

        // 如下代码是控制在暂停状态下拖动或点击进度条后是否自动播放歌曲
        // if (!isPlaying) {
        //   playMusic()
        // }
      },
      [duration]
    )

    const handleMouseOver = useCallback(
      (e) => {
        if (!isShow) {
          playbarRef.current.style.bottom = '0px'
        }
      },
      [isShow]
    )

    const handleMouseOut = useCallback(
      (e) => {
        if (!isShow) {
          playbarRef.current.style.bottom = '-42px'
        }
      },
      [isShow]
    )

    const showPlayBar = useCallback(
      (e) => {
        setIsShow(!isShow)
        window.localStorage.setItem('isShowValue', !isShow)
      },
      [isShow]
    )

    const changeSequence = useCallback(() => {
      let currentSequence = sequence + 1
      if (currentSequence > 2) {
        currentSequence = 0
      }
      dispatch(changeSequenceAction(currentSequence))
    }, [sequence])

    const changeMusic = useCallback(
      (tag) => {
        dispatch(changeCurrentIndexAndSongAction(tag))
        if (isPlaying) {
          audioRef.current.autoplay = true
        }
      },
      [isPlaying]
    )

    const handleMusicEnded = useCallback(() => {
      if (sequence === 2) {
        // 确认处于单曲循环状态
        audioRef.current.currentTime = 0
        audioRef.current.play()
      } else {
        dispatch(changeCurrentIndexAndSongAction(1))
        if (isPlaying) {
          audioRef.current.autoplay = true
        }
      }
    }, [sequence, isPlaying])

    return (
      <PlaybarWrapper
        className="sprite_player"
        ref={playbarRef}
        onMouseOver={(e) => handleMouseOver(e)}
        onMouseOut={(e) => handleMouseOut(e)}
      >
        <div className="content wrap-v2">
          <Control isPlaying={isPlaying}>
            <button
              className="sprite_player prev"
              onClick={(e) => changeMusic(-1)}
            ></button>
            <button
              className="sprite_player pause global_play_btn"
              onClick={(e) => playMusic()}
              ref={playOrPauseRef}
            ></button>
            <button
              className="sprite_player next"
              onClick={(e) => changeMusic(1)}
            ></button>
          </Control>
          <PlayInfo isLoaded={isLoaded}>
            <div className="image ">
              <img src={getSizeImage(picUrl, 34)} alt="" />
              <NavLink
                to="/discover/player"
                className="mask sprite_player"
              ></NavLink>
            </div>
            <div className="info">
              <div className="song">
                <a className="song-name">{currentSong.name}</a>
                <a href="#/" className="singer-name">
                  {singerName}
                </a>
              </div>
              <div className="progress">
                <Slider
                  defaultValue={0}
                  value={progress}
                  onChange={sliderChange}
                  onAfterChange={sliderAfterChange}
                />
                <div className="time">
                  <span className="now-time">{showCurrentTime}</span>
                  <span className="divider">/</span>
                  <span className="duration">{showDuration}</span>
                </div>
              </div>
            </div>
          </PlayInfo>
          <Operator sequence={sequence}>
            <div className="left">
              <button className="sprite_player btn favor"></button>
              <button className="sprite_player btn share"></button>
            </div>
            <div className="right sprite_player">
              <button className="sprite_player btn volume"></button>
              <button
                className="sprite_player btn loop"
                onClick={(e) => changeSequence()}
              ></button>
              <button
                className="sprite_player btn playlist"
                onClick={(e) => setShowPanel(!showPanel)}
              ></button>
            </div>
          </Operator>
        </div>
        <div className="sprite_player show-content">
          <button
            className={classnames('sprite_player', {
              'lock-btn': isShow,
              'unlock-btn': !isShow
            })}
            onClick={(e) => showPlayBar()}
          ></button>
        </div>
        <audio
          ref={audioRef}
          onTimeUpdate={(e) => timeUpdate(e)}
          onEnded={(e) => handleMusicEnded(e)}
        />
        {showPanel && <HYAppPlayPanel />}
      </PlaybarWrapper>
    )
  })
)

export default HYAppPlayerBar
