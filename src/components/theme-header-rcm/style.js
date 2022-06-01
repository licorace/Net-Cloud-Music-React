import styled from 'styled-components'

export const HeaderWrapper = styled.div`
  height: 33px;
  border-bottom: 2px solid #c10d0c;
  padding: 13px 10px 18px 34px;

  background-position: -225px -156px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  .left {
    display: flex;
    align-items: center;

    .title {
      font-size: 20px;
      font-family: 'Microsoft Yahei', Arial, Helvetica, sans-serif;
      margin-right: 20px;
      font-weight: normal;
      line-height: 28px;
    }

    .keyword {
      display: flex;
      margin-top: 5px;

      .item {
        .divider {
          margin: 0 13px;
          color: #ccc;
        }
        &:last-child .divider {
          display: none;
        }
      }
    }
  }

  .right {
    display: flex;
    align-items: center;
    .icon {
      display: inline-block;
      width: 12px;
      height: 12px;
      margin-left: 4px;
      background-position: 0 -240px;
    }
  }
`
