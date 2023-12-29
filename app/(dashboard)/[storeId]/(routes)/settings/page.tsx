import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { SetttingsForm } from "./_components/settings-form";

interface SettingPageProps {
    params: {
        storeId: string
    }
}

const Settings = async ({ params }: SettingPageProps) => {
    const { userId } = auth()

    if (!userId) {
        redirect('/sign-in')
    }

    const store = await prismadb.store.findFirst({
        where: {
            id: params.storeId
        }
    })

    if (!store) {
        redirect('/')
    }

    return (
        <div className="flex flex-col">
            <div className="flex-1 space-y-4 p-4 pt-6">
                <SetttingsForm initialData={store} />
            </div>
        </div>
    );
}

export default Settings;