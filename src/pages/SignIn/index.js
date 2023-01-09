import React, {useState, useContext} from 'react'
import { ActivityIndicator, Platform } from 'react-native'
import { Background, Container, Logo, AreaInput, Input, SubmitButton, SubmitText, Link, LinkText } from './styles'
import { useNavigation } from '@react-navigation/native'

import { AuthContext } from '../../contexts/auth'

export default function SignIn(){

    const navigation = useNavigation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { signIn, loadingAuth } = useContext(AuthContext)

    function handleLogin(){
        signIn(email, password)
    }

    return(
        <Background>
            <Container
                behavior={ Platform.OS === 'ios' ? 'padding' : ''}
                enabled
            >
                <Logo
                   source={require('../../assets/Logo.png')} 
                />

                <AreaInput>
                    <Input
                        placeholder="E-mail"
                        value={email}
                        onChangeText={(value)=> setEmail(value)}
                    />
                </AreaInput>

                <AreaInput>
                    <Input
                        placeholder="Senha"
                        value={password}
                        onChangeText={(value)=> setPassword(value)}
                    />
                </AreaInput>

                <SubmitButton activeOpacity={0.8} onPress={handleLogin}>
                    { loadingAuth ? (
                         <ActivityIndicator size={20} color='#FFF'/>
                      ) : (
                        <SubmitText>Acessar</SubmitText>
                      )
                    }  
                </SubmitButton>

                <Link onPress={() => navigation.navigate('SingUp')}>
                    <LinkText>Criar uma conta!</LinkText>
                </Link>
            </Container>
        </Background>
    )
}