import { Navigation } from "./navigation"
import { Toogle } from "./toogle"
import { Wrapper } from "./wrapper"

export const SideBar = () => {
  return (
    <Wrapper>
      <Toogle/>
      <Navigation/>
    </Wrapper>
  )
}

