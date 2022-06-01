import styled from 'styled-components'

export const BannerWrapper = styled.div`
  /* background-size可以省略，如果不省略，/background-size必须紧跟在background-position的后面 */
  /* 这里写了两个center,相当于水平方向和垂直方向都设置了center, 但其实这里可以只写一个,因为如果只设置了1个方向，另一个方向默认是center*/
  background: url(${(props) => props.bgImage}) center center/6000px;

  .banner {
    height: 285px;
    /* background-color: red; */

    display: flex;
    position: relative;
  }
`

export const BannerLeft = styled.div`
  position: relative;
  width: 730px;

  .banner-item {
    overflow: hidden;
    height: 285px;
    .image {
      width: 100%;
      height: 100%;
    }
  }
`

export const BannerRight = styled.a.attrs({
  href: 'https://music.163.com/#/download',
  target: '_blank'
})`
  width: 254px;
  height: 285px;
  background: url(${require('@/assets/img/download.png')});
`

export const BannerControl = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 40%;
  /* transform: translateY(-50%); */

  .btn {
    position: absolute;
    width: 37px;
    height: 63px;
    background-image: url(${require('@/assets/img/banner_sprite.png')});
    background-color: transparent;
    cursor: pointer;

    &:hover {
      background-color: rgba(0, 0, 0, 0.1);
    }
  }

  .left {
    left: -68px;
    background-position: 0 -360px;
  }

  .right {
    right: -68px;
    background-position: 0 -508px;
  }
`

export const CerouselBallDots = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 5%;
  /* transform: translateX(-50%); */
  /* transform: translateY(-50%); */
  display: flex;
  justify-content: center;
  align-items: center;
  /* 200px是圆点的 */
  width: 100%;
  /* 96px是模仿antdesign的 */
  /* width: 96px; */
  /* height: 20px; */
  /* margin: 0 auto;
  background-color: red; */

  /* 以下是自己写的圆点格式的面板指示器 */
  .tab-item {
    /* position: relative; */

    width: 6px;
    height: 6px;
    border-radius: 50%;

    margin-left: 8px;
    margin-right: 8px;
    /* left: 10px;
    right: 10px; */
    cursor: pointer;
    background-color: #fff;
    opacity: 0.3;
    transition: all 0.5s;

    &:hover,
    &.active {
      opacity: 1;
      background-color: #bf0018;
    }
  }
`
