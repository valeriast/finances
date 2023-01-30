import React, {useContext, useEffect, useState} from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { AuthContext } from '../../contexts/auth';
import Icon from 'react-native-vector-icons/MaterialIcons'

import api from '../../services/api'

import { Background, ListBalance, Area,  Title, List } from './styles'
import Header from '../../components/Header'
import BalanceItem from '../../components/BalanceItem';
import HistoryList from '../../components/HistoryList'

import { format } from 'date-fns';
import { useIsFocused } from '@react-navigation/native';


export default function Home() {
  const [listBalance, setListBalance] = useState([])
  const [movements, setMovements] = useState([])
  const [dateMovements, setDateMovements] = useState(new Date())
  const isFocused = useIsFocused()
  
  useFocusEffect( React.useCallback(()=>{
    
    async function getMovements(){
      let dateFormated = format(dateMovements, 'dd/MM/yyyy');

      const receives = await api.get('/receives', {
        params:{
          date: dateFormated
        }
      })

      const balance = await api.get('/balance', {
        params:{
          date: dateFormated 
        }
      })
      setMovements(receives.data)
      setListBalance(balance.data);
    }

    getMovements()

  }, []) )

 return (
   <Background>
      <Header title='Minha movimentações'/>
      <ListBalance
        data={listBalance}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        keyExtractor={ item => item.tag}
        renderItem={({item}) => (<BalanceItem data={item}/>)}
      />
      <Area>
        <TouchableOpacity>
          <Icon name="event" color="#121212" size={30}/>
        </TouchableOpacity>
        <Title>Ultimas movimentações</Title>
      </Area>
      <List
        data={movements}
        keyExtractor={ item=> item.id}
        renderItem={({item}) => <HistoryList data={item}/>}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 20}}
      />
   </Background>
  );
}