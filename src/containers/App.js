import { connect } from "react-redux";

import { increment, decrement,incrementAsync } from '../redux/action-creators/count';
import Counter from '../components/counter'

export default connect(
  state => ({count:state.count}),
  {increment,decrement,incrementAsync}
)(Counter)