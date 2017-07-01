import React from "react"
import PropTypes from 'prop-types'
import {
  View,
  TouchableOpacity,
  ViewPropTypes,
  StyleSheet
} from "react-native"

export default RadioButton = (props) => (
  <TouchableOpacity
    onPress={props.onPress}
    style={[styles.container, props.style]}>
    {props.value && <View style={[styles.inner, props.innerStyle]} />}
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  container: {
    height: 20,
    width: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "gray",
    borderWidth: 1
  },
  inner : {
    height: 16,
    width: 16,
    borderRadius: 8,
    backgroundColor: "green",
  }
})

RadioButton.propTypes = {
  style: ViewPropTypes.style,
  innerStyle: ViewPropTypes.style,
  value: PropTypes.bool,
  onPress: PropTypes.func,
}

RadioButton.defaultProps = {
  onPress: () => {},
  value: false
}
