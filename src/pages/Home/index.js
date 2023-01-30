import React, {useContext, useEffect, useState} from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { AuthContext } from '../../contexts/auth';

import api from '../../services/api'

import { Background, ListBalance } from './styles'
import Header from '../../components/Header'
import BalanceItem from '../../components/BalanceItem';

import { format } from 'date-fns';
import { useIsFocused } from '@react-navigation/native';


export default function Home() {
  const [listBalance, setListBalance] = useState([])
  const [dateMovements, setDateMovements] = useState(new Date())
  const isFocused = useIsFocused()
  
  useFocusEffect( React.useCallback(()=>{
    
    async function getMovements(){
      let dateFormated = format(dateMovements, 'dd/MM/yyyy');

      const balance = await api.get('/balance', {
        params:{
          date: dateFormated 
        }
      })
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
   </Background>
  );
}