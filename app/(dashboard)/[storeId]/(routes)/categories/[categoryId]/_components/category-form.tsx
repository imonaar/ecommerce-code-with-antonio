"use client"

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from 'zod';

import { Billboard, Category } from "@prisma/client";
import { Trash } from "lucide-react";

import { Heading } from "@/components/heading";
import AlertModal from "@/components/modals/alert-modal";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CategoryFormProps {
    initialData: Category | null,
    billboards: Billboard[]
}

const formSchema = z.object({
    name: z.string().min(1),
    billboardId: z.string().min(1)
})

type categoryFormValues = z.infer<typeof formSchema>

export const CategoryForm = ({ initialData, billboards }: CategoryFormProps) => {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    const params = useParams()
    const router = useRouter()

    const title = initialData ? 'Edit Category' : 'Create Category'
    const description = initialData ? 'Edit a Category' : 'Add a new Category'
    const toastMessage = initialData ? 'Category updated.' : ' Category Created'
    const action = initialData ? 'Save Changes' : ' Create'

    const form = useForm<categoryFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            name: '',
            billboardId: ''
        }
    });

    const onSubmit = async (values: categoryFormValues) => {
        try {
            setLoading(true)
            if (initialData) {
                await axios.patch(`/api/${params.storeId}/categories/${params.categoryId}`, values)
            } else {
                await axios.post(`/api/${params.storeId}/categories`, values)
            }
            router.refresh()
            router.push(`/${params.storeId}/categories`)
            toast.success(toastMessage)

        } catch (error) {
            toast.error("Something went wrong")
        } finally {
            setLoading(false)
        }
    }

    const onDelete = async () => {
        try {
            setLoading(true)
            await axios.delete(`/api/${params.storeId}/categories/${params.categoryId}`)
            router.refresh()
            router.push(`/${params.storeId}/categories`)
            toast.success("Category deleted")
        } catch (error: any) {
            toast.error("Make sure you remove all products using this billboard.")
        } finally {
            setLoading(false)
            setOpen(false)
        }
    }

    return (
        <>
            <AlertModal
                isOpen={open}
                onClose={() => setOpen(false)}
                loading={loading}
                onConfirm={onDelete}
            />
            <div className="flex items-center justify-between">
                <Heading
                    title={title}
                    description={description}
                />

                {
                    initialData ? <Button
                        disabled={loading}
                        variant="destructive"
                        size="sm"
                        onClick={() => setOpen(true)}
                    >
                        <Trash className="h-4 w-4" />
                    </Button> : null
                }

            </div>
            <Separator />
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8 w-full"
                >
                    <div className="grid grid-cols-3 gap-8">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input {...field} disabled={loading} placeholder="Category name" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="billboardId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Billboard</FormLabel>
                                    <Select
                                        disabled={loading}
                                        onValueChange={field.onChange}
                                        value={field.value}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue
                                                    defaultValue={field.value}
                                                    placeholder="Select a billboard"
                                                />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {
                                                billboards.map((billboard) => (
                                                    <SelectItem key={billboard.id} value={billboard.id}>
                                                        {billboard.label}
                                                    </SelectItem>
                                                ))
                                            }
                                        </SelectContent>

                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button disabled={loading} type="submit" >
                        {action}
                    </Button>
                </form>
            </Form>
        </>
    );
}

