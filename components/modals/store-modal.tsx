"use client"

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { useStoreModal } from "@/hooks/use-store-modal"
import { Modal } from "../modal"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'



const formSchema = z.object({
    name: z.string().min(1, {
        message:"Store name must have atleast 1 letter"
    })
})

export const StoreModal = () => {
    const storeModal = useStoreModal()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: ''
        }
    })
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        // TODO: create store
        console.log(values)
        
    }
    return (
        <Modal
            title="Create Store"
            description="Add a new Store to manage product and categories"
            isOpen={storeModal.isOpen}
            onClose={storeModal.onClose}
        >
            <div>
                <div className='space-y-4 py-2 pb-4'>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField
                                control={form.control}
                                name='name'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder='E-Commerce'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className='pt-6 space-x-2 flex items-center justify-end w-full'>
                                <Button
                                    variant="outline"
                                    onClick={storeModal.onClose}
                                >
                                    Cancel
                                </Button>

                                <Button
                                    type='submit'
                                >
                                    Continue
                                </Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
        </Modal>
    )
}