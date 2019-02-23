import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.css'

export default class Index extends Component {

  config = {
    navigationBarTitleText: '首页',
    usingComponents: {
      wemark: '../../wemark/wemark'
    }
  }
  state = {
    md: '# heading\n\nText'
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='index'>
        <Text>Hello world!</Text>
        <wemark md={this.state.md} link highlight type='wemark' />
        <Text>Hello world!</Text>
      </View>
    )
  }
}

