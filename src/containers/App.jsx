
import React from "react"
import { connect } from "react-redux"

import Redirecter from "../components/Redirecter.jsx"
import TabControl from "../containers/TabControl.jsx"
import { toJS } from "../data/util.jsx"


const App = ({redirect}) => (
  <React.Fragment>
    {redirect.initiate &&
    <Redirecter message={redirect.message}
                url={redirect.url} />
    }
    {!redirect.initiate &&
    <TabControl />
    }
  </React.Fragment>
)

const mapStateToProps = (state) => ({
  redirect: state.getIn(["auth", "redirect"])
})

export default connect(
  mapStateToProps
)(toJS(App))
