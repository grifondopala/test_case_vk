import { Button, Group, Textarea } from '@vkontakte/vkui';

import { useEffect, useRef } from 'react';
import { QueryFact } from '../query';


export default function Fact(){

    const factInput = useRef<HTMLTextAreaElement>(null);

    const {isLoading, data, refetch, isRefetching} = QueryFact()

    const inputValue = isRefetching || isLoading ? 'Загружаем...' : data ? data.fact : 'Нажмите на кнопку!'

    useEffect(() => {
        if(!data) return;
        const positionCursor = data.fact.indexOf(' ')
        factInput.current?.focus();
        factInput.current?.setSelectionRange(positionCursor, positionCursor);
    }, [data])

    return(
        <Group style={{width: 'auto', height: 'auto', marginLeft: '10px', marginRight: '10px'}}>
            <Textarea value={inputValue} getRef={factInput}></Textarea>
            <Button style={{marginTop: '10px'}} onClick={() => refetch()}>Получить факт!</Button>
        </Group>
    )
}