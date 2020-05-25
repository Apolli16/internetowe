import React, {Component, useState} from 'react';
import {IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonLabel, IonLoading} from '@ionic/react';
import './Tab4.css';

const Tab4: React.FC = () => {
    const [Farmstate, setFarmstate] = useState('');
    const [showLoading, setShowLoading] = useState(true);
    const [fetching, setfetching] = useState(true);
    const [time, settime] = useState("");
    const [block, setblock] = useState(false);
    const [blockgold, setblockgold] = useState(false);



    class Farma extends Component{

        componentDidMount(): void {
            if (fetching === true){

                this.request();
                setfetching(false);


            }
        }

        //did = req ionic life coś tam i zrobić oczekiwanie (kolo)


        request = () =>{
            fetch('http://127.0.0.1:5000/Farma',{
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            })
                .then(res => res.json())
                .then(data =>{
                    setFarmstate(JSON.stringify(data));
                })
                .catch(console.log);
        };

        send = (akcja:string) =>{
            fetch('http://127.0.0.1:5000/Farma',{
                method:"Post",
                headers:{ 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    "akcja": akcja
                })
            })
                .then(res => res.json())
                .then((data)=>{
                    setFarmstate(JSON.stringify(data));
                })
                .catch(console.log);
        };

        timer =() =>{

            // Set the date we're counting down to
         //   let countDownDate = new Date(setFarmstate).getTime();
            let json_farmstate: any =JSON.parse(Farmstate);
            let czas_zasiewu =JSON.parse(json_farmstate).zasiew;
            let czas_servera =JSON.parse(json_farmstate).czas_servera;
            let wzrost =parseInt(JSON.parse(json_farmstate).czas_wzrostu);

            let czas_servera_date:any = new Date(czas_servera);

            let czas_zbioru =  new Date(czas_zasiewu);
            czas_zbioru.setSeconds(czas_zbioru.getSeconds() + wzrost);

            let suma_czas_zasiewu_wzrost:any = new Date(czas_zbioru);
            // Update the count down every 1 second
            let x = setInterval(function() {
                setblock(true)
                // Get today's date and time

                // Find the distance between now and the count down date
                let distance = suma_czas_zasiewu_wzrost - czas_servera_date;
                czas_servera_date.setSeconds(czas_servera_date.getSeconds() + 1);
                // Time calculations for days, hours, minutes and seconds
                let days = Math.floor(distance / (1000 * 60 * 60 * 24));
                let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                let seconds = Math.floor((distance % (1000 * 60)) / 1000);
                distance = distance -1
                // Display the result in the element with id="demo"
                console.log( days + "d " + hours + "h "
                    + minutes + "m " + seconds + "s ");

                settime( seconds + "s ");
                // If the count down is finished, write some text
                if (distance <= 0) {
                    settime("Gotowe do zbioru");
                    clearInterval(x);
                    let czas_server_zbiory =new Date(JSON.parse(json_farmstate).zbiory);
                    let czas_server_zasiewu =new Date(JSON.parse(json_farmstate).zasiew);

                    if (czas_server_zbiory<czas_server_zasiewu)
                    setblockgold(false)
                    else
                    setblock(false)

                }
            }, 1000);}

        buttontimer =() =>{

            let json_farmstate: any =JSON.parse(Farmstate);
            let distance=parseInt(JSON.parse(json_farmstate).czas_wzrostu);
            let x = setInterval(function() {


                distance = distance -1

                settime(distance + "s ");
                // If the count down is finished, write some text
                if (distance <= 0) {
                    settime("Gotowe do zbioru");
                    clearInterval(x);

                    setblockgold(false)
                }
            }, 1000);}





        render() {
            return (
                <IonToolbar>
                    <IonLoading
                        onWillDismiss={() => {setblock(true);this.timer(); setblockgold(true)}}
                        isOpen={showLoading}
                        onDidDismiss={() => {setblock(true);this.timer();setShowLoading(false);setblockgold(true)}}
                        message={'Please wait...'}
                        duration={1}
                    />

                <IonButton disabled={block}
                    onClick = {() =>
                {

                    this.send("Zasiew")
                    setblock(true)
                    this.buttontimer()

                }}>
                    Zasiej
                </IonButton>

                <IonButton disabled={blockgold}
                    onClick = {() =>
                {
                    this.send("Zbiory")
                    setblockgold(true)
                    setblock(false)
                }}>
                    Zbieraj
                </IonButton>


                </IonToolbar>


            )
        }
    }




    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Tab 4<Farma/></IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Tab 4</IonTitle>
                    </IonToolbar>
                </IonHeader>


                <IonLabel>
                    {time}

                </IonLabel>

                <IonLabel>{Farmstate}
                </IonLabel>

            </IonContent>
        </IonPage>
    );
};

export default Tab4;


