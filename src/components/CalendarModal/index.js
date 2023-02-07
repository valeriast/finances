import React, {useState} from 'react'
import { TouchableWithoutFeedback, View } from 'react-native'
import { Container, ButtonFilterText, ModalContent, ButtonFilter} from './styles'
import { Calendar } from 'react-native-calendars'

export default function CalendarModal({setVisible, handleFilter}){
    const [currentDate, setCurrentDate] = useState(new Date())
    const [selectedDates, setSelectedDates] = useState({})
    
    function handleOnDayPress(date){
        setCurrentDate(new Date(date.dateString));

        let selectedDay = {};

        selectedDay[date.dateString] = {
            selected: true,
            selectedColor: '#3b3dbf',
            textColor: '#FFF'
        }

        setSelectedDates(selectedDay)
    }

    function handleFilterDate(){
        handleFilter(currentDate)
        setVisible(false)
    }
    
    return(
        <Container>
            <TouchableWithoutFeedback onPress={()=> setVisible()}>
                <View style={{flex:1}}></View>
            </TouchableWithoutFeedback>

            <ModalContent>

                <Calendar
                    onDayPress={handleOnDayPress}
                    markedDates={selectedDates}
                    enableSwipeMonths={true}
                    theme={{
                        todayTextColor: '#FF0000',
                        selectedDayBackgroundColor: '#00ADF5',
                        selectedDayTextColor: '#FFF'
                    }}
                />

                <ButtonFilter onPress={()=> handleFilterDate()}>
                    <ButtonFilterText>Filtrar</ButtonFilterText>
                </ButtonFilter>
            </ModalContent>
        </Container>
    )
}