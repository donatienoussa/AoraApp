import { useEffect, useState } from "react"
import { toast } from "../toast"
import { Models } from "react-native-appwrite"
import { VideoType } from "@/types"


export const useAppwrite = ({ fn }:any) => {
    const [data, setData] = useState<Models.Document[]|null>(null)
    const [loading, setLoading] = useState<boolean>(false) 

    const fetchData = () => {        
        setLoading(true)

        try {
            const response = fn()
            console.log('Données', response)
            setData(response)
        } catch (error) {
            toast(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    })

    //Recall the fetch method. 
    const reflesh = () => fn() 

    return {data, reflesh, loading }
}