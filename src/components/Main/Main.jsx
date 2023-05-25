import { Tabs, Container, Autocomplete, Center, Flex, Group, Button, Paper, Divider, LoadingOverlay } from "@mantine/core";

import { useState } from "react";
import { useSelector } from "react-redux";

import SeasonalDemand from "../Bar/Bar";

const Main = () => {

    const [tableData, setTableData] = useState([])
    const allFlight = useSelector(state => state.data.allFlight);

    const departureList = allFlight.map((item) => item.departure).reduce((acc, item) => {
        if (acc.includes(item)) {
            return acc;
        }
        return [...acc, item];
    }, []);

    const destinationList = allFlight.map((item) => item.destination).reduce((acc, item) => {
        if (acc.includes(item)) {
            return acc;
        }
        return [...acc, item];
    }, []);

    const fetchToData = () => {
        fetch('/seasonality', {
            method: 'POST',
            body: JSON.stringify({
                flt_num: 1135
            }),
            headers: { "content-type": "application/json" }
        })
            .then((res) => res.json())
            .then((res) => setTableData(res.items))
    }

    return (<>
        <Container>
            <Center>
                <Tabs defaultValue="Сезонность спроса" radius="xs" variant="outline" >
                    <Tabs.List position="apart" grow={true}>
                        <Tabs.Tab mr={'1px'} value="Динамика бронирования" >Динамика бронирования</Tabs.Tab>
                        <Tabs.Tab mr={'1px'} value="Сезонность спроса" >Сезонность спроса</Tabs.Tab>
                        <Tabs.Tab mr={'1px'} value="Профили спроса" >Профили спроса</Tabs.Tab>
                        <Tabs.Tab value="Прогнозирование спроса" >Прогнозирование спроса</Tabs.Tab>
                    </Tabs.List>

                    <Tabs.Panel value="Динамика бронирования">
                        <form>
                            <Flex align={'center'} justify={'space-between'}>
                                <Group>
                                    <Autocomplete
                                        label="Откуда"
                                        placeholder='Пункт отрпавления'
                                        data={['Москва', 'Сочи', 'Санкт-Петербург', 'Краснодар']}
                                    />
                                    <Autocomplete
                                        label="Куда"
                                        placeholder='Пункт прибытия'
                                        data={['Москва', 'Сочи', 'Санкт-Петербург', 'Краснодар']}
                                    />
                                </Group>

                                <Button variant={'light'} mt={'25px'}>Сформировать</Button>

                            </Flex>
                        </form>

                    </Tabs.Panel>

                    <Tabs.Panel value="Сезонность спроса">
                        <form>
                            <Flex align={'center'} justify={'space-between'}>
                                <Group>
                                    <Autocomplete
                                        label="Аэропорт вылета"
                                        placeholder='Пункт отрпавления'
                                        data={departureList}
                                    />
                                    <Autocomplete
                                        label="Аэропорт прибытия"
                                        placeholder='Пункт прибытия'
                                        data={destinationList}
                                    />
                                    <Autocomplete
                                        label="Номер рейса"
                                        placeholder='номер рейса'
                                        data={destinationList}
                                    />
                                </Group>

                                <Button variant={'light'} mt={'25px'} onClick={fetchToData}>Сформировать</Button>

                            </Flex>
                        </form>
                    </Tabs.Panel>

                    <Tabs.Panel value="Профили спроса" >
                        <form>
                            <Flex align={'center'} justify={'space-between'}>
                                <Group>
                                    <Autocomplete
                                        label="Откуда"
                                        placeholder='Пункт отрпавления'
                                        data={['Москва', 'Сочи', 'Санкт-Петербург', 'Краснодар']}
                                    />
                                    <Autocomplete
                                        label="Куда"
                                        placeholder='Пункт прибытия'
                                        data={['Москва', 'Сочи', 'Санкт-Петербург', 'Краснодар']}
                                    />
                                </Group>

                                <Button variant={'light'} mt={'25px'}>Сформировать</Button>

                            </Flex>
                        </form>

                    </Tabs.Panel>

                    <Tabs.Panel value="Прогнозирование спроса" >
                        <form>
                            <Flex align={'center'} justify={'space-between'}>
                                <Group>
                                    <Autocomplete
                                        label="Откуда"
                                        placeholder='Пункт отрпавления'
                                        data={['Москва', 'Сочи', 'Санкт-Петербург', 'Краснодар']}
                                    />
                                    <Autocomplete
                                        label="Куда"
                                        placeholder='Пункт прибытия'
                                        data={['Москва', 'Сочи', 'Санкт-Петербург', 'Краснодар']}
                                    />
                                </Group>

                                <Button variant={'light'} mt={'25px'}>Сформировать</Button>

                            </Flex>
                        </form>

                    </Tabs.Panel>

                </Tabs>
            </Center>
           { tableData.length?<Center>
                <Paper miw={'960px'} w={'70%'} mah={'740px'} h={700} p={'xs'} mt={'lg'}>

                    <Center>
                        <SeasonalDemand dataSaeson={tableData} />

                    </Center>
                </Paper >
            </Center>:null}

        </Container>
        {/* <div style={{ minWidth: '960px' }}>
            <img style={{ zIndex: '0', position: 'absolute', bottom: '150px', right: '0', height: '18rem' }} src="https://www.aeroflot.ru/frontend/static/img/clouds.png" alt=""></img>
            <img style={{ zIndex: '10', position: 'absolute', bottom: '70px', right: '0', height: '15rem' }} src="https://www.aeroflot.ru/frontend/static/img/aircraft.png" alt=""></img>
            <img style={{ position: 'absolute', bottom: '0', right: '0', }} src="https://www.aeroflot.ru/frontend/static/img/smile2.svg" alt=""></img>
        </div> */}
    </>
    )
}

export default Main