import { View, Text } from 'react-native'
import React from 'react'

interface IProps{
    title: string;
}

export default function Welcome({title}:IProps) {
  return (
    <View>
      <Text>{title}</Text>
    </View>
  )
}