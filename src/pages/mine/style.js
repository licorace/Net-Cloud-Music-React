import styled from 'styled-components'

export const PlayerWrapper = styled.div`
  /* overflow-x: hidden;
  overflow-y: scroll;
  position: relative;
  zoom: 1;
  display: block; */

  .content {
    background: url(${require('@/assets/img/wrap-bg.png')}) repeat-y;
    background-color: #fff;
    display: flex;
    /* overflow-x: hidden;
    overflow-y: scroll; */
    /* position: relative; */
    /* width: 100%; */
    /* height: 100%; */
    /* height: calc(100vh - 75px); */
    /* overflow: overlay; */
    /* position: fixed; */
  }
`

export const PlayerLeft = styled.div`
  width: 710px;
  height: calc(100vh - 75px);
  overflow: auto;
  /* overflow: scroll; */
  position: fixed;
  div {
    width: 100%;
    height: 200px;
    text-align: center;
  }

  /* &::-webkit-scrollbar {
    display: none;
  } */
`

export const PlayerRight = styled.div`
  width: 270px;
  /* flex: 1; */
  /* height: calc(100vh - 75px); */
  padding: 20px 40px 40px 30px;
  /* overflow: scroll; */
  /* position: fixed; */
  overflow-y: auto;
  overflow-x: hidden;
  position: relative;
  left: 710px;
  /* right: 0; */
  /* overflow: auto; */

  div {
    width: 100%;
    height: 200px;
    text-align: center;
  }

  &::-webkit-scrollbar {
    display: none; /* Chrome Safari */
  }
`
