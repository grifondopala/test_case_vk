import { useQueryClient } from '@tanstack/react-query';
import { Button, FormItem, Group, Text } from '@vkontakte/vkui';
import { useEffect, useState } from 'react';
import { QueryAge } from '../query';
import { useNameForm } from '../form';

function Age(){

    const [name, setName] = useState<string>('');
    const [timeoutWriting, setTimeoutWriting] = useState<ReturnType<typeof setTimeout> | null>(null);
    const {isLoading, data, refetch, isRefetching } = QueryAge(name);
    const { register, handleSubmit, setValue, formState: { errors }, prohibitName } = useNameForm();
    const queryClient = useQueryClient();


    useEffect(() => { 
        name && refetch() 
    }, [name, refetch])

    const onSubmit = ({name}: {name: string}) => {
        if(isRefetching || isLoading) queryClient.cancelQueries({queryKey: [name]})
        prohibitName(name);
        setName(name);
    }

    const onChangeHandler = (name: string) => {
        if(timeoutWriting) clearTimeout(timeoutWriting)
        const timeout = setTimeout(async () => {
            setValue('name', name);
            handleSubmit(onSubmit)();
        }, 3000);
        setTimeoutWriting(timeout)
    }

    return(
        <Group style={{marginLeft: '10px', marginRight: '10px'}}>
            <form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
                <FormItem
                    htmlFor="name"
                    top="Имя"
                    bottom={
                        ((isLoading || isRefetching) && <Text>Определяем возраст...</Text>) || (data && <Text>Ваш возраст: {data.age}</Text>)
                    }>
                    <input id="name" {...register("name")} onChange={(e) => onChangeHandler(e.target.value)}
                    style={{width: '100%', height: '30px', backgroundColor: '#f2f3f5', borderRadius: '5px', border: '1px solid #e4e4e6'}}/>
                </FormItem>
                {errors.name && 
                    <FormItem style={{margin: '0px'}}>
                        {errors.name.type === 'matches' && <Text style={{color: 'red'}}>Имя может содержать только буквы английского алфавита.</Text>}
                        {errors.name.type === 'required' && <Text style={{color: 'red'}}>Имя не может быть пустым.</Text>}
                        {errors.name.type === 'notOneOf' && <Text style={{color: 'red'}}>Вы уже использовали это имя.</Text>}
                    </FormItem>
                }
                <FormItem>
                    <Button type="submit">Отправить</Button>
                </FormItem>
            </form>
        </Group>
    )
}

export default Age