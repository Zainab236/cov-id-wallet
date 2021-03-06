import React, { useState } from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native'
import { TextTypeView, BooleanTypeView } from '../components/ShowTypesView'
import HeadingComponent from '../components/HeadingComponent'

var settingLocalData = {
  GENERAL: {
    Agent: {
      value: 'Iphone',
      type: 'Text',
      key: '11'
    },
    Network: {
      value: 'Soverin Staging Network',
      type: 'Radio',
      key: '12',
      options: ['Soverin', 'non-soverin']
    },
    key: '1'
  },
  SECURITY: {
    'Biometric Security': {
      value: true,
      key: '21',
      type: 'Boolean'
    },
    'Change Code': {
      value: 'None',
      key: '22',
      type: 'Link'
    },
    key: '2'
  },
  SUPPORT: {
    'Contact us': {
      value: 'None',
      type: 'Link',
      key: '31'
    },
    'License and agreements': {
      value: 'None',
      type: 'Link',
      key: '32'
    },
    'About us': {
      value: 'None',
      type: 'Link',
      key: '33'
    },
    key: '3'
  }
}

export default function SettingsScreen () {
  const [settingsData, setSettingsData] = useState(settingLocalData)

  const toggleSwitch = (parent, child) => {
    const tempSettings = { ...settingsData }
    tempSettings[parent][child].value = !tempSettings[parent][child].value
    setSettingsData({ ...tempSettings })
  }
  return (
    <View style={styles.container}>
      <HeadingComponent text="Settings" />
      <FlatList
        data={Object.keys(settingsData)}
        keyExtractor={(item, index) => settingsData[item].key}
        renderItem={({ item }) => {
          const parent = item
          const parentData = settingsData[parent]
          return (
            <View>
              <Text style={styles.parentItem}>{parent}</Text>
              <FlatList
                data={Object.keys(parentData)}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => {
                  const childData = settingsData[parent][item]
                  if (item !== 'key' && item !== '') {
                    if (childData.value !== 'None') {
                      if (childData.type === 'Text') {
                        return (
                          <TextTypeView startValue={item + ':  ' + childData.value} endValue='Edit' endIcon='' />
                        )
                      } else if (childData.type === 'Radio') {
                        return (
                          <TextTypeView startValue={item + ':  ' + childData.value} endIcon='right' />
                        )
                      } else if (childData.type === 'Boolean') {
                        return (
                          <BooleanTypeView
                            parentValue={parent}
                            startValue={item}
                            endValue={childData.value}
                            toChangeValue={childData.value}
                            valueHandler={toggleSwitch}
                          />
                        )
                      } else {
                        return (
                          <TextTypeView startValue={item + ':  ' + childData.value} endIcon='right' />
                        )
                      }
                    } else {
                      return (
                        <TextTypeView startValue={item} endValue='Edit' endIcon='right' />

                      )
                    }
                  }
                }}
              />
            </View>
          )
        }}
      />

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingLeft: 5,
    paddingRight: 5,
    backgroundColor: '#f7f7f7'
  },
  parentItem: {
    flex: 1,
    margin: 5,
    marginTop: 20,
    backgroundColor: '#f7f7f7',
    fontSize: 15,
    color: '#6f6f6f'
  },
  childItem: {
    flex: 1,
    padding: 8,
    margin: 1,
    backgroundColor: '#ffffff',
    fontSize: 20,
    color: '#0f0f0f',
    borderRadius: 10
  }
})