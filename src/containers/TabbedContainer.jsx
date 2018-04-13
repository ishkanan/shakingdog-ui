
import { connect } from "react-redux"

import { changeSelectedTab } from "../actions/app"
import TabbedContent from "../components/TabbedContent.jsx"
import { toJS } from "../data/util.jsx"


const mapStateToProps = (state) => ({
  redirect: state.getIn(["auth", "redirect"]),
  selectedTab: state.getIn(["ui", "selectedTab"])
})

const mapDispatchToProps = ({
  onTabChange: changeSelectedTab
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(toJS(TabbedContent))
