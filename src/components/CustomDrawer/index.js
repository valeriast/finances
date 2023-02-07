import React, {useContext} from 'react'
import {View, Text, Image} from 'react-native'

import { DrawerItemList, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer'
import { AuthContext } from '../../contexts/auth'
import Icon from 'react-native-vector-icons/Feather'

export default function CustomDrawer(props){
    const {user, signOut} = useContext(AuthContext)
    return(
        <DrawerContentScrollView contentContainerStyle={{flex:1,justifyContent:'space-between'}}>
            <View>
                <View style={{alignItems: 'center', justifyContent: 'center', marginTop: 25}}>
                    <Image
                        source={require('../../assets/Logo.png')}
                        style={{width: 90, height: 90}}
                        resizeMode="contain"
                    />
                    <Text style={{fontSize: 18, marginTop: 14}}>Bem-Vindo</Text>
                    <Text style={{fontSize: 17, fontWeight: 'bold', marginBottom: 14, paddingHorizontal: 20}} numberOfLines={1}>
                        {user && user.name}
                    </Text>
                </View>
                <DrawerItemList {...props}/>
            </View>
            
            <DrawerItem
                {...props}
                icon={() => <Icon name="log-out" color="#ffff" size={20}/>}
                style={{backgroundColor: '#c62c36'}} labelStyle={{color: '#fff'}}
                color="red"
                label="Sair do app"
                onPress={() => signOut()}
            />

        </DrawerContentScrollView>
    )
}