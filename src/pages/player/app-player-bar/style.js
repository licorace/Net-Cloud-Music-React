import styled from 'styled-components'

export const PlaybarWrapper = styled.div`
  position: fixed;
  left: 0;
  right: -15px;
  bottom: 0;
  height: 52px;
  /* margin-right: 67px; */
  background-position: 0 0;
  background-repeat: repeat;
  z-index: 1000;
  transition: all 200ms linear;

  .content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 0;
    height: 47px;
    margin-right: 67px;
    /* background-color: #fff; */
  }

  .show-content {
    position: absolute;
    top: -14px;
    right: 15px;
    width: 52px;
    height: 67px;
    background-position: 0 -380px;

    .lock-btn {
      background-position: -100px -380px;
      display: block;
      width: 18px;
      height: 18px;
      margin: 6px 0 0 17px;
      cursor: pointer;

      &:hover {
        background-position: -100px -400px;
      }
    }

    .unlock-btn {
      background-position: -80px -380px;
      display: block;
      width: 18px;
      height: 18px;
      margin: 6px 0 0 17px;
      cursor: pointer;

      &:hover {
        background-position: -80px -400px;
      }
    }
  }

  .unlock-content {
    position: absolute;
    top: -14px;
    right: 15px;
    width: 52px;
    height: 67px;
    background-position: 0 -380px;

    .btn {
      background-position: -100px -380px;
      display: block;
      width: 18px;
      height: 18px;
      margin: 6px 0 0 17px;
      cursor: pointer;

      &:hover {
        background-position: -100px -400px;
      }
    }
  }
`

export const Control = styled.div`
  display: flex;
  align-items: center;

  .prev,
  .next {
    width: 28px;
    height: 28px;
    margin-top: 2px;
    cursor: pointer;
  }

  .prev {
    background-position: 0 -130px;

    &:hover {
      background-position: -30px -130px;
    }
  }

  .play {
    width: 36px;
    height: 36px;
    margin: 0 8px;
    background-position: 0 ${(props) => (props.isPlaying ? '-165px' : '-204px')};
    cursor: pointer;

    &:hover {
      background-position: -40px
        ${(props) => (props.isPlaying ? '-165px' : '-204px')};
    }
  }

  .next {
    background-position: -80px -130px;

    &:hover {
      background-position: -110px -130px;
    }
  }
`

export const PlayInfo = styled.div`
  display: flex;
  width: 642px;
  align-items: center;

  .image {
    width: 34px;
    height: 34px;
    border-radius: 5px;
    position: relative;

    .mask {
      position: absolute;
      top: 0px;
      left: 0px;
      display: block;
      width: 34px;
      height: 35px;
      background-position: 0 -80px;
    }
  }

  .info {
    flex: 1;
    color: #a1a1a1;
    margin-left: 10px;

    .song {
      color: #e1e1e1;
      position: relative;
      top: 8px;
      left: 8px;

      .song-name {
        color: #e8e8e8;
      }
      .singer-name {
        color: #a1a1a1;
        margin-left: 15px;
      }
    }

    .progress {
      display: flex;
      align-items: center;

      .ant-slider {
        width: 493px;
        margin-right: 10px;
        margin-top: 8px;
        margin-bottom: 12px;

        .ant-slider-rail {
          height: 9px;
          background: url(${require('@/assets/img/progress_bar.png')}) right
            ${(props) => (props.isLoaded ? '-30px' : '0')};
        }
      }

      .ant-slider-track {
        height: 9px;
        background: url(${require('@/assets/img/progress_bar.png')}) left -66px;
      }

      .ant-slider-handle {
        width: 22px;
        height: 24px;
        border: none;
        margin-top: -7px;
        background: url(${require('@/assets/img/sprite_icon.png')}) 0 -250px;

        &:focus {
          box-shadow: 0 0 0;
        }

        &:hover {
          background-position: 0 -280px;
        }
      }
    }

    .time {
      .now-time {
        color: #a1a1a1;
      }
      .divider {
        margin: 0 3px;
        color: #797979;
      }
      .duration {
        color: #797979;
      }
    }
  }
`

export const Operator = styled.div`
  display: flex;
  position: relative;
  top: 5px;

  .btn {
    width: 25px;
    height: 25px;
    cursor: pointer;
  }

  .favor {
    background-position: -88px -163px;
  }

  .share {
    background-position: -114px -163px;
  }

  .right {
    width: 126px;
    padding-left: 13px;
    background-position: -147px -248px;

    .volume {
      background-position: -2px -248px;
    }

    .loop {
      background-position: ${(props) => {
        switch (props.sequence) {
          case 1:
            return '-66px -248px'
          case 2:
            return '-66px -344px'
          default:
            return '-3px -344px'
        }
      }};
    }

    .playlist {
      width: 59px;
      background-position: -42px -68px;
    }
  }
`
