import React from 'react'
import {NavLink} from 'react-router-dom'
import LogoUrl from './logo.svg'
import styled from 'styled-components'

const Header = styled.header`
  display: flex;
  align-items: center;
  padding: 10px 100px;
  background: #02101f;
`
const Logo = styled.img`
  height: 30px;
`
const StyledLink = styled(NavLink)`
  color: #fff;
  margin-left: 30px;

  &.active {
    border-bottom: 1px solid #fff;
  }
`
const Login = styled.div`
  margin-left: auto;
`
const Button = styled.button`
  margin-left: 10px;
`

function component() {
	return (
		<Header>
			<Logo src = {LogoUrl} alt = ""/>
			<nav>
				<StyledLink to = '/' exact>首页</StyledLink>
				<StyledLink to = '/history'>上传历史</StyledLink>
				<StyledLink to = '/about'>关于我</StyledLink>
			</nav>
			<Login>
				<Button>登录</Button>
				<Button>注册</Button>
			</Login>
		</Header>
	)
}

export default component
