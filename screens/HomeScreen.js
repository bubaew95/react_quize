import React from 'react'
import {StyleSheet, View, Text, Button, ImageBackground} from 'react-native'
import data from '../server/questions.json'

const imageFon = require('../assets/images/fon.jpg')


export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  }

  state = {
    num: 0,
    lengthQuest: data.length,
    isCheckAnswer: 0,
  }

  componentDidMount() { 
    console.log(data)
  }

  onclick = (check) => { 
    const {isCheckAnswer, num, lengthQuest} = this.state
    this.setState({
      isCheckAnswer: (check ? isCheckAnswer + 1 : isCheckAnswer),
      num: (num + 1)
    }) 
  }

  quest = () => {
    const {num} = this.state 
    return (
      <View style={{ backgroundColor: '#fff', height: 'auto', padding: 10, margin: 10, justifyContent: 'center'}}>
        <Text style={styles.quest}>{data[num].quest}</Text>
        {
          data[num].answers.map((item, i) =>
            <Button
              key={i} 
              style={{margin: 5}} 
              title={item.answer} 
              onPress={() => this.onclick(item.check)}
            />
          )
        }
      </View>
    )
  }

  finishQuests = () => {
    const {isCheckAnswer, lengthQuest} = this.state
    return (
      <View style={{padding: 10}}>
        <Text>Вы ответили правильно на {isCheckAnswer} из {lengthQuest} вопросов.</Text>
        <Button 
          title="Начать заново" 
          onPress={() => this.setState({isCheckAnswer: 0, num: 0})}
        />
      </View>
    )
  }

  render() {
    const {lengthQuest, num} = this.state
    return (
      <View style={styles.container}>
        <ImageBackground style={styles.imgBackground} source={imageFon} resizeMode='cover' >
          <Text style={{textAlign: 'right', color: 'red'}}>{(num)} / {lengthQuest}</Text>
          {
            num < lengthQuest ? this.quest() : this.finishQuests()
          } 
        </ImageBackground>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 24, 
  },
  imgBackground: {
    width: '100%',
    height: '100%',
    flex: 1 
  },
  quest : {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10 
  }
});
