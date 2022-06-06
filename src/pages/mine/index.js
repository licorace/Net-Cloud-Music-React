import React, { memo } from 'react'

import { PlayerWrapper, PlayerLeft, PlayerRight } from './style'

const HYMine = memo(() => {
  return (
    <PlayerWrapper>
      <div className="content wrap-v2">
        <PlayerLeft>
          <div>1</div>
          <div>2</div>
          <div>3</div>
          <div>4</div>
          <div>5</div>
          <div>6</div>
          <div>7</div>
          <div>8</div>
          <div>9</div>
          <div>10</div>
          <div>11</div>
        </PlayerLeft>
        <PlayerRight>
          <div>1</div>
          <div>2</div>
          <div>3</div>
          <div>4</div>
          <div>5</div>
          <div>6</div>
          <div>7</div>
          <div>8</div>
          <div>9</div>
          <div>10</div>
          <div>11</div>
        </PlayerRight>
      </div>
    </PlayerWrapper>
  )
})

export default HYMine
