import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonFooter, IonRow, IonGrid, IonCol } from '@ionic/react';
import './Tab1.css';
import 'antd/dist/antd.css';
import { Table } from 'antd';
const Tab1: React.FC = () => {
    const [Total, setTotal] = useState(0);
    const [Nototal, setNototal] = useState(0);
    const [Totnot, setTotnot] = useState(0);
    const [Srednia, setSrednia] = useState(0);
    const [Sredniastrony, setSredniastrony] = useState(0);
    const [Sredniaprocent, setSredniaprocent] = useState(0);
    const [Nototalsrednia, setNototalsrednia] = useState(0);

    const columns: any = [
        {
            title: 'nazwa',
            dataIndex: 'nazwa',
            filters: [
                {
                    text: 'Grypa',
                    value: 'Grypa',
                },
                {
                    text: 'Szalonychkrow',
                    value: 'Szalonychkrow',
                },
                {
                    text: 'Ptasia',
                    value: 'Ptasia',
                },
                {
                    text: 'AIDS',
                    value: 'AIDS',
                },
                {
                    text: 'Ebola',
                    value: 'Ebola',
                },
                {
                    text: 'Zika',
                    value: 'Zika',
                },
                {
                    text: 'Koronawirus',
                    value: 'Koronawirus',
                },
                {
                    text: 'Ptasiakupa',
                    value: 'Ptasiakupa',
                },
                {
                    text: 'Wolowobool',
                    value: 'Wolowobool',
                },
                {
                    text: 'Wodka',
                    value: 'Wodka',
                },
                {
                    text: 'SORS',
                    value: 'SORS',
                },
                {
                    text: 'Szynkobool',
                    value: 'Szynkobool',
                },
            ],
            // specify the condition of filtering result
            // here is that finding the name started with `value`
            filterMultiple: true,
            onFilter: (value: any, record: any) => record.nazwa.indexOf(value) === 0,
            sorter: (a: any, b: any) => a.nazwa.localeCompare(b.nazwa),
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'gospodarz',
            dataIndex: 'gospodarz',
            filters: [
                {
                    text: 'Czlowiek',
                    value: 'Czlowiek',
                },
                {
                    text: 'Krowy',
                    value: 'Krowy',
                },
                {
                    text: 'Ptaki',
                    value: 'Ptaki',
                },
                {
                    text: 'Swinie',
                    value: 'Swinie',
                },
            ],
            filterMultiple: true,
            onFilter: (value: any, record: any) => record.gospodarz.indexOf(value) === 0,
            sorter: (a: any, b: any) => a.gospodarz.localeCompare(b.gospodarz),
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'dni',
            dataIndex: 'dni',
            defaultSortOrder: 'descend',
            filterMultiple: true,
            sorter: (a: any, b: any) => a.dni - b.dni,
            onCell: (record: any) => {
                return {
                    style: record.dni > Nototalsrednia ? { backgroundColor: '#4AFC50' } : null,
                };
            },
        },
        {
            title: 'ofiary',
            dataIndex: 'ofiary',
            defaultSortOrder: 'descend',
            filterMultiple: true,
            sorter: (a: any, b: any) => a.ofiary - b.ofiary,
            onCell: (record: any) => {
                return {
                    style: record.ofiary / record.dni > Sredniastrony ? { backgroundColor: '#4AFC50' } : null,
                };
            },
        },
    ];

    const data = [
        {
            nazwa: 'Grypa',
            gospodarz: 'Czlowiek',
            dni: 312,
            ofiary: 1000,
        },
        {
            nazwa: 'Szalonychkrow',
            gospodarz: 'Krowy',
            dni: 170,
            ofiary: 500,
        },
        {
            nazwa: 'Ptasia',
            gospodarz: 'Ptaki',
            dni: 200,
            ofiary: 600,
        },
        {
            nazwa: 'AIDS',
            gospodarz: 'Czlowiek',
            dni: 1200,
            ofiary: 500,
        },
        {
            nazwa: 'Ebola',
            gospodarz: 'Czlowiek',
            dni: 1500,
            ofiary: 800,
        },
        {
            nazwa: 'Zika',
            gospodarz: 'Swinie',
            dni: 2000,
            ofiary: 950,
        },
        {
            nazwa: 'Koronawirus',
            gospodarz: 'Czlowiek',
            dni: 220,
            ofiary: 4000,
        },
        {
            nazwa: 'Ptasiakupa',
            gospodarz: 'Ptaki',
            dni: 2,
            ofiary: 1,
        },
        {
            nazwa: 'Wolowobool',
            gospodarz: 'Krowy',
            dni: 15,
            ofiary: 3,
        },
        {
            nazwa: 'Wodka',
            gospodarz: 'Czlowiek',
            dni: 8000,
            ofiary: 58900,
        },
        {
            nazwa: 'SORS',
            gospodarz: 'Czlowiek',
            dni: 168,
            ofiary: 7800,
        },
        {
            nazwa: 'Szynkobool',
            gospodarz: 'Swinie',
            dni: 286,
            ofiary: 922,
        },
    ];

    function onChange(pagination: any, filters: any, sorter: any, extra: any) {
        console.log('params', pagination, filters, sorter, extra);
    }

    return (
        <IonGrid>
            <IonPage>
                <IonHeader>
                    <IonToolbar>
                        <IonTitle>Tab 1</IonTitle>
                    </IonToolbar>
                </IonHeader>

                <IonContent>
                    <Table
                        pagination={false}
                        columns={columns}
                        dataSource={data}
                        onChange={onChange}
                        footer={pageData => {
                            let totalDni: number = 0;
                            let totalOfiary: number = 0;
                            let nototalDni: number = 0;
                            let nototalOfiary: number = 0;

                            data.forEach(({ dni, ofiary }) => {
                                totalDni += dni ? dni : 0;
                                totalOfiary += ofiary ? ofiary : 0;
                            });

                            pageData.forEach(({ dni, ofiary }) => {
                                nototalDni += dni ? dni : 0;
                                nototalOfiary += ofiary ? ofiary : 0;
                            });

                            setTotal(totalOfiary);
                            setNototal(nototalOfiary);
                            setTotnot(totalOfiary - nototalOfiary);
                            setSrednia(totalOfiary / totalDni);
                            setSredniastrony(nototalOfiary / nototalDni);
                            setSredniaprocent((nototalOfiary / nototalDni / (totalOfiary / totalDni)) * 100);
                            setNototalsrednia(nototalDni / pageData.length);

                            return <></>;
                        }}
                    />
                </IonContent>

                <IonFooter>
                    <IonToolbar>
                        <IonRow>
                            <IonCol>
                                <div>Całkowita ilość ofiar=</div>
                            </IonCol>
                            <IonCol>
                                <div>{Total}</div>
                            </IonCol>
                            <IonCol>
                                <div>Średnia ilość ofiar na dzień =</div>
                            </IonCol>
                            <IonCol>
                                <div>{Srednia}</div>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                <div>Całkowita ilość ofiar z wybranych=</div>
                            </IonCol>
                            <IonCol>
                                <div>{Nototal}</div>
                            </IonCol>
                            <IonCol>
                                <div>Średnia ilość ofiar na dzień z wybranych=</div>
                            </IonCol>
                            <IonCol>
                                <div>{Sredniastrony}</div>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                <div>Pozostała liczba ofiar =</div>
                            </IonCol>
                            <IonCol>
                                <div>{Totnot}</div>
                            </IonCol>
                            <IonCol>
                                <div>Procentowa ilość z średniej ofiar do tych wybranych =</div>
                            </IonCol>
                            <IonCol>
                                <div>{Sredniaprocent} %</div>
                            </IonCol>
                        </IonRow>
                    </IonToolbar>
                </IonFooter>
            </IonPage>
        </IonGrid>
    );
};

export default Tab1;
