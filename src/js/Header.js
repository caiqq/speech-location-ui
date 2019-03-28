import React, { Component } from 'react'
import { Dropdown, Icon, Row, Col } from 'antd'

class Header extends Component {
    render(
        <header id="navbar">
            <div id="navbar-container" className="boxed">
            <Row className="row">
                <Col span={20}>
                <div className="navbar-brand" title={brandName} onClick={this.logoClick}>
                    <span className="brand-title">
                    <span className="brand-text"><span className="logo" />{brandName}</span>
                    </span>
                </div>
                <nav className="topMenus hide">
                    {
                    gMenuList && gMenuList.map((item, index) => (<span
                        className={item.resKey === topKey ? 'topMenu on' : 'topMenu'}
                        key={item.resKey}
                        onClick={() => this.props.topMenuClick(item, index)}
                    >{item.resName}</span>))
                    }
                </nav>
                </Col>
                <Col span={4} className="col">
                <ul>
                    <li>
                    <Dropdown overlay={userCenter}>
                        <a className="ant-dropdown-link"><Icon type="user" />{userinfo.chineseName || userinfo.username}</a>
                    </Dropdown>
                    </li>
                </ul>
                </Col>
            </Row>
            </div>
        </header>
    )
}

export default Header;