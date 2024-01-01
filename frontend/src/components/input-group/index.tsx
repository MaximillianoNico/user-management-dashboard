import styled from "styled-components"

export const InputGroup = styled.div<{$marginTop?: string}>`
  margin-top: ${({ $marginTop }) => $marginTop ?? "unset"};
`

export const InputLabel = styled.div`
  font-size: 14px;
  padding-bottom: 8px;
`
