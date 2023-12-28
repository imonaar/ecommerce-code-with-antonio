"use client"

import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { useStoreModal } from "@/hooks/use-store-modal"
import { Modal } from "../modal"
import { Button } from '../ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { useState } from 'react'
import toast from 'react-hot-toast'



const formSchema = z.object({
    name: z.string().min(1, {
        message: "Store name must have atleast 1 letter"
    })
})

export const StoreModal = () => {
    const [isLoading, setIsLoading] = useState(false)
    const storeModal = useStoreModal()


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: ''
        }
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setIsLoading(true)
            const response = await axios.post('/api/stores', values)
            form.reset()
            //why window.location.assign & not router?
            //it will do a complete refresh on our page
            window.location.assign(`/${response.data.id}`)
        } catch (e: any) {
            toast.error('something went wrong')
        } finally {
            setIsLoading(false)
        }

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
                                                disabled={isLoading}
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
                                    disabled={isLoading}
                                    onClick={storeModal.onClose}
                                >
                                    Cancel
                                </Button>

                                <Button
                                    type='submit'
                                    disabled={isLoading}
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