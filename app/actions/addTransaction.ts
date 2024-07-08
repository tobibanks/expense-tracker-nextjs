import AddTransaction from '../../components/AddTransaction';
'use server';
import { auth } from '@clerk/nextjs/server';
import { db } from '@/lib/db'
import { revalidatePath } from 'next/cache';

interface TransactionData{
    text: string;
    amount: number;
}

interface TransactionResult{
    data?: TransactionData;
    error?: string;
}

async function addTransaction(formData: FormData): Promise<TransactionResult> {
    const textValue = formData.get("text");
    const amountValue = formData.get("amount");
    
    //check for input values
    if (!textValue || textValue === '' || !amountValue) {
        return {error: 'Text or amount is missing'}
    }
    
    const text: string = textValue.toString();
    const amount: number = parseFloat(amountValue.toString()) //parse amount as number
    
    //get logged in user
    const { userId } = auth();
    console.log(userId);
    
    //check for user
    if (!userId) {
        return {error: "user not found"}
    }
    
    try {
        const transactionData: TransactionData = await db.transaction.create({
        data: {
            text,
            amount,
            userId
        }
    })
    revalidatePath('/')
        
    return { data: transactionData };
    } catch (error) {
        return {error: 'Transaction not Added'}
    }
    
}

export default addTransaction;