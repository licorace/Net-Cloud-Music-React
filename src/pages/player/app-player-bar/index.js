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

import { Slider } from 'antd'
import classnames from 'classnames'

// import { getSongDetailAction } from '../store/actionCreators'

import { getSizeImage, getPlaySong } from '@/utils/format-utils'
import dayjs from 'dayjs'

import {
  changePlayListAction,
  changeCurrentSongAction,
  changeCurrentSongIndexAction,
  changeToPlayOrPauseAction
} from '../store/actionCreators'

import { PlaybarWrapper, Control, PlayInfo, Operator } from './style'

const HYAppPlayerBar = memo(
  forwardRef(() => {
    // props and state
    const [currentTime, setCurrentTime] = useState(0)
    const [progress, setProgress] = useState(0)
    const [isChanging, setIsChanging] = useState(false)

    // const [isPlaying, setIsPlaying] = useState(false)
    const [isLoaded, setIsLoaded] = useState(false)
    const [isLoadedCount, setIsLoadedCount] = useState(0)

    // 控制playbar是否显示的标志符
    const [isShow, setIsShow] = useState(false)
    // redux hooks
    const { currentSong, isPlaying } = useSelector(
      (state) => ({
        currentSong: state.getIn(['player', 'currentSong']),
        isPlaying: state.getIn(['player', 'isPlaying'])
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
      // console.log('我被渲染啦')
      audioRef.current.src = getPlaySong(currentSong.id)
      // audioRef.current.play().then((res) => {
      //   setIsPlaying(true)
      // })
      // .catch((err) => {
      //   setIsPlaying(false)
      // })
    }, [currentSong])

    useEffect(() => {
      const isShowValue = window.localStorage.getItem('isShowValue')
      // console.log(isShow, isShowValue)
      // 这里是判断在刷新之前isShow是处于lock还是unlock状态,'true'是lock状态,那么就要重新执行一次showPlayer,
      // 因为每次刷新之后,isShow都会变成false状态,false是unlock状态,那么就不需要执行showPlayer,因为每次刷新之后,isShow都会变成false状态
      if (isShowValue === 'true') {
        // console.log('ok')
        showPlayBar()
      }
    }, [])

    // other handle
    const picUrl = currentSong?.al?.picUrl
    const singerName = (currentSong.ar && currentSong.ar[0].name) || '未知歌手'
    const duration = currentSong.dt || 0
    const showDuration = dayjs(duration).format('mm:ss')
    const showCurrentTime = dayjs(currentTime).format('mm:ss')
    // const progress = (currentTime / duration) * 100

    // handle function
    const playMusic = useCallback(() => {
      // audioRef.current.src = getPlaySong(currentSong.id)
      const value = playOrPauseRef.current.classList.value
      // console.log(value.indexOf('ply'))
      if (value.indexOf('pause') === -1) {
        // console.log('目前是播放状态')
        // console.log('操作之前的', isPlaying)
        playOrPauseRef.current.classList.replace('ply', 'pause')
        audioRef.current.autoplay = false
        // if (isPlaying === false) {
        //   // console.log('wocaozuole')
        //   setIsPlaying((isPlaying) => !isPlaying)
        // }
      } else {
        // console.log('目前是暂停状态')
        playOrPauseRef.current.classList.replace('pause', 'ply')
      }
      // console.log('切换之前', isPlaying)
      isPlaying ? audioRef.current.pause() : audioRef.current.play()
      dispatch(changeToPlayOrPauseAction(!isPlaying))
      // setIsPlaying(!isPlaying)
      // console.log(isLoaded, isLoadedCount)

      if (isLoadedCount === 0) {
        setIsLoaded(true)
      }
      setIsLoadedCount(isLoadedCount + 1)
    }, [isPlaying, isLoaded, isLoadedCount])

    const timeUpdate = (e) => {
      // console.log('timeupdate:', e.target.currentTime)
      const currentTime = e.target.currentTime
      if (!isChanging) {
        setCurrentTime(currentTime * 1000)
        setProgress(((currentTime * 1000) / duration) * 100)
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
        console.log('sliderAfterChange:', audioRef.current.currentTime)
        setCurrentTime(currentTime * 1000)
        setIsChanging(false)

        // 如下代码是控制在暂停状态下拖动或点击进度条后是否自动播放歌曲
        // if (!isPlaying) {
        //   playMusic()
        // }
      },
      [duration]
    )

    const handleMouseOver = useCallback((e) => {
      if (!isShow) {
        playbarRef.current.style.bottom = '0px'
      }
    })

    const handleMouseOut = useCallback((e) => {
      if (!isShow) {
        playbarRef.current.style.bottom = '-42px'
      }
    })

    const showPlayBar = useCallback((e) => {
      setIsShow(!isShow)
      window.localStorage.setItem('isShowValue', !isShow)
    })

    return (
      <PlaybarWrapper
        className="sprite_player"
        ref={playbarRef}
        onMouseOver={(e) => handleMouseOver(e)}
        onMouseOut={(e) => handleMouseOut(e)}
      >
        <div className="content wrap-v2">
          <Control isPlaying={isPlaying}>
            <button className="sprite_player prev"></button>
            <button
              className="sprite_player pause global_play_btn"
              onClick={(e) => playMusic()}
              ref={playOrPauseRef}
            ></button>
            <button className="sprite_player next"></button>
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
          <Operator>
            <div className="left">
              <button className="sprite_player btn favor"></button>
              <button className="sprite_player btn share"></button>
            </div>
            <div className="right sprite_player">
              <button className="sprite_player btn volume"></button>
              <button className="sprite_player btn loop"></button>
              <button className="sprite_player btn playlist"></button>
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
        <audio ref={audioRef} onTimeUpdate={timeUpdate} />
      </PlaybarWrapper>
    )
  })
)

export default HYAppPlayerBar
