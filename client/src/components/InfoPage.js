import React from "react"
import {
  Menu,
  Container,
  Image,
  Icon,
  Header,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from "semantic-ui-react"
import fflogo from "../images/order-logo.svg"

class Info extends React.Component {
  render() {
    return (
      <div id="infoPage">
        <div id="nav">
          <Menu fixed="top" inverted id="navBar">
            <Container>
              <a href="/">
                <Image
                  size="mini"
                  src={fflogo}
                  style={{ marginRight: "1.5em" }}
                  id="logo-image"
                />
              </a>

              <Icon name="question circle outline" id="questionCircle"></Icon>
            </Container>
          </Menu>
        </div>
        <div id="header">
          <Header as="h2" icon>
            <Icon name="address card outline" />
            Order For Sure
            <Header.Subheader>
              Helping small business restaurants grow.
            </Header.Subheader>
          </Header>
        </div>
        <div id="text">
          <Table>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell colSpan="3">
                  Additional Links
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <TableBody>
              <TableRow>
                <TableCell>
                  Any questions regarding the information on the site, or other
                  ideas can be sent to...
                </TableCell>
                <TableCell>
                  <Icon name="mail" />
                  <a href="mailto:Data@FortisureIT.com?Subject=OrderForSure%20Request">
                    data@fortisureit.com
                  </a>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  Visit our parent company, FortisureIT at...
                </TableCell>
                <TableCell>
                  <Icon name="users" />
                  <a href="http://fortisureit.com">fortisureit.com</a>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div id='moreToCome'>
        <Header as="h3" icon>
            <Icon name="code" />
            Coming Soon
            <Header.Subheader>
              The OrderForSure eCommerce Platform.
            </Header.Subheader>
          </Header>
          <p>

          </p>

        </div>
      </div>
    )
  }
}

export default Info
