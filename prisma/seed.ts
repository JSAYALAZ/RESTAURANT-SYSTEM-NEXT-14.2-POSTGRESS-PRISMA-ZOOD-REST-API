import { categories } from './data/category';
import { products } from "./data/products";
import { PrismaClient } from '@prisma/client';
import colors from 'colors';

const prisma = new PrismaClient()

async function main(){
    try {
        await prisma.category.createMany({
            data: categories
        })
        
        await prisma.product.createMany({
            data: products
        })
        console.log(colors.bgGreen.white('All dates have been registry correctly'));
        
    } catch (error) {
        console.log(colors.bgRed.white('Error on upload dates'));
        console.log(error);
    }
}

main()
    .then(async()=>{
        await prisma.$disconnect()
    })
    .catch(async(e)=>{
        console.log(e)
        await prisma.$disconnect()
        process.exit(1)
    })