import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";

import * as yup from "yup"

export function useNameForm(){

    const [prohibitedNames, setProhibitedNames] = useState<Array<string>>([])

    const prohibitName = (name: string) => {
        setProhibitedNames((value) => [...value, name])
    }

    const schema = yup.object().shape({
        name: yup.string().required('Имя обязательно').matches(/^[A-Za-z]+$/i).notOneOf([...prohibitedNames])
    })

    return {...useForm({ resolver: yupResolver(schema) }), prohibitName};
    
}