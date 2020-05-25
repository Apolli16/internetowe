import React, {Component, useState} from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonLabel } from '@ionic/react';
import './Tab3.css';

import TextArea from 'antd/lib/input/TextArea';

const Tab3: React.FC = () => {
    const [Wypisanie, setWypisanie] = useState('');
    const [Input, setInput] = useState('');
    const [Input2, setInput2] = useState('');



    class Wpis extends Component{
        componentDidMount(): void {
            this.wpis()
        }


        wpis = () =>{
            fetch('http://127.0.0.1:5000/Wpisy',{
                method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
            })
                .then(res => res.json())
                .then(data =>{
                    setWypisanie(JSON.stringify(data));
                    })
                .catch(console.log);
        };

        czytannie = () =>{
            fetch('http://127.0.0.1:5000/Wpisy',{
                method:"Post",
                headers:{ 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    "Id":"0",
                    "Autor":Input,
                    "Tresc":Input2,
                })
            })
                .then(res => res.json())
                .then(()=>{
                    setInput("")
                    setInput2("")
                })
                .catch(console.log);
        };
        render() {
            return (
                <IonButton onClick = {() =>
                {this.czytannie();this.wpis();setInput("");setInput2("")}}>
                    Przeslij
                </IonButton>

            )
        }
    }


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab3</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large"></IonTitle>
          </IonToolbar>
        </IonHeader>
          <IonLabel>
              Autor:
          <TextArea value = {Input} onChange = {a =>{setInput(a.target.value)}}/>
          </IonLabel>
          <IonLabel>
              Tresc:
          <TextArea value = {Input2} onChange = {a =>{setInput2(a.target.value)}}/>
          </IonLabel>
          <Wpis/>
          <IonLabel>
          {Wypisanie}
          </IonLabel>
      </IonContent>

    </IonPage>
  );
};

export default Tab3;
