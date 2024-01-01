import styled from "styled-components";
import { Avatar as AvatarAntd } from "antd"

export const Container = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  margin-top: 20px;
  margin-bottom: 20px;
`

export const AvatarWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

export const UsernameTruncate = styled.div`
  font-size: 32px;
`

export const Body = styled.div``

export const Avatar = styled(AvatarAntd)`
  background-color: blue;
  vertical-align: middle;
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
`
