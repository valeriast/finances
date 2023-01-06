import React, {useContext, useState } from 'react'
import { ActivityIndicator } from 'react-native'

import { Background, Container, Logo, AreaInput, Input, SubmitButton, SubmitText } from '../SignIn/styles'
import { AuthContext } from '../../contexts/auth'

export default function SignUp(){
    const { user, signUp, loadingAuth } = useContext(AuthContext)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
   
    function handleSingUp(){
        if(name === '' || email === '' || password === ''){
            alert('Fill all fields')
            return
        }
        signUp(name, email, password)
    }


    return(
        <Background>
            <Container
                behavior={ Platform.OS === 'ios' ? 'padding' : ''}
                enabled
            >
                <AreaInput>
                    <Input
                        placeholder="Nome"
                        value={name}
                        onChangeText={(value) => setName(value)}
                    />
                </AreaInput>

                <AreaInput>
                    <Input
                        placeholder="E-mail"
                        value={email}
                        onChangeText={(value) => setEmail(value)}
                    />
                </AreaInput>

                <AreaInput>
                    <Input
                        placeholder="Senha"
                        value={password}
                        onChangeText={(value) => setPassword(value)}
                        secureTextEntry={true}
                    />
                </AreaInput>

                <SubmitButton activeOpacity={0.8} onPress={() => handleSingUp()}>
                    { loadingAuth ? (
                         <ActivityIndicator size={20} color='#FFF'/>
                      ) : (
                        <SubmitText>Cadastrar</SubmitText>
                      )
                    } 
                </SubmitButton>

            </Container>
        </Background>
    )
}