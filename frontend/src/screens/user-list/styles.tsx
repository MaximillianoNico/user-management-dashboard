import styled from "styled-components";

export const Layout = styled.div`
  padding: 20px;

  @media (min-width: 768px) {
    display: flex;
    justify-content: center;
  }
`

export const Container = styled.div`
  @media (min-width: 768px) {
    min-width: 678px;
  }
`

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center
`

export const Card = styled.div<{$active?: boolean}>`
  margin: 12px 0px;
  padding: 12px 10px;
  display: grid;
  grid-template-columns: 40px 40px auto 60px;
  width: 100%;
  border: 1px solid ${({ $active }) => $active ? "#2f80ed" : "#d8d8d8"};
  border-radius: 10px;

  @media (min-width: 701px) {
    grid-template-columns: 60px 60px auto 120px;
  }
`

export const Center = styled.div<{$gap?: string}>`
  display: flex;
  justify-content: center;
  column-gap: ${({ $gap }) => $gap ? $gap : "unset"};
  align-items: center;
`

export const InputChecked = styled.input`
  width: 20px;
  height: 20px;
`

export const Title = styled.div`
  font-size: 20px;
`

export const Body = styled.div`
  padding: 4px 6px;
`

export const Subtitle = styled.div`
  margin-top: 6px;
  font-size: 14px;
`

export const EmptyState = styled.div`
  width: 100%;
  text-align: center;
  margin-top: 30px;
`