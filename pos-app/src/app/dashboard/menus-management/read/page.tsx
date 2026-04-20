'use client'
import axiosInstance from "@/utils/axiosInstance";
import { useEffect, useState } from "react";
import Image from "next/image";
import { PieChart,Pie, Cell } from "recharts";
interface ProductImage{
    id : string ;
    url : string ;
}

interface Product {
    id : string ;
    name : string ;
    price : number ;
    isAvailable : boolean ; 
    categories : {name : string} ;
    productImages : ProductImage []

}

const PIE_COLORS = ["#6366f1", "#8b5cf6", "#a855f7", "#c084fc", "#e879f9"];
export default function ReadPage (){
    const [products, setProducts] = useState <Product[]> ([])
    const [loading, setLoading] = useState(true)


    useEffect (()=> {
        axiosInstance
        .get('api/menus')
        .then ((res) => setProducts(res?.data.data) )
        .catch((err) => console.error(err))
        .finally(()=> setLoading(false))
    }, [])

    return (
        <>
            {products.map ((product, index)=> (
                <div key={product.id}>
                    <h1>{index+1}. {product.name}</h1>
                    <h1>{product.price}</h1>
                    <h1>{product.isAvailable ? 'Available' : 'Unavailable'}</h1>


                    {product.productImages?.map((img) => (
                            <Image 
                                key={img.id}
                                src={img.url.startsWith('http') ? img.url : `/${img.url}`}
                                alt={product.name} 
                                width={48}
                                height={48}
                            />
                        ))}
                    <PieChart width={220} height={220}>

                        <Pie
                        data={[{ value: product.price }]}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={3}
                        dataKey="value"
                        isAnimationActive={false}
                        >
                            {[{ value: product.price }].map((_entry: {value: number}, index: number) => (
                            <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                    ))}
                        </Pie>

                    </PieChart>

                    



                </div>
                
            ))}

            

            

        </>
    )
}