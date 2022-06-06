import React, { memo, useState, useEffect, useRef, useCallback } from 'react'
import { useDispatch, shallowEqual, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

import { Slider } from 'antd'
import classnames from 'classnames'

import { getSongDetailAction } from '../store/actionCreators'

import { getSizeImage, getPlaySong } from '@/utils/format-utils'
import dayjs from 'dayjs'

import { PlaybarWrapper, Control, PlayInfo, Operator } from './style'

const HYAppPlayerBar = memo(() => {
  // props and state
  const [currentTime, setCurrentTime] = useState(0)
  const [progress, setProgress] = useState(0)
  const [isChanging, setIsChanging] = useState(false)

  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isLoadedCount, setIsLoadedCount] = useState(0)

  // 控制playbar是否显示的标志符
  const [isShow, setIsShow] = useState(false)
  // redux hooks
  const { currentSong } = useSelector(
    (state) => ({
      currentSong: state.getIn(['player', 'currentSong'])
    }),
    shallowEqual
  )
  const dispatch = useDispatch()

  // other hooks
  const audioRef = useRef()
  const playbarRef = useRef()
  useEffect(() => {
    dispatch(getSongDetailAction(1847468261))
  }, [dispatch])

  useEffect(() => {
    // console.log('我被渲染了')
    // console.log(audioRef.current)
    audioRef.current.src = getPlaySong(currentSong.id)
    // audioRef.current.play().then((res) => {
    //   setIsPlaying(true)
    // })
    // .catch((err) => {
    //   setIsPlaying(false)
    // })
  }, [currentSong])

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
    isPlaying ? audioRef.current.pause() : audioRef.current.play()
    setIsPlaying(!isPlaying)
    console.log(isLoaded, isLoadedCount)
    if (isLoadedCount === 0) {
      setIsLoaded(true)
    }
    setIsLoadedCount(isLoadedCount + 1)
  }, [isPlaying, isLoaded, isLoadedCount])

  const timeUpdate = (e) => {
    console.log('timeupdate:', e.target.currentTime)
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
    // setIsShow(!isShow)
  })

  const handleMouseOut = useCallback((e) => {
    if (!isShow) {
      playbarRef.current.style.bottom = '-42px'
    }
    // setIsShow(!isShow)
  })

  const showPlayBar = useCallback((e) => {
    setIsShow(!isShow)
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
            className="sprite_player play"
            onClick={(e) => playMusic()}
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

export default HYAppPlayerBar
